"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { QuoteField } from "./QuoteModal";

type FieldKey = "name" | "phone" | "email" | "company" | "product" | "message";
const FIELDS: FieldKey[] = ["name", "phone", "email", "company", "product", "message"];

export function InlineQuoteForm({ product = "" }: { product?: string }) {
  const [form, setForm] = useState<Record<string, string>>({ name: "", phone: "", email: "", company: "", product, message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [website, setWebsite] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) return;
    const errs: Record<string, string> = {};
    (["name", "phone", "email"] as FieldKey[]).forEach((k) => {
      if (!String(form[k] || "").trim()) errs[k] = "Vui lòng nhập thông tin";
    });
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Email chưa hợp lệ";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, phone: form.phone, email: form.email, company: form.company,
          interest: form.product, message: form.message, consentGiven: true, website,
          sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
    } catch {
      /* swallow */
    }
    setDone(true);
  };

  if (done)
    return (
      <div className="bg-white rounded-2xl border border-emerald-200 p-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-500 grid place-items-center mb-4">
          <Icon name="check" className="w-9 h-9" stroke={2.2} />
        </div>
        <h4 className="text-lg font-extrabold text-navy">Cảm ơn Quý khách!</h4>
        <p className="text-sm text-slate-600 mt-2">AZ Technology sẽ liên hệ trong thời gian sớm nhất.</p>
      </div>
    );

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-7">
      <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} className="absolute left-[-9999px]" aria-hidden="true" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELDS.map((k) => (
          <QuoteField key={k} k={k} value={form[k] || ""} error={errors[k]} onChange={(v) => setForm((p) => ({ ...p, [k]: v }))} />
        ))}
      </div>
      <button type="submit" className="mt-5 w-full sm:w-auto az-grad text-white font-extrabold rounded-xl px-8 py-3.5 shadow-[0_12px_28px_-10px_rgba(0,86,179,.8)] hover:brightness-105 transition-all flex items-center justify-center gap-2">
        <Icon name="send" className="w-5 h-5" /> GỬI YÊU CẦU
      </button>
      <p className="mt-3 flex items-center gap-1.5 text-[12px] text-slate-500">
        <Icon name="lock" className="w-3.5 h-3.5" /> Thông tin của Quý khách được bảo mật tuyệt đối.
      </p>
    </form>
  );
}
