const vnd = new Intl.NumberFormat("vi-VN");

// Format a VND amount. Never renders a bare 0 / null as a price.
export function formatVND(amount?: number | null): string | null {
  if (amount == null || amount <= 0) return null;
  return `${vnd.format(amount)}₫`;
}
