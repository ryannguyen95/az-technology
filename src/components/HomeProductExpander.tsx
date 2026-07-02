"use client";

import { useState } from "react";
import Link from "next/link";
import type { CardProduct } from "@/lib/card";
import { Icon } from "./Icon";
import { CardRow } from "./Cards";

const INITIAL = 5;

// One product list: shows the first 5. If `moreHref` is set, "Xem thêm" navigates
// to that (chosen parent-category) page — the list itself can come from any source.
// Otherwise "Xem tất cả" reveals the rest inline. `big` renders the section-level
// title (h2); otherwise a sub-row title (h3).
export function HomeProductExpander({ title, products, moreHref, big = false }: { title: string; products: CardProduct[]; moreHref?: string; big?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  if (!products.length) return null;
  const shown = moreHref || !expanded ? products.slice(0, INITIAL) : products;
  const canExpand = products.length > INITIAL;

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        {big ? (
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-navy">{title}</h2>
        ) : (
          <h3 className="text-lg sm:text-xl font-extrabold text-navy">{title}</h3>
        )}
        {moreHref ? (
          <Link
            href={moreHref}
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all shrink-0"
          >
            Xem thêm
            <Icon name="arrowRight" className="w-4 h-4" />
          </Link>
        ) : (
          canExpand && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all"
            >
              {expanded ? "Thu gọn" : "Xem tất cả"}
              <Icon name={expanded ? "chevronDown" : "arrowRight"} className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
          )
        )}
      </div>
      <div className="mt-5">
        <CardRow products={shown} />
      </div>
    </div>
  );
}
