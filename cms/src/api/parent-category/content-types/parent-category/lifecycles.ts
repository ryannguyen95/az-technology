// Auto-generate the slug from the title on create (read-only in admin).
const slugify = (s: string) =>
  (s || "")
    .normalize("NFKD").replace(/đ/g, "d").replace(/Đ/g, "d")
    .replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default {
  async beforeCreate(event: any) {
    const { data } = event.params;
    if (data.slug || !data.title) return;
    const base = slugify(data.title) || "danh-muc-cha";
    let slug = base; let i = 2;
    // eslint-disable-next-line no-await-in-loop
    while (await strapi.documents("api::parent-category.parent-category").findFirst({ filters: { slug } })) {
      slug = `${base}-${i++}`;
    }
    data.slug = slug;
  },
};
