import type { Core } from "@strapi/strapi";
import { BRANDS, ENTRIES, HERO, SETTINGS, slugify } from "./seed/data";

// Public-role read actions (locked boundary, eng review T3): published reads only;
// quote-request is create-only (not findable — it holds PII).
const PUBLIC_FIND = [
  "api::catalog-entry.catalog-entry",
  "api::brand.brand",
  "api::banner.banner",
  "api::news.news",
];

async function setPublicPermissions(strapi: Core.Strapi) {
  const role = await strapi.db
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "public" } });
  if (!role) return;

  const wanted: string[] = [
    ...PUBLIC_FIND.flatMap((uid) => [`${uid}.find`, `${uid}.findOne`]),
    "api::site-setting.site-setting.find",
    "api::quote-request.quote-request.create", // create only — never find/findOne
  ];

  for (const action of wanted) {
    const existing = await strapi.db
      .query("plugin::users-permissions.permission")
      .findOne({ where: { action, role: role.id } });
    if (!existing) {
      await strapi.db
        .query("plugin::users-permissions.permission")
        .create({ data: { action, role: role.id } });
    }
  }
  strapi.log.info("[seed] public permissions ensured");
}

async function seed(strapi: Core.Strapi) {
  const docs = strapi.documents;

  // Brands (upsert by slug)
  const brandIdBySlug: Record<string, string> = {};
  for (const name of BRANDS) {
    const slug = slugify(name);
    const found = await docs("api::brand.brand").findFirst({ filters: { slug } });
    const doc = found ?? (await docs("api::brand.brand").create({
      data: { name, slug, showInPartnerStrip: true },
      status: "published",
    }));
    brandIdBySlug[slug] = doc.documentId;
  }

  // Entries — pass 1: create/upsert (without parent), connect brands
  const entryIdBySlug: Record<string, string> = {};
  for (const e of ENTRIES) {
    const found = await docs("api::catalog-entry.catalog-entry").findFirst({ filters: { slug: e.slug } });
    const data: any = {
      kind: e.kind, title: e.title, slug: e.slug, icon: e.icon, tone: e.tone,
      badge: e.badge, summary: e.summary, featured: !!e.featured,
      priceMode: e.priceMode ?? "contact", body: e.body ?? [],
      brands: (e.brandSlugs ?? []).map((s) => brandIdBySlug[s]).filter(Boolean),
    };
    const doc = found
      ? await docs("api::catalog-entry.catalog-entry").update({ documentId: found.documentId, data, status: "published" })
      : await docs("api::catalog-entry.catalog-entry").create({ data, status: "published" });
    if (doc) entryIdBySlug[e.slug] = doc.documentId;
  }

  // Entries — pass 2: link parents
  for (const e of ENTRIES) {
    if (!e.parentSlug) continue;
    const parentId = entryIdBySlug[e.parentSlug];
    if (parentId) {
      await docs("api::catalog-entry.catalog-entry").update({
        documentId: entryIdBySlug[e.slug],
        data: { parent: parentId },
        status: "published",
      });
    }
  }

  // Hero banner (upsert by title)
  const heroFound = await docs("api::banner.banner").findFirst({ filters: { title: HERO.title } });
  if (!heroFound) await docs("api::banner.banner").create({ data: HERO as any, status: "published" });

  // Site settings (single type) — cast to any: the single-type Update type omits `status`.
  const siteSetting: any = docs("api::site-setting.site-setting");
  await siteSetting.update({ data: SETTINGS, status: "published" }).catch(async () => {
    await siteSetting.create({ data: SETTINGS, status: "published" });
  });

  strapi.log.info(`[seed] ${ENTRIES.length} entries, ${BRANDS.length} brands ensured`);
}

export default {
  register() {},
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      await setPublicPermissions(strapi);
      // Seed ONCE (only when empty) so manual edits in the admin are never
      // overwritten on restart. Force a re-seed with SEED=force; skip with SEED=false.
      const existing = await strapi.db.query("api::catalog-entry.catalog-entry").count();
      if (process.env.SEED === "force" || (existing === 0 && process.env.SEED !== "false")) {
        await seed(strapi);
      } else {
        strapi.log.info(`[seed] skipped (${existing} entries already exist; SEED=force to reseed)`);
      }
    } catch (err) {
      strapi.log.error("[seed] bootstrap failed: " + (err as Error).message);
    }
  },
};
