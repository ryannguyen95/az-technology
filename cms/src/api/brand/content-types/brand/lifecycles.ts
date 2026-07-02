// Auto-generate the brand slug from the name on create (read-only in admin).
const slugify = (s: string) =>
  (s || "")
    .normalize("NFKD").replace(/đ/g, "d").replace(/Đ/g, "d")
    .replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default {
  async beforeCreate(event: any) {
    const { data } = event.params;
    if (data.slug || !data.name) return;
    const base = slugify(data.name) || "brand";
    let slug = base;
    let i = 2;
    // eslint-disable-next-line no-await-in-loop
    while (await strapi.documents("api::brand.brand").findFirst({ filters: { slug } })) {
      slug = `${base}-${i++}`;
    }
    data.slug = slug;
  },
};
