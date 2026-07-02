import { NextResponse } from "next/server";
import { getAllEntries } from "@/lib/data";
import { searchEntries } from "@/lib/search";
import { toCard } from "@/lib/card";

// Live search for the header dropdown: returns the top hits as ready-to-render
// cards plus the total count (so the UI can offer "see all N results").
const DROPDOWN_LIMIT = 8;

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  if (!q) return NextResponse.json({ q, total: 0, hits: [] });

  const results = searchEntries(await getAllEntries(), q);
  return NextResponse.json({
    q,
    total: results.length,
    hits: results.slice(0, DROPDOWN_LIMIT).map(toCard),
  });
}
