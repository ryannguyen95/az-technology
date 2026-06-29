"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Ports the design's useReveal(): reveals .reveal elements as they scroll in,
// with a synchronous in-view pass + a safety net so content is never stuck hidden.
export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    const all = () => document.querySelectorAll<HTMLElement>(".reveal:not(.in)");
    const markInView = () => {
      const vh = window.innerHeight || 800;
      all().forEach((e) => {
        if (e.getBoundingClientRect().top < vh * 0.96) e.classList.add("in");
      });
    };
    markInView();
    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io!.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      all().forEach((e) => io!.observe(e));
    } else {
      all().forEach((e) => e.classList.add("in"));
    }
    const t = setTimeout(() => all().forEach((e) => e.classList.add("in")), 3500);
    return () => {
      if (io) io.disconnect();
      clearTimeout(t);
    };
  }, [pathname]);
  return null;
}
