import type { Core } from "@strapi/strapi";
import { BRANDS, CATEGORIES, HEROES, HOME_CATEGORY_LIST, HOME_SECTIONS, PARENT_CATEGORIES, PRODUCTS, SETTINGS, slugify } from "./seed/data";

// Vietnamese labels for the admin Content Manager. Strapi has no schema-level
// label, so we persist them into the content-manager configuration. Best-effort.
const VI_LABELS: Record<string, Record<string, string>> = {
  "api::parent-category.parent-category": {
    title: "Tên danh mục cha", slug: "Đường dẫn (slug)",
    icon: "Biểu tượng", order: "Thứ tự", summary: "Tóm tắt",
  },
  "api::category.category": {
    title: "Tên danh mục con", slug: "Đường dẫn (slug)", parent: "Danh mục cha",
    icon: "Biểu tượng", order: "Thứ tự", summary: "Tóm tắt", description: "Nội dung trang danh mục",
  },
  "api::product.product": {
    title: "Tên sản phẩm", headline: "Tiêu đề trang chi tiết", slug: "Đường dẫn (slug)",
    category: "Danh mục", order: "Thứ tự", icon: "Biểu tượng", tone: "Tông màu", badge: "Nhãn nổi bật",
    summary: "Tóm tắt ngắn", highlights: "Điểm nổi bật", description: "Mô tả sản phẩm",
    specs: "Yêu cầu hệ thống / Thông số kỹ thuật", coverImage: "Ảnh đại diện", gallery: "Thư viện ảnh",
    brands: "Thương hiệu", seo: "SEO",
  },
  "api::brand.brand": { name: "Tên thương hiệu", slug: "Đường dẫn (slug)", products: "Sản phẩm" },
  "api::banner.banner": {
    title: "Tiêu đề", image: "Hình ảnh", ctaLabel: "Nhãn nút", ctaHref: "Liên kết nút",
    order: "Thứ tự", active: "Đang hiển thị",
  },
  "api::quote-request.quote-request": {
    name: "Họ tên", phone: "Số điện thoại", email: "Email", company: "Công ty",
    interest: "Quan tâm", message: "Lời nhắn", sourcePage: "Trang gửi", consentGiven: "Đã đồng ý", status: "Trạng thái",
  },
  "api::site-setting.site-setting": {
    company: "Tên công ty", shortName: "Tên rút gọn", slogan: "Khẩu hiệu", hotline: "Hotline",
    email: "Email", address: "Địa chỉ", zaloUrl: "Link Zalo", mapUrl: "Link bản đồ",
  },
  "api::home-page.home-page": {
    sections: "Các khối trang chủ",
  },
};
const COMPONENT_LABELS: Record<string, Record<string, string>> = {
  "home.subsection": {
    title: "Tiêu đề mục con", products: "Sản phẩm",
    parentCategory: "Danh mục cha (nút Xem thêm)",
  },
  "sections.product-list": {
    title: "Tiêu đề khối", products: "Sản phẩm",
    subsections: "Mục con", parentCategory: "Danh mục cha (nút Xem thêm)",
  },
  "sections.category-list": {
    title: "Tiêu đề khối", categories: "Danh mục",
  },
};

async function setVietnameseLabels(strapi: Core.Strapi) {
  const ctService: any = strapi.plugin("content-manager").service("content-types");
  for (const [uid, fields] of Object.entries(VI_LABELS)) {
    try {
      const ct = strapi.contentType(uid as any);
      const cfg = await ctService.findConfiguration(ct);
      cfg.metadatas = cfg.metadatas || {};
      for (const [field, label] of Object.entries(fields)) {
        const meta = cfg.metadatas[field];
        if (!meta) continue;
        meta.edit = { ...(meta.edit || {}), label };
        meta.list = { ...(meta.list || {}), label };
        if (field === "slug") meta.edit.editable = false; // slug auto-generated, read-only
      }
      await ctService.updateConfiguration(ct, cfg);
    } catch (err) {
      strapi.log.warn(`[seed] vi-labels skipped for ${uid}: ${(err as Error).message}`);
    }
  }
  const compService: any = strapi.plugin("content-manager").service("components");
  for (const [uid, fields] of Object.entries(COMPONENT_LABELS)) {
    try {
      const comp = (strapi as any).components[uid];
      const cfg = await compService.findConfiguration(comp);
      cfg.metadatas = cfg.metadatas || {};
      for (const [field, label] of Object.entries(fields)) {
        const meta = cfg.metadatas[field];
        if (!meta) continue;
        meta.edit = { ...(meta.edit || {}), label };
        meta.list = { ...(meta.list || {}), label };
      }
      await compService.updateConfiguration(comp, cfg);
    } catch (err) {
      strapi.log.warn(`[seed] vi-labels skipped for component ${uid}: ${(err as Error).message}`);
    }
  }
  strapi.log.info("[seed] vietnamese field labels ensured");
}

