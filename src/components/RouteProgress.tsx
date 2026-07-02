"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ROUTE_START_EVENT } from "@/lib/progress";

// A YouTube-style top progress bar. It starts on any internal navigation —
// <Link>/anchor clicks (captured globally) and imperative router.push() calls
// (via the az:routestart event) — and completes when the URL actually changes.
export function RouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const activeRef = useRef(false);
  const trickle = useRef<ReturnType<typeof setInterval> | null>(null);
  const hide = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safety = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clearTimers = () => {
      if (trickle.current) clearInterval(trickle.current);
      if (safety.current) clearTimeout(safety.current);
      trickle.current = null;
      safety.current = null;
    };

    const start = () => {
      if (activeRef.current) return;
      activeRef.current = true;
      if (hide.current) clearTimeout(hide.current);
      setVisible(true);
      setProgress(8);
      trickle.current = setInterval(() => {
        // ease toward 90% and stall there until navigation completes
        setProgress((p) => (p < 90 ? p + Math.max(0.4, (90 - p) * 0.06) : p));
      }, 180);
      safety.current = setTimeout(() => finish(), 12000); // never get stuck
    };

    const finish = () => {
      if (!activeRef.current) return;
      activeRef.current = false;
      clearTimers();
      setProgress(100);
      hide.current = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 320);
    };

    // Programmatic navigations (ProductCard / SearchBox use router.push).
    const onStartEvent = () => start();
    window.addEventListener(ROUTE_START_EVENT, onStartEvent);

    // <Link>/anchor clicks — capture phase so we run before Next intercepts.
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      const target = a.getAttribute("target");
      if (!href || target === "_blank" || /^(#|mailto:|tel:|javascript:)/.test(href)) return;
      let url: URL;
      try {
        url = new URL(a.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      start();
    };
    document.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener(ROUTE_START_EVENT, onStartEvent);
      document.removeEventListener("click", onClick, true);
      clearTimers();
      if (hide.current) clearTimeout(hide.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // URL changed → the navigation Next was doing has landed → complete the bar.
  useEffect(() => {
    if (!activeRef.current) return;
    activeRef.current = false;
    if (trickle.current) clearInterval(trickle.current);
    if (safety.current) clearTimeout(safety.current);
    trickle.current = null;
    safety.current = null;
    setProgress(100);
    if (hide.current) clearTimeout(hide.current);
    hide.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 320);
  }, [pathname, searchParams.toString()]);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[200] h-[3px] pointer-events-none"
      style={{ opacity: visible ? 1 : 0, transition: "opacity .3s ease" }}
    >
      <div
        className="az-progress h-full rounded-r-full"
        style={{
          width: `${progress}%`,
          transition: "width .18s ease",
        }}
      />
    </div>
  );
}
