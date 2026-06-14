"use client";

import Link from "next/link";
import { useState } from "react";
import type { NavItem, SiteSettings } from "@/lib/types";
import { Icon } from "./Icon";
import { QuoteButton } from "./QuoteButton";

export function Header({ nav, settings }: { nav: NavItem[]; settings: SiteSettings }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50">
      {/* Topbar */}
      <div className="az-grad-navy text-white text-sm">
        <div className="az-container flex h-9 items-center justify-between">
          <div className="flex items-center gap-4">
            <a href={`tel:${settings.hotline.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-cyan-200">
              <Icon name="phone" className="h-3.5 w-3.5" /> <span className="font-semibold">{settings.hotline}</span>
            </a>
            <a href={`mailto:${settings.email}`} className="hidden items-center gap-1.5 hover:text-cyan-200 sm:flex">
              <Icon name="mail" className="h-3.5 w-3.5" /> {settings.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href={settings.zaloUrl} className="flex items-center gap-1.5 hover:text-cyan-200">
              <Icon name="zalo" className="h-3.5 w-3.5" /> Zalo
            </a>
            <a href={settings.mapUrl} className="hidden items-center gap-1.5 hover:text-cyan-200 sm:flex">
              <Icon name="map" className="h-3.5 w-3.5" /> Bản đồ
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-ink/5 bg-white/95 backdrop-blur shadow-sm">
        <div className="az-container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg az-grad text-lg font-extrabold text-white">AZ</span>
            <span className="leading-tight">
              <span className="block text-lg font-extrabold text-navy">AZ<span className="text-primary">Technology</span></span>
              <span className="block text-[10px] text-ink/50">{settings.slogan}</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpenMenu(null)}>
            {nav.map((item) => (
              <div key={item.label} className="relative" onMouseEnter={() => setOpenMenu(item.columns ? item.label : null)}>
                <Link href={item.href}
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-navy hover:text-primary"
                  aria-expanded={openMenu === item.label}>
                  {item.label}
                  {item.columns && <Icon name="arrow" className="h-3 w-3 rotate-90 opacity-50" />}
                </Link>
                {item.columns && openMenu === item.label && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="grid w-[640px] grid-cols-2 gap-6 rounded-xl2 bg-white p-6 shadow-mega animate-fadeUp">
                      {item.columns.map((col) => (
                        <div key={col.heading}>
                          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-primary">{col.heading}</p>
                          <ul className="space-y-1.5">
                            {col.links.map((l) => (
                              <li key={l.href}>
                                <Link href={l.href} className="block text-sm text-ink/70 hover:text-primary">{l.label}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <QuoteButton className="hidden rounded-lg az-grad px-4 py-2.5 text-sm font-bold text-white shadow-cardHover hover:opacity-95 sm:block">
              NHẬN BÁO GIÁ
            </QuoteButton>
            <button className="lg:hidden" aria-label="Mở menu" onClick={() => setDrawer(true)}>
              <Icon name="menu" className="h-6 w-6 text-navy" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer (mega-menu -> accordion, design review Pass 6) */}
      {drawer && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-navy-deep/50" onClick={() => setDrawer(false)} />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white p-5 shadow-pop animate-fadeIn">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg font-extrabold text-navy">Danh mục</span>
              <button aria-label="Đóng" onClick={() => setDrawer(false)}><Icon name="close" className="h-6 w-6" /></button>
            </div>
            <nav className="space-y-1">
              {nav.map((item) => (
                <div key={item.label} className="border-b border-ink/5">
                  {item.columns ? (
                    <>
                      <button
                        className="flex w-full items-center justify-between py-3 text-left font-semibold text-navy"
                        aria-expanded={openAccordion === item.label}
                        onClick={() => setOpenAccordion(openAccordion === item.label ? null : item.label)}>
                        {item.label}
                        <Icon name="arrow" className={`h-4 w-4 transition ${openAccordion === item.label ? "rotate-[270deg]" : "rotate-90"}`} />
                      </button>
                      {openAccordion === item.label && (
                        <div className="pb-3 pl-3">
                          {item.columns.map((col) => (
                            <div key={col.heading} className="mb-2">
                              <p className="text-xs font-bold uppercase tracking-wide text-primary">{col.heading}</p>
                              {col.links.map((l) => (
                                <Link key={l.href} href={l.href} onClick={() => setDrawer(false)}
                                  className="block py-1.5 text-sm text-ink/70">{l.label}</Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={item.href} onClick={() => setDrawer(false)} className="block py-3 font-semibold text-navy">{item.label}</Link>
                  )}
                </div>
              ))}
            </nav>
            <QuoteButton className="mt-5 w-full rounded-lg az-grad px-4 py-3 font-bold text-white">NHẬN BÁO GIÁ</QuoteButton>
          </div>
        </div>
      )}
    </header>
  );
}
