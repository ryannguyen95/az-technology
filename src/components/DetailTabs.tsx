"use client";

import { useState } from "react";
import type { Block } from "@/lib/types";
import { cleanHtml } from "@/lib/sanitize";
import { Icon } from "./Icon";

function RichBlocks({ blocks }: { blocks: Extract<Block, { type: "richText" }>[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        const html = cleanHtml(b.html ?? "");
        if (!html.trim()) return null;
        return (
          <div key={i}>
            {b.heading && <h3 className="mb-3 text-lg font-bold text-navy">{b.heading}</h3>}
            <div className="prose prose-slate max-w-none prose-headings:text-navy prose-a:text-primary" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        );
      })}
    </div>
  );
}

function Specs({ blocks }: { blocks: Extract<Block, { type: "specAccordion" }>[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => (
        <div key={i}>
          {b.title && <h3 className="mb-3 text-lg font-bold text-navy">{b.title}</h3>}
          <dl className="overflow-hidden rounded-2xl border border-slate-200">
            {b.rows.map((r, j) => (
              <div key={j} className={`grid grid-cols-3 gap-4 p-3.5 text-sm ${j % 2 ? "bg-mist" : "bg-white"}`}>
                <dt className="font-medium text-slate-500">{r.label}</dt>
                <dd className="col-span-2 text-navy">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

function Faq({ blocks }: { blocks: Extract<Block, { type: "faq" }>[] }) {
  const items = blocks.flatMap((b) => b.items);
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white overflow-hidden">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button onClick={() => setOpen(isOpen ? -1 : i)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-primary-50/50 transition-colors">
              <span className="font-bold text-navy text-[15px]">{it.q}</span>
              <span className={`shrink-0 w-7 h-7 grid place-items-center rounded-full bg-primary-50 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                <Icon name="chevronDown" className="w-4 h-4" />
              </span>
            </button>
            <div className="grid transition-all duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-[14px] leading-relaxed text-slate-600">{it.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function DetailTabs({ blocks, lead }: { blocks: Block[]; lead?: string }) {
  const rich = blocks.filter((b): b is Extract<Block, { type: "richText" }> => b.type === "richText");
  const specs = blocks.filter((b): b is Extract<Block, { type: "specAccordion" }> => b.type === "specAccordion");
  const faqs = blocks.filter((b): b is Extract<Block, { type: "faq" }> => b.type === "faq");

  const tabs: { label: string; content: React.ReactNode }[] = [];
  const descContent =
    rich.length || lead ? (
      <div className="space-y-6">
        {lead && <div className="prose prose-slate max-w-none prose-headings:text-navy prose-a:text-primary" dangerouslySetInnerHTML={{ __html: cleanHtml(lead) }} />}
        {rich.length > 0 && <RichBlocks blocks={rich} />}
      </div>
    ) : null;
  if (descContent) tabs.push({ label: "Mô tả chi tiết", content: descContent });
  if (specs.length) tabs.push({ label: "Thông số kỹ thuật", content: <Specs blocks={specs} /> });
  if (faqs.length) tabs.push({ label: "Câu hỏi thường gặp", content: <Faq blocks={faqs} /> });

  const [active, setActive] = useState(0);
  if (!tabs.length) return null;

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto no-sb border-b border-slate-200">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setActive(i)} className={`relative px-4 sm:px-5 py-3.5 text-sm font-bold whitespace-nowrap transition-colors ${active === i ? "text-primary" : "text-slate-500 hover:text-navy"}`}>
            {t.label}
            {active === i && <span className="absolute left-2 right-2 -bottom-px h-0.5 bg-primary rounded-full" />}
          </button>
        ))}
      </div>
      <div className="pt-7 animate-fadeIn" key={active}>
        {tabs[active].content}
      </div>
    </div>
  );
}