// Public read: published only. quote-request is create-only (holds PII).
const PUBLIC_FIND = [
  "api::parent-category.parent-category",
  "api::category.category",
  "api::product.product",
  "api::brand.brand",
  "api::banner.banner",
];

async function setPublicPermissions(strapi: Core.Strapi) {
  const role = await strapi.db.query("plugin::users-permissions.role").findOne({ where: { type: "public" } });
  if (!role) return;
  const wanted = [
    ...PUBLIC_FIND.flatMap((uid) => [`${uid}.find`, `${uid}.findOne`]),
    "api::site-setting.site-setting.find",
    "api::home-page.home-page.find",
    "api::quote-request.quote-request.create",
  ];
  for (const action of wanted) {
    const existing = await strapi.db.query("plugin::users-permissions.permission").findOne({ where: { action, role: role.id } });
    if (!existing) await strapi.db.query("plugin::users-permissions.permission").create({ data: { action, role: role.id } });
  }
  strapi.log.info("[seed] public permissions ensured");
}

async function ensureSiteSetting(strapi: Core.Strapi) {
  const ss: any = strapi.documents("api::site-setting.site-setting");
  if (!(await ss.findFirst())) {
    await ss.create({ data: SETTINGS, status: "published" });
    strapi.log.info("[seed] site settings created");
  }
}

async function seed(strapi: Core.Strapi) {
  const docs = strapi.documents;

  // Parent categories (Danh mục cha)
  const parentIdBySlug: Record<string, string> = {};
  for (const c of PARENT_CATEGORIES) {
    const found = await docs("api::parent-category.parent-category").findFirst({ filters: { slug: c.slug } });
    const data: any = { title: c.title, slug: c.slug, icon: c.icon, order: c.order ?? 0, summary: c.summary };
    const doc = found
      ? await docs("api::parent-category.parent-category").update({ documentId: found.documentId, data, status: "published" })
      : await docs("api::parent-category.parent-category").create({ data, status: "published" });
    if (doc) parentIdBySlug[c.slug] = doc.documentId;
  }

  // Categories (Danh mục con) — linked to their parent category
  const catIdBySlug: Record<string, string> = {};
  for (const c of CATEGORIES) {
    const found = await docs("api::category.category").findFirst({ filters: { slug: c.slug } });
    const data: any = {
      title: c.title, slug: c.slug, icon: c.icon, order: c.order ?? 0, summary: c.summary,
      description: c.description, parent: parentIdBySlug[c.parentSlug],
    };
    const doc = found
      ? await docs("api::category.category").update({ documentId: found.documentId, data, status: "published" })
      : await docs("api::category.category").create({ data, status: "published" });
    if (doc) catIdBySlug[c.slug] = doc.documentId;
  }

  // Brands
  const brandIdBySlug: Record<string, string> = {};
  for (const name of BRANDS) {
    const slug = slugify(name);
    const found = await docs("api::brand.brand").findFirst({ filters: { slug } });
    const doc = found ?? (await docs("api::brand.brand").create({ data: { name, slug }, status: "published" }));
    brandIdBySlug[slug] = doc.documentId;
  }

  // Products
  for (const p of PRODUCTS) {
    const found = await docs("api::product.product").findFirst({ filters: { slug: p.slug } });
    const data: any = {
      title: p.title, slug: p.slug, headline: p.headline, order: p.order ?? 0,
      category: catIdBySlug[p.categorySlug], icon: p.icon, tone: p.tone, badge: p.badge,
      summary: p.summary, highlights: (p.highlights ?? []).map((text) => ({ text })),
      description: p.description, specs: p.specs,
      brands: (p.brandSlugs ?? []).map((s) => brandIdBySlug[s]).filter(Boolean),
    };
    found
      ? await docs("api::product.product").update({ documentId: found.documentId, data, status: "published" })
      : await docs("api::product.product").create({ data, status: "published" });
  }

  // Banners
  for (const hero of HEROES) {
    const f = await docs("api::banner.banner").findFirst({ filters: { title: hero.title } });
    if (!f) await docs("api::banner.banner").create({ data: hero as any, status: "published" });
  }

  strapi.log.info(`[seed] ${PARENT_CATEGORIES.length} parent categories, ${CATEGORIES.length} categories, ${PRODUCTS.length} products, ${BRANDS.length} brands`);
}

