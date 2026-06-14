"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

type QuoteCtx = { openQuote: (interest?: string) => void };
const Ctx = createContext<QuoteCtx>({ openQuote: () => {} });
export const useQuote = () => useContext(Ctx);

type Status = "idle" | "sending" | "ok" | "error";

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [interest, setInterest] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const openQuote = useCallback((i?: string) => {
    setInterest(i ?? "");
    setStatus("idle");
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Esc to close + focus trap + lock scroll (a11y, design review Pass 6).
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>(
          'a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, close]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return; // honeypot tripped
    if (!fd.get("consent")) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"), phone: fd.get("phone"), email: fd.get("email"),
          company: fd.get("company"), interest: fd.get("interest"), message: fd.get("message"),
          consentGiven: !!fd.get("consent"), website: fd.get("website"),
          sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
          startedAt: Number(fd.get("startedAt")),
        }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Ctx.Provider value={{ openQuote }}>
      {children}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy-deep/60 backdrop-blur-sm animate-fadeIn" onClick={close} />
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="quote-title"
            className="relative w-full max-w-lg rounded-xl2 bg-white shadow-pop animate-scaleIn max-h-[92vh] overflow-y-auto">
            <button onClick={close} aria-label="Đóng"
              className="absolute right-4 top-4 text-ink/40 hover:text-ink">
              <Icon name="close" className="h-5 w-5" />
            </button>
            {status === "ok" ? (
              <div className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary">
                  <Icon name="check" className="h-7 w-7" />
                </div>
                <h2 className="text-xl font-extrabold text-navy">Cảm ơn Quý khách!</h2>
                <p className="mt-2 text-ink/70">
                  AZ Technology sẽ liên hệ trong thời gian sớm nhất (thường trong vòng 24 giờ).
                  Thông tin của Quý khách được bảo mật tuyệt đối.
                </p>
                <button onClick={close} className="mt-6 rounded-lg bg-primary px-6 py-2.5 font-semibold text-white hover:bg-primary-700">
                  Đóng
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="p-6 sm:p-8">
                <h2 id="quote-title" className="text-xl font-extrabold text-navy">Nhận báo giá / Đăng ký tư vấn</h2>
                <p className="mt-1 text-sm text-ink/60">Để lại thông tin, chúng tôi phản hồi trong vòng 24 giờ.</p>
                <input type="hidden" name="startedAt" value={Date.now()} />
                {/* honeypot */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off"
                  className="absolute left-[-9999px]" aria-hidden="true" />
                <div className="mt-5 grid gap-3">
                  <Field ref={firstFieldRef} name="name" label="Họ và tên *" required />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field name="phone" label="Số điện thoại *" required type="tel" />
                    <Field name="email" label="Email công việc *" required type="email" />
                  </div>
                  <Field name="company" label="Tên công ty" />
                  <Field name="interest" label="Sản phẩm / dịch vụ quan tâm" defaultValue={interest} />
                  <label className="text-sm">
                    <span className="mb-1 block font-medium text-ink/80">Lời nhắn / nhu cầu cụ thể</span>
                    <textarea name="message" rows={3}
                      className="w-full rounded-lg border border-ink/15 px-3 py-2 outline-none focus:border-primary" />
                  </label>
                  <label className="flex items-start gap-2 text-sm text-ink/70">
                    <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[#0056B3]" />
                    <span>
                      Tôi đồng ý cho AZ Technology lưu trữ và liên hệ theo thông tin trên.
                      Xem <a href="/chinh-sach-bao-mat" className="text-primary underline">Chính sách bảo mật</a>.
                    </span>
                  </label>
                </div>
                {status === "error" && (
                  <p className="mt-3 text-sm text-sale">Gửi chưa thành công. Vui lòng thử lại hoặc gọi {""}
                    <a href="tel:0703594402" className="font-semibold underline">0703 594 402</a>.</p>
                )}
                <button type="submit" disabled={status === "sending"}
                  className="mt-5 w-full rounded-lg az-grad px-6 py-3 font-bold text-white shadow-cardHover transition hover:opacity-95 disabled:opacity-60">
                  {status === "sending" ? "Đang gửi…" : "GỬI YÊU CẦU"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

import { forwardRef } from "react";
const Field = forwardRef<HTMLInputElement, {
  name: string; label: string; required?: boolean; type?: string; defaultValue?: string;
}>(function Field({ name, label, required, type = "text", defaultValue }, ref) {
  return (
    <label className="text-sm">
      <span className="mb-1 block font-medium text-ink/80">{label}</span>
      <input ref={ref} name={name} required={required} type={type} defaultValue={defaultValue}
        className="w-full rounded-lg border border-ink/15 px-3 py-2 outline-none focus:border-primary" />
    </label>
  );
});
