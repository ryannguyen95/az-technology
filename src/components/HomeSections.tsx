import Link from "next/link";
import type { HomeSection } from "@/lib/types";
import { toCard } from "@/lib/card";
import { SectionHeading } from "./SectionHeading";
import { CategoryTile } from "./Cards";
import { HomeProductExpander } from "./HomeProductExpander";
import { Icon } from "./Icon";

// Renders the CMS-configured homepage sections (Strapi dynamic zone `home-page.sections`).
// Each entry is either a `product-list` (one product list, optionally split into
// sub-sections — the first 5 show, the rest reveal inline via "Xem tất cả") or a
// `category-list` (a grid of category tiles, e.g. "Khám phá theo nhóm giải pháp").
// Background alternates between product-list sections only (matches the previous
// layout, where the category tiles grid always sat on the plain page background).
export function HomeSections({ sections }: { sections: HomeSection[] }) {
  const visible = sections.filter((s) =>
    s.type === "category-list" ? s.tiles.length : s.products.length || s.subsections.some((ss) => ss.products.length)
  );

  let productIndex = -1;

  return (
    <>
      {visible.map((s, i) => {
        if (s.type === "category-list") {
          return (
            <section key={i} className="py-14">
              <div className="max-w-site mx-auto px-4">
                <div className="reveal">
                  <SectionHeading title={s.title} />
                </div>
                <div className="reveal mt-8 grid grid-cols-3 sm:grid-cols-5 gap-4">
                  {s.tiles.map((tile) => (
                    <CategoryTile key={tile.href} tile={tile} />
                  ))}
                </div>
              </div>
            </section>
          );
        }

        productIndex += 1;
        const subs = s.subsections.filter((ss) => ss.products.length);
        const inner = (
          <section className="py-14">
            <div className="max-w-site mx-auto px-4">
              {subs.length ? (
                <>
                  <div className="reveal flex items-end justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-navy">{s.title}</h2>
                    {s.moreHref && (
                      <Link
                        href={s.moreHref}
                        className="group inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all shrink-0"
                      >
                        Xem thêm
                        <Icon name="arrowRight" className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                  <div className="mt-9 space-y-12">
                    {subs.map((ss, j) => (
                      <div key={j} className="reveal">
                        <HomeProductExpander title={ss.title} products={ss.products.map(toCard)} moreHref={ss.moreHref} />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="reveal">
                  <HomeProductExpander title={s.title} products={s.products.map(toCard)} moreHref={s.moreHref} big />
                </div>
              )}
            </div>
          </section>
        );
        return (
          <div key={i} className={productIndex % 2 === 1 ? "bg-white" : ""}>
            {inner}
          </div>
        );
      })}
    </>
  );
}
