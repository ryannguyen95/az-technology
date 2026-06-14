"use client";

import { useQuote } from "./QuoteModal";

export function QuoteButton({
  interest,
  children,
  className,
}: {
  interest?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { openQuote } = useQuote();
  return (
    <button type="button" onClick={() => openQuote(interest)} className={className}>
      {children}
    </button>
  );
}
