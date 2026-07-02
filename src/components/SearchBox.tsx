"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CardProduct } from "@/lib/card";
import { startRouteProgress } from "@/lib/progress";
import { Icon } from "./Icon";

type Hit = CardProduct;

// Live product search: debounced dropdown of matches under the bar; Enter (or
// "see all") routes to the full /tim-kiem results page. Full-text via /api/search.
export function SearchBox({ className = "", onNavigate }: { className?: string; onNavigate?: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(-1); // -1 = input, 0..hits-1 = a hit
  const rootRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const term = q.trim();

  // Debounced fetch against the search API.
  useEffect(() => {
    if (!term) {
      setHits([]);
      setTotal(0);
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`, { signal: ac.signal });
        const data = await res.json();
        setHits(data.hits ?? []);
        setTotal(data.total ?? 0);
        setActive(-1);
      } catch {
        /* aborted or failed — keep previous hits */
      } finally {
        setLoading(false);
      }
    }, 180);
    return () => clearTimeout(t);
  }, [term]);

  // Close on outside click.
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      onNavigate?.();
      startRouteProgress();
      router.push(href);
    },
    [router, onNavigate],
  );

  const submitSearch = useCallback(() => {
    if (!term) return;
    go(`/tim-kiem?q=${encodeURIComponent(term)}`);
  }, [term, go]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, hits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0 && hits[active]) go(hits[active].href);
      else submitSearch();
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const showPanel = open && term.length > 0;

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitSearch();
        }}
        className="relative"
      >
        {loading ? (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none">
            <span className="block w-4 h-4 rounded-full border-2 border-slate-200 border-t-primary animate-spin" />
          </span>
        ) : (
          <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        )}
        <input
          type="text"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Tìm sản phẩm, giải pháp, dịch vụ..."
          aria-label="Tìm kiếm"
          className="w-full rounded-full bg-white border border-slate-200 pl-9 pr-9 py-2 text-sm text-navy placeholder:text-slate-400 outline-none focus:border-primary transition-colors"
        />
        {q && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              setOpen(false);
            }}
            aria-label="Xoá"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy"
          >
            <Icon name="x" className="w-4 h-4" />
          </button>
        )}
      </form>

      {showPanel && (
        <div className="mega-enter absolute left-0 right-0 top-full mt-2 z-[120] bg-white rounded-2xl shadow-pop border border-slate-100 overflow-hidden">
          {hits.length > 0 ? (
            <>
              <ul className="max-h-[min(70vh,420px)] overflow-y-auto az-scroll py-1.5">
                {hits.map((h, i) => (
                  <li key={h.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(h.href)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors ${
                        active === i ? "bg-primary-50" : "hover:bg-slate-50"
                      }`}
                    >
                      <span className="w-10 h-10 shrink-0 rounded-xl bg-primary-50 text-primary grid place-items-center overflow-hidden">
                        {h.coverImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={h.coverImage} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Icon name={h.icon || "layers"} className="w-5 h-5" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-bold uppercase tracking-wide text-cyan-600 truncate">{h.cat}</span>
                        <span className="block text-[13.5px] font-bold text-navy leading-snug truncate">{h.name}</span>
                      </span>
                      {h.badge && (
                        <span
                          className={`shrink-0 text-[10.5px] font-extrabold px-2 py-0.5 rounded-md whitespace-nowrap ${
                            h.badge.startsWith("-") ? "bg-sale text-white" : "bg-cyan-100 text-navy"
                          }`}
                        >
                          {h.badge}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={submitSearch}
                className="w-full flex items-center justify-between gap-2 px-4 py-3 border-t border-slate-100 bg-slate-50/60 hover:bg-slate-100 transition-colors group"
              >
                <span className="text-[13px] font-bold text-navy">
                  Xem tất cả {total} kết quả cho <span className="text-primary">“{term}”</span>
                </span>
                <Icon name="arrowRight" className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform" />
              </button>
            </>
          ) : loading ? (
            <div className="px-4 py-8 text-center text-sm text-slate-400">Đang tìm…</div>
          ) : (
            <div className="px-4 py-10 text-center">
              <Icon name="search" className="w-9 h-9 mx-auto mb-3 text-slate-300" />
              <p className="text-[13.5px] font-bold text-navy">Không tìm thấy kết quả</p>
              <p className="text-[12.5px] text-slate-400 mt-1">
                Thử từ khoá khác cho <span className="font-semibold text-slate-500">“{term}”</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
