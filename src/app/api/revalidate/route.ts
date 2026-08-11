import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// On-demand revalidation cho mọi thay đổi từ CMS (Strapi webhook + plugin
// sort-manager gọi trực tiếp). Không có route này, thay đổi phải chờ hết
// `revalidate = 3600` của từng page mới lên site.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Hai dạng payload được chấp nhận:
//  1. Của ta   — { tags, paths }: plugin sort-manager gọi trực tiếp.
//  2. Của Strapi — { model, event, ... }: webhook gửi, ta tự map model → tag.
type Payload = { tags?: string[]; paths?: string[]; model?: string };

// Tên tag phải khớp đúng tag truyền vào sFetch() ở src/lib/data/strapi.ts.
const MODEL_TAGS: Record<string, string[]> = {
  "parent-category": ["parent-categories", "categories", "products"],
  category: ["categories", "products"],
  product: ["products"],
  banner: ["banners"],
  brand: ["products"],
  "site-setting": ["site-setting"],
  "home-page": ["home-page"],
};

// Trần số phần tử cho tags/paths — chặn một caller có secret hợp lệ ép route
// chạy hàng nghìn lần revalidateTag/revalidatePath trong một request.
const MAX_ITEMS = 50;

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "REVALIDATE_SECRET is not configured" }, { status: 500 });
  }
  if (req.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let parsed: unknown;
  try {
    parsed = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json body" }, { status: 400 });
  }
  // JSON.parse("null") succeeds, and typeof null === "object", and arrays
  // are also objects — none of those are a usable payload shape.
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return NextResponse.json({ error: "invalid json body: expected an object" }, { status: 400 });
  }
  const body = parsed as Payload;

  const explicit = Array.isArray(body.tags) ? body.tags.filter((t) => typeof t === "string" && t.length > 0) : [];
  const fromModel = typeof body.model === "string" ? (MODEL_TAGS[body.model] ?? []) : [];
  const tags = [...new Set([...explicit, ...fromModel])];
  // Chỉ nhận path bắt đầu bằng đúng MỘT dấu "/" — "//evil.com" cũng
  // startsWith("/") nên phải loại riêng, không thì lọt thẳng vào
  // revalidatePath() như một protocol-relative URL.
  const paths = Array.isArray(body.paths)
    ? body.paths.filter((p) => typeof p === "string" && p.startsWith("/") && !p.startsWith("//"))
    : [];

  if (tags.length > MAX_ITEMS || paths.length > MAX_ITEMS) {
    return NextResponse.json({ error: `too many items: max ${MAX_ITEMS} tags and ${MAX_ITEMS} paths per request` }, { status: 400 });
  }

  if (!tags.length && !paths.length) {
    return NextResponse.json({ error: "nothing to revalidate: unknown model and no tags/paths given" }, { status: 400 });
  }

  for (const t of tags) revalidateTag(t);
  for (const p of paths) revalidatePath(p);

  return NextResponse.json({ revalidated: true, tags: tags.length, paths: paths.length });
}
