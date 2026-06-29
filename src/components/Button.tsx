"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

type Variant = "primary" | "cyan" | "inverted" | "outline" | "ghost" | "white" | "soft";
type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, string> = {
  sm: "text-[13px] px-3.5 py-2",
  md: "text-sm px-5 py-3",
  lg: "text-base px-7 py-3.5",
};

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-[0_8px_22px_-8px_rgba(0,86,179,.7)] hover:bg-primary-700 hover:shadow-[0_12px_28px_-8px_rgba(0,86,179,.8)]",
  cyan: "bg-cyan-400 text-navy hover:bg-cyan-300 shadow-[0_8px_22px_-8px_rgba(0,209,255,.8)]",
  inverted: "bg-navy text-white hover:bg-navy-light",
  outline: "border-2 border-primary text-primary bg-white hover:bg-primary-50",
  ghost: "text-primary hover:bg-primary-50",
  white: "bg-white text-primary hover:bg-primary-50 shadow-card",
  soft: "bg-primary-50 text-primary hover:bg-primary-100",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  children,
  className = "",
  as = "button",
  href,
  onClick,
  type,
  ariaLabel,
}: {
  variant?: Variant;
  size?: Size;
  icon?: string;
  iconRight?: string;
  children?: ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-200 select-none active:scale-[.97] whitespace-nowrap";
  const cls = `${base} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
  const content = (
    <>
      {icon && <Icon name={icon} className="w-[18px] h-[18px]" />}
      {children}
      {iconRight && <Icon name={iconRight} className="w-[18px] h-[18px]" />}
    </>
  );
  if (as === "a" && href) {
    const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (external)
      return (
        <a href={href} onClick={onClick} className={cls} aria-label={ariaLabel}>
          {content}
        </a>
      );
    return (
      <Link href={href} onClick={onClick} className={cls} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type || "button"} onClick={onClick} className={cls} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
