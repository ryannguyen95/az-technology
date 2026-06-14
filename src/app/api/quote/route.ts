import { NextResponse } from "next/server";
import type { QuoteRequestInput } from "@/lib/types";

/* Lead pipeline (eng review T1): EMAIL-FIRST, Strapi best-effort.
   The lead must never be lost even if the CMS is down. Spam defense:
   honeypot + submit-timestamp. (Turnstile + durable rate-limit are the
   production hardening step — wired when keys exist.) */

type Body = QuoteRequestInput & { startedAt?: number };

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // honeypot
  if (body.website) return NextResponse.json({ ok: true }); // silently accept the bot
  // too-fast submit (under 1.2s) → likely bot
  if (body.startedAt && Date.now() - body.startedAt < 1200) {
    return NextResponse.json({ ok: true });
  }
  // validation
  if (!body.name || !body.phone || !body.email || !body.consentGiven) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 });
  }

  const lead = {
    name: String(body.name).slice(0, 200),
    phone: String(body.phone).slice(0, 40),
    email: String(body.email).slice(0, 200),
    company: body.company?.slice(0, 200) ?? "",
    interest: body.interest?.slice(0, 300) ?? "",
    message: body.message?.slice(0, 2000) ?? "",
    sourcePage: body.sourcePage ?? "",
    consentGiven: true,
    createdAt: new Date().toISOString(),
  };

  // 1) EMAIL FIRST — the lead is safe the moment this succeeds.
  const emailed = await sendEmail(lead);

  // 2) Strapi best-effort — failure here does NOT fail the request.
  void saveToStrapi(lead).catch((e) => {
    console.error("[lead] strapi write failed (reconcile):", lead.email, e);
  });

  if (!emailed) {
    // Email failed: still don't drop the lead — log it loudly for reconciliation.
    console.error("[lead] EMAIL FAILED — RECONCILE:", JSON.stringify(lead));
  }
  return NextResponse.json({ ok: true });
}

async function sendEmail(lead: Record<string, string | boolean>): Promise<boolean> {
  const to = process.env.LEAD_TO_EMAIL ?? "nhu.trang@az-technology.vn";
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // No provider configured yet (dev) — log so nothing is lost.
    console.log("[lead] (no email provider) →", to, lead);
    return true;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "AZ Technology <web@az-technology.vn>",
        to: [to],
        subject: `[Web] Yêu cầu tư vấn: ${lead.name}`,
        text: Object.entries(lead).map(([k, v]) => `${k}: ${v}`).join("\n"),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function saveToStrapi(lead: Record<string, unknown>): Promise<void> {
  if (process.env.DATA_SOURCE !== "strapi") return;
  const url = process.env.STRAPI_URL;
  const token = process.env.STRAPI_API_TOKEN;
  if (!url || !token) return;
  await fetch(`${url}/api/quote-requests`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ data: lead }),
  });
}
