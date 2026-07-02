"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { useSettings } from "./SettingsProvider";

function BrandIcon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  if (name === "zalo")
    return (
      <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
        <path fill="#fff" d="M37 9H11a6 6 0 0 0-6 6v13a6 6 0 0 0 6 6h2.2v4.4c0 .9 1 1.4 1.8.9L21 34h16a6 6 0 0 0 6-6V15a6 6 0 0 0-6-6z" />
        <text x="24" y="26" textAnchor="middle" fontFamily="Manrope, Arial, sans-serif" fontWeight="800" fontSize="11.5" fill="#0068ff" letterSpacing="-0.3">
          Zalo
        </text>
      </svg>
    );
  if (name === "facebook")
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.5 2 2 6.3 2 11.7c0 3 1.4 5.7 3.7 7.5.2.2.3.4.3.7l.1 2c0 .6.7 1 1.2.8l2.2-1c.2-.1.4-.1.6-.1 1 .3 2 .4 3 .4 5.5 0 10-4.3 10-9.7C22 6.3 17.5 2 12 2zm6 7.5-2.9 4.7c-.5.7-1.5.9-2.2.4l-2.3-1.7a.6.6 0 0 0-.7 0l-3.1 2.4c-.4.3-1-.2-.7-.6l2.9-4.7c.5-.7 1.5-.9 2.2-.4l2.3 1.7c.2.2.5.2.7 0l3.1-2.4c.4-.3 1 .2.7.6z" />
      </svg>
    );
  if (name === "whatsapp")
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 0 1 6.9 12.6c-.1.2-.1.3 0 .5l.7 2.5-2.6-.7a.5.5 0 0 0-.4.1A8.2 8.2 0 1 1 12 3.8zm-3 4c-.2 0-.5 0-.7.4-.3.4-1 1-1 2.3s1 2.7 1.1 2.8c.1.2 2 3.2 5 4.3 2.4.9 2.9.7 3.5.7.6-.1 1.8-.8 2-1.5.3-.7.3-1.4.2-1.5l-.9-.5c-.4-.2-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7 1c-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.1-.3 0-.4.1-.5l.5-.5c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5l-.8-2c-.2-.5-.4-.5-.6-.5h-.5z" />
      </svg>
    );
  return null;
}

export function FloatingButtons() {
  const settings = useSettings();
  const tel = settings.hotline.replace(/\s/g, "");
  const [top, setTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed right-4 bottom-4 z-[90] flex flex-col items-center gap-2.5">
      <a href={settings.zaloUrl} target="_blank" rel="noopener" title="Chat Zalo" className="w-12 h-12 rounded-full bg-[#0068ff] text-white grid place-items-center shadow-lg hover:scale-110 transition-transform animate-floaty">
        <BrandIcon name="zalo" />
      </a>
      <a href="https://m.me/aztechnology" target="_blank" rel="noopener" title="Facebook Messenger" className="w-12 h-12 rounded-full bg-[#1877F2] text-white grid place-items-center shadow-lg hover:scale-110 transition-transform">
        <BrandIcon name="facebook" />
      </a>
      <a href={`https://wa.me/84${tel.replace(/^0/, "")}`} target="_blank" rel="noopener" title="WhatsApp" className="w-12 h-12 rounded-full bg-[#25D366] text-white grid place-items-center shadow-lg hover:scale-110 transition-transform">
        <BrandIcon name="whatsapp" />
      </a>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Lên đầu trang"
        aria-label="Lên đầu trang"
        className={`w-12 h-12 rounded-full bg-navy text-white grid place-items-center shadow-lg hover:scale-110 transition-all ${top ? "opacity-100" : "opacity-0 pointer-events-none translate-y-2"}`}
      >
        <Icon name="arrowUp" className="w-6 h-6" />
      </button>
    </div>
  );
}
