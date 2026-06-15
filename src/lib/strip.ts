// Dependency-free HTML → plain text, safe in client bundles (card previews,
// meta descriptions). For full sanitized HTML rendering use lib/sanitize.
export function stripHtml(s?: string | null): string {
  if (!s) return "";
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}
