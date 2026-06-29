"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAV, type MegaItem } from "@/lib/nav";
import { settings } from "@/lib/data";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { AZLogo } from "./Cards";
import { useQuote } from "./QuoteModal";

const tel = settings.hotline.replace(/\s/g, "");

function SearchBar({ className = "" }: { className?: string }) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className={`relative ${className}`}>
      <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        placeholder="Tìm sản phẩm, giải pháp, dịch vụ..."
        className="w-full rounded-full bg-white border border-slate-200 pl-9 pr-4 py-2 text-sm text-navy placeholder:text-slate-400 outline-none focus:border-primary transition-colors"
      />
    </form>
  );
}

function MegaPanel({ item, onClose }: { item: MegaItem; onClose: () => void }) {
  if (!item.columns) return null;
  const hasFeatured = !!item.featured;
  return (
    <div className="mega-enter absolute left-0 right-0 top-full pt-2 z-50" onMouseLeave={onClose}>
      <div className="bg-white rounded-2xl shadow-mega border border-slate-100 overflow-hidden">
        <div className="grid" style={{ gridTemplateColumns: hasFeatured ? "1fr 280px" : "1fr" }}>
          <div
            className={`grid gap-x-6 gap-y-5 p-6 ${
              item.columns.length >= 5
                ? "grid-cols-3 lg:grid-cols-5"
                : item.columns.length === 4
                ? "grid-cols-2 lg:grid-cols-4"
                : "grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {item.columns.map((col, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <h4 className="text-[12.5px] font-extrabold tracking-wide uppercase text-navy">{col.heading}</h4>
                </div>
                <ul className="space-y-1.5">
                  {col.items.map((it, j) => (
                    <li key={j}>
                      <Link href={item.href} className="group flex items-center gap-1.5 text-[13.5px] text-slate-600 hover:text-primary transition-colors">
                        <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-primary transition-colors" />
                        <span className="leading-snug">{it}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {hasFeatured && item.featured && (
            <Link href={item.featured.href} className="group relative az-grad-navy text-white p-6 flex flex-col justify-end overflow-hidden">
              <div className="absolute inset-0 az-dots opacity-30" />
              <div className="absolute right-4 top-4 w-12 h-12 rounded-xl bg-cyan-400/90 text-navy grid place-items-center shadow-lg">
                <Icon name="sparkles" className="w-6 h-6" />
              </div>
              <div className="relative">
                <span className="inline-block text-[10px] font-extrabold tracking-widest uppercase bg-white/15 px-2 py-1 rounded-md mb-3">{item.featured.tag}</span>
                <h4 className="text-lg font-extrabold leading-snug">{item.featured.title}</h4>
                <p className="text-[13px] text-white/75 mt-1.5 leading-relaxed">{item.featured.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300 group-hover:gap-2.5 transition-all">
                  Xem chi tiết <Icon name="arrowRight" className="w-4 h-4" />
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [exp, setExp] = useState<string | null>(null);
  const { openQuote } = useQuote();
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <div className={`fixed inset-0 z-[110] lg:hidden ${open ? "" : "pointer-events-none"}`}>
      <div className={`absolute inset-0 bg-navy-deep/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <div className={`absolute top-0 left-0 h-full w-[86%] max-w-sm bg-white shadow-pop transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="az-grad-navy text-white px-4 py-4 flex items-center justify-between">
          <AZLogo light />
          <button onClick={onClose} aria-label="Đóng" className="w-9 h-9 grid place-items-center rounded-full bg-white/15">
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <SearchBar />
        </div>
        <nav className="flex-1 overflow-y-auto az-scroll px-2 pb-4">
          {NAV.map((item) => (
            <div key={item.key} className="border-b border-slate-100">
              {item.columns ? (
                <>
                  <button onClick={() => setExp(exp === item.key ? null : item.key)} className="w-full flex items-center justify-between px-3 py-3.5 font-extrabold text-navy text-[15px]">
                    {item.label}
                    <Icon name="chevronDown" className={`w-4 h-4 text-slate-400 transition-transform ${exp === item.key ? "rotate-180" : ""}`} />
                  </button>
                  <div className="grid transition-all duration-300" style={{ gridTemplateRows: exp === item.key ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <div className="pb-3 pl-3">
                        {item.columns.map((col, i) => (
                          <div key={i} className="mb-3">
                            <div className="text-[11px] font-extrabold uppercase tracking-wide text-cyan-600 mb-1.5">{col.heading}</div>
                            <ul className="space-y-1 pl-1">
                              {col.items.map((it, j) => (
                                <li key={j}>
                                  <Link href={item.href} onClick={onClose} className="block text-[13.5px] text-slate-600 py-1">{it}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Link href={item.href} onClick={onClose} className="block px-3 py-3.5 font-extrabold text-navy text-[15px]">{item.label}</Link>
              )}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <Button variant="primary" className="w-full" icon="send" onClick={() => { onClose(); openQuote({ mode: "full" }); }}>
            NHẬN BÁO GIÁ
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { openQuote } = useQuote();

  const enter = (key: string) => {
    if (timer.current) clearTimeout(timer.current);
    setActive(key);
  };
  const leave = () => {
    timer.current = setTimeout(() => setActive(null), 120);
  };
  const current = NAV.find((n) => n.key === active && n.columns);

  return (
    <header className="sticky top-0 z-[100]">
      {/* Topbar */}
      <div className="az-grad-navy text-white text-[13px] hidden sm:block">
        <div className="max-w-site mx-auto px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-5">
            <a href={`tel:${tel}`} className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors font-semibold whitespace-nowrap">
              <Icon name="phone" className="w-3.5 h-3.5" /> {settings.hotline}
            </a>
            <a href={`mailto:${settings.email}`} className="hidden md:flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
              <Icon name="mail" className="w-3.5 h-3.5" /> {settings.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => openQuote({ mode: "callback" })} className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
              <Icon name="zalo" className="w-3.5 h-3.5" /> Zalo
            </button>
            <a href="/lien-he#map" className="hidden md:flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
              <Icon name="location" className="w-3.5 h-3.5" /> Bản đồ
            </a>
            <span className="text-cyan-300/80 font-semibold tracking-wide hidden lg:inline">{settings.slogan}</span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="bg-white/95 backdrop-blur border-b border-slate-200 shadow-[0_2px_12px_-6px_rgba(0,45,90,.2)]" onMouseLeave={leave}>
        <div className="max-w-site mx-auto px-4">
          <div className="flex items-center gap-4 h-16">
            <button onClick={() => setMobile(true)} aria-label="Mở menu" className="lg:hidden w-10 h-10 -ml-2 grid place-items-center rounded-lg text-navy hover:bg-slate-100">
              <Icon name="menu" className="w-6 h-6" />
            </button>
            <AZLogo />
            <SearchBar className="hidden xl:block flex-1 max-w-md" />
            <div className="flex-1 hidden xl:block" />
            <Button variant="primary" size="sm" className="ml-auto lg:ml-0" icon="send" onClick={() => openQuote({ mode: "full" })}>
              <span className="hidden sm:inline">NHẬN BÁO GIÁ</span>
              <span className="sm:hidden">Báo giá</span>
            </Button>
          </div>
        </div>
        {/* nav row */}
        <div className="hidden lg:block border-t border-slate-100 relative">
          <div className="max-w-site mx-auto px-4">
            <nav className="flex items-center gap-0.5">
              {NAV.map((item) => {
                const isActive = active === item.key;
                return (
                  <div key={item.key} onMouseEnter={() => enter(item.key)} className="relative">
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 px-3.5 py-3 text-[13.5px] font-extrabold tracking-wide whitespace-nowrap transition-colors ${isActive ? "text-primary" : "text-navy hover:text-primary"}`}
                    >
                      {item.label}
                      {item.columns && <Icon name="chevronDown" className={`w-3.5 h-3.5 transition-transform ${isActive ? "rotate-180 text-primary" : "text-slate-400"}`} />}
                      {isActive && <span className="absolute left-3 right-3 -bottom-px h-0.5 bg-primary rounded-full" />}
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>
          {current && (
            <div className="max-w-site mx-auto px-4">
              <div className="relative" onMouseEnter={() => enter(current.key)}>
                <MegaPanel item={current} onClose={leave} />
              </div>
            </div>
          )}
        </div>
      </div>

      <MobileNav open={mobile} onClose={() => setMobile(false)} />
    </header>
  );
}