// Home page (single-type, dynamic zone). Rebuilds the default sections
// ("Khám phá theo nhóm giải pháp" category-list + the product-list sections
// that used to be `home-section` rows) only when the page has no sections yet,
// or when SEED=force (schema changes get re-applied from the seed data).
async function ensureHomePage(strapi: Core.Strapi) {
  const force = process.env.SEED === "force";
  const hp = strapi.documents("api::home-page.home-page");
  const existing: any = await hp.findFirst({ populate: { sections: true } as any });
  if (existing?.sections?.length > 0 && !force) return;

  const resolveIn = (uid: "api::product.product" | "api::category.category") => async (slugs: string[] = []) => {
    const ids: string[] = [];
    for (const slug of slugs) {
      const doc = await strapi.documents(uid).findFirst({ filters: { slug } });
      if (doc) ids.push(doc.documentId);
    }
    return ids;
  };
  const resolveProducts = resolveIn("api::product.product");
  const resolveCategories = resolveIn("api::category.category");
  // "Xem thêm" target: resolve a parent-category slug → its documentId (or undefined).
  const resolveParent = async (slug?: string) => {
    if (!slug) return undefined;
    const doc = await strapi.documents("api::parent-category.parent-category").findFirst({ filters: { slug } });
    return doc?.documentId;
  };

  const productListSections = await Promise.all(
    HOME_SECTIONS.map(async (s) => {
      const subsections = s.subsections
        ? await Promise.all(s.subsections.map(async (ss) => ({
            title: ss.title,
            products: await resolveProducts(ss.productSlugs),
            parentCategory: await resolveParent(ss.parentCategorySlug),
          })))
        : [];
      return {
        __component: "sections.product-list" as const,
        title: s.title,
        products: await resolveProducts(s.productSlugs ?? []),
        parentCategory: await resolveParent(s.parentCategorySlug),
        subsections,
      };
    }),
  );

  const categoryListSection = {
    __component: "sections.category-list" as const,
    title: HOME_CATEGORY_LIST.title,
    categories: await resolveCategories(HOME_CATEGORY_LIST.categorySlugs),
  };

  // Order: category tile grid first (was rendered above the product rows),
  // then the product-list sections in their original order.
  const sections = [categoryListSection, ...productListSections];

  if (existing) {
    await hp.update({ documentId: existing.documentId, data: { sections } as any, status: "published" });
    strapi.log.info(`[seed] home page sections updated (${sections.length})`);
  } else {
    await hp.create({ data: { sections } as any, status: "published" });
    strapi.log.info(`[seed] home page created with ${sections.length} sections`);
  }
}

export default {
  register() {},
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      await setPublicPermissions(strapi);
      await setVietnameseLabels(strapi);
      await ensureSiteSetting(strapi);
      const existing = await strapi.db.query("api::product.product").count();
      if (process.env.SEED === "force" || (existing === 0 && process.env.SEED !== "false")) {
        await seed(strapi);
      } else {
        strapi.log.info(`[seed] skipped (${existing} products already exist; SEED=force to reseed)`);
      }
      await ensureHomePage(strapi);
    } catch (err) {
      strapi.log.error("[seed] bootstrap failed: " + (err as Error).message);
    }
  },
};
