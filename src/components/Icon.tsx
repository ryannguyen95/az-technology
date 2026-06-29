// Single-path line-icon set, ported from the Claude Design handoff (common.jsx ICONS).
// 24x24, currentColor. Keys map to the `icon` fields used across data + components.
const ICONS: Record<string, string> = {
  code: "M8 9l-3 3 3 3M16 9l3 3-3 3M13 5l-2 14",
  cpu: "M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2M6 6h12v12H6zM9.5 9.5h5v5h-5z",
  server: "M4 5h16v5H4zM4 14h16v5H4zM7.5 7.5h.01M7.5 16.5h.01M11 7.5h4M11 16.5h4",
  wrench: "M14.5 6.5a3.5 3.5 0 00-4.6 4.6l-5.2 5.2a1.6 1.6 0 002.3 2.3l5.2-5.2a3.5 3.5 0 004.6-4.6l-2 2-2-2z",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5",
  shield: "M12 3l8 3v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6z",
  cloud: "M7 18a4 4 0 010-8 5 5 0 019.6-1.3A3.5 3.5 0 0117 18z",
  camera: "M4 8h3l1.5-2h7L17 8h3v11H4zM12 16a3 3 0 100-6 3 3 0 000 6z",
  cap: "M3 9l9-4 9 4-9 4-9-4zM7 11v4c0 1.1 2.2 2 5 2s5-.9 5-2v-4",
  video: "M4 7h11v10H4zM15 10l5-3v10l-5-3",
  badge: "M12 3l2.4 1.8 3 .2.9 2.9 2.1 2.1-1.1 2.8 1.1 2.8-2.1 2.1-.9 2.9-3 .2L12 21l-2.4-1.8-3-.2-.9-2.9L3.6 14l1.1-2.8L3.6 8.4l2.1-2.1.9-2.9 3-.2zM9 12l2 2 4-4",
  receipt: "M6 3h12v18l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4L6 21zM9 8h6M9 12h6",
  truck: "M3 6h11v9H3zM14 9h4l3 3v3h-7zM7.5 18.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 18.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  headset: "M4 13v-1a8 8 0 0116 0v1M4 13h2.5v5H5a1 1 0 01-1-1zM20 13h-2.5v5H19a1 1 0 001-1zM17.5 18a5 5 0 01-4 2.5",
  m365: "M4 6l8-2v16l-8-2zM12 4l8 2v12l-8 2M9 9.5v5l-2.5-1v-3z",
  windows: "M4 6l7-1v6H4zM12 5l8-1v8h-8zM4 12h7v6l-7-1zM12 12h8v8l-8-1z",
  design: "M12 3l9 9-6 6-9-9zM7 9l4 4M3 21l4-1 1-4-3 3z",
  backup: "M21 12a9 9 0 11-3-6.7M21 4v4h-4",
  monitor: "M3 5h18v11H3zM9 20h6M12 16v4",
  laptop: "M5 5h14v10H5zM3 18h18l-1.5-2H4.5z",
  printer: "M7 8V4h10v4M6 8h12a2 2 0 012 2v6h-4v3H8v-3H4v-6a2 2 0 012-2zM8 16h8",
  battery: "M4 8h13v8H4zM17 11h3v2h-3M8 10l-1 4M10.5 10l-1 4",
  search: "M11 4a7 7 0 105 12 7 7 0 00-5-12zM20 20l-4-4",
  phone: "M5 4h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a1.5 1.5 0 01-1.6 1.5A16 16 0 013.5 5.6 1.5 1.5 0 015 4z",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  zalo: "M5 4h14a1 1 0 011 1v10a1 1 0 01-1 1H9l-4 4v-4H5a1 1 0 01-1-1V5a1 1 0 011-1z",
  map: "M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14",
  chevronDown: "M6 9l6 6 6-6",
  chevronRight: "M9 6l6 6-6 6",
  chevronLeft: "M15 6l-6 6 6 6",
  menu: "M4 6h16M4 12h16M4 18h16",
  x: "M6 6l12 12M18 6L6 18",
  check: "M5 12l5 5 9-11",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowUp: "M12 19V5M6 11l6-6 6 6",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  building: "M5 21V4h9v17M14 9h5v12M8 8h2M8 12h2M8 16h2",
  users: "M8 11a3 3 0 100-6 3 3 0 000 6zM3 20a5 5 0 0110 0M16 11a3 3 0 10-1-5.8M15 20a5 5 0 016-4.8",
  clock: "M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 2",
  sparkles:
    "M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z",
  lock: "M6 11h12v9H6zM9 11V8a3 3 0 016 0v3",
  refresh: "M4 4v5h5M20 20v-5h-5M5 9a8 8 0 0114-3M19 15A8 8 0 015 18",
  play: "M8 5l11 7-11 7z",
  location: "M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  send: "M4 12l16-7-7 16-2.5-6.5z",
  star: "M12 3l2.6 5.6 6.1.7-4.5 4.1 1.2 6L12 16.9 6.6 19.4l1.2-6L3.3 9.3l6.1-.7z",
  quote: "M7 7h4v6c0 2-1 3.5-3 4M14 7h4v6c0 2-1 3.5-3 4",
  chart: "M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-7",
  rocket: "M12 3c3 1 5 4 5 8l-2 3H9l-2-3c0-4 2-7 5-8zM12 9a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM9 16l-2 4M15 16l2 4",
  globe: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18",
  // Legacy brand/data icons (kept so older catalog `icon` values never hit the fallback)
  microsoft: "M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z",
  zoom: "M4 7h10v10H4zM14 10l6-3v10l-6-3z",
  adobe: "M4 4h6l10 16h-6zM4 20 10 4",
  autodesk: "M4 18 12 6l8 12z",
  kaspersky: "M12 3l8 3v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6z",
  eset: "M12 3l8 3v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6z",
  veeam: "M21 12a9 9 0 11-3-6.7M21 4v4h-4",
  prtg: "M3 17l5-6 4 4 5-7 4 5",
  // Aliases for legacy call sites
  arrow: "M5 12h14M13 6l6 6-6 6",
  close: "M6 6l12 12M18 6L6 18",
  chat: "M5 5h14a1 1 0 011 1v9a1 1 0 01-1 1H9l-4 4V6a1 1 0 011-1z",
};

export function Icon({
  name,
  className = "w-5 h-5",
  filled = false,
  stroke = 1.7,
}: {
  name?: string;
  className?: string;
  filled?: boolean;
  stroke?: number;
}) {
  const d = (name && ICONS[name]) || ICONS.sparkles;
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

export { ICONS };
