"use client";

import { useState } from "react";
import { cleanHtml } from "@/lib/sanitize";

// Two tabs on every detail page, full-width:
//   1. "Mô tả sản phẩm"                       (description HTML)
//   2. "Yêu cầu hệ thống/Thông số kỹ thuật"   (specs HTML)
export function DetailTabs({ description, specs }: { description?: string; specs?: string }) {
  const tabs: { label: string; content: React.ReactNode }[] = [];

  const proseClass = "prose prose-slate max-w-none prose-headings:text-navy prose-a:text-primary";

  const descHtml = cleanHtml(description ?? "");
  if (descHtml.trim()) {
    tabs.push({
      label: "Mô tả sản phẩm",
      content: <div className={proseClass} dangerouslySetInnerHTML={{ __html: descHtml }} />,
    });
  }
  const specsHtml = cleanHtml(specs ?? "");
  if (specsHtml.trim()) {
    tabs.push({
      label: "Yêu cầu hệ thống/Thông số kỹ thuật",
      content: <div className={proseClass} dangerouslySetInnerHTML={{ __html: specsHtml }} />,
    });
  }

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
