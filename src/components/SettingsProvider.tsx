"use client";

import { createContext, useContext } from "react";
import type { SiteSettings } from "@/lib/types";

const SettingsContext = createContext<SiteSettings | null>(null);

// Provides CMS-driven site settings to client components. Seeded server-side in
// the root layout from getSettings().
export function SettingsProvider({ value, children }: { value: SiteSettings; children: React.ReactNode }) {
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SiteSettings {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within <SettingsProvider>");
  return ctx;
}
