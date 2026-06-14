import type { SVGProps } from "react";

// Minimal line-icon set (24x24, currentColor). Keys map to seed `icon` fields.
const PATHS: Record<string, string> = {
  windows: "M3 5.5 10.5 4.4v7.1H3zM10.5 12.5v7.1L3 18.5v-6zM11.8 4.2 21 3v8.5h-9.2zM21 12.5V21l-9.2-1.3v-7.2z",
  laptop: "M4 5h16v10H4zM2 17h20l-1 2H3zM4 5v10h16V5z",
  server: "M3 4h18v6H3zM3 14h18v6H3zM7 7h.01M7 17h.01",
  wrench: "M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6 2.6 2.6 6-6a4 4 0 0 0 5.4-5.4l-2.3 2.3-2-2z",
  shield: "M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z",
  cloud: "M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.2A3.5 3.5 0 0 1 17 18z",
  cap: "M12 4 2 9l10 5 10-5zM6 12v4c0 1.5 3 3 6 3s6-1.5 6-3v-4",
  video: "M4 6h11v12H4zM15 10l5-3v10l-5-3z",
  monitor: "M3 4h18v12H3zM8 20h8M12 16v4",
  printer: "M6 9V3h12v6M6 17H4v-6h16v6h-2M8 14h8v6H8z",
  backup: "M12 4a8 8 0 1 0 8 8M12 4v8l5 3M12 4l3 3M12 4 9 7",
  battery: "M4 8h14v8H4zM18 11h2v2h-2M7 10v4M10 10v4",
  design: "M3 21l3-1 11-11-2-2L4 18zM15 6l3 3M14 4l6 6",
  microsoft: "M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z",
  zoom: "M4 7h10v10H4zM14 10l6-3v10l-6-3z",
  adobe: "M4 4h6l10 16h-6zM4 20 10 4",
  autodesk: "M4 18 12 6l8 12z",
  kaspersky: "M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z",
  eset: "M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z",
  veeam: "M12 4a8 8 0 1 0 8 8M12 4v8l5 3",
  prtg: "M3 17l5-6 4 4 5-7 4 5",
  phone: "M5 4h4l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  mail: "M3 5h18v14H3zM3 6l9 7 9-7",
  map: "M9 3 3 5v16l6-2 6 2 6-2V3l-6 2zM9 3v16M15 5v16",
  chat: "M4 4h16v12H8l-4 4z",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4-4",
  arrow: "M4 12h16M14 6l6 6-6 6",
  check: "M5 12l4 4 10-10",
  star: "M12 3l2.9 6 6.6 1-4.8 4.6 1.1 6.6L12 18l-5.8 3 1.1-6.6L2.5 10l6.6-1z",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M6 6l12 12M18 6 6 18",
  zalo: "M5 4h14v11H9l-4 4zM8 9h8M8 12h5",
  cpu: "M7 7h10v10H7zM4 9v6M20 9v6M9 4h6M9 20h6",
};

export function Icon({ name, ...props }: { name?: string } & SVGProps<SVGSVGElement>) {
  const d = (name && PATHS[name]) || PATHS.check;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d={d} />
    </svg>
  );
}
