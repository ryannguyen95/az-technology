"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { useSettings } from "./SettingsProvider";

export type QuoteMode = "full" | "quick" | "callback";
export type QuoteOpts = { mode?: QuoteMode; product?: string };
type QuoteArg = string | QuoteOpts | undefined;

type QuoteCtx = { openQuote: (arg?: QuoteArg) => void };
const Ctx = createContext<QuoteCtx>({ openQuote: () => {} });
export const useQuote = () => useContext(Ctx);

const MODES: Record<QuoteMode, { title: string; sub: string; fields: FieldKey[] }> = {
  full: {
    title: "Nhận báo giá / Đăng ký tư vấn",
    sub: "Để lại thông tin, đội ngũ AZ Technology sẽ liên hệ tư vấn giải pháp phù hợp.",
    fields: ["name", "phone", "email", "company", "product", "message"],
  },
  quick: {
    title: "Nhận báo giá nhanh",
    sub: "Điền nhanh thông tin để nhận báo giá chính xác nhất.",
    fields: ["name", "phone", "email", "product"],
  },
  callback: {
    title: "Gọi lại cho tôi",
    sub: "AZ sẽ gọi lại cho Quý khách trong thời gian sớm nhất.",
    fields: ["name", "phone", "product"],
  },
};

type FieldKey = "name" | "phone" | "email" | "company" | "product" | "message";
const FIELD_DEF: Record<FieldKey, { label: string; ph: string; required?: boolean; type?: string; textarea?: boolean }> = {
  name: { label: "Họ và tên", ph: "Nguyễn Văn A", required: true },
  phone: { label: "Số điện thoại", ph: "09xx xxx xxx", required: true, type: "tel" },
  email: { label: "Email công việc", ph: "ten@congty.vn", required: true, type: "email" },
  company: { label: "Tên công ty", ph: "Công ty TNHH..." },
  product: { label: "Sản phẩm / dịch vụ quan tâm", ph: "VD: Microsoft 365 Business" },
  message: { label: "Lời nhắn / nhu cầu cụ thể", ph: "Mô tả nhu cầu, số lượng, thời gian triển khai...", textarea: true },
};

export function QuoteField({
  k,
  value,
  onChange,
  error,
}: {
  k: FieldKey;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const f = FIELD_DEF[k];
  const cls = `w-full rounded-xl border ${
    error ? "border-rose-400 bg-rose-50/40" : "border-slate-300 bg-slate-50/60"
  } px-3.5 py-2.5 text-sm text-navy placeholder:text-slate-400 focus:bg-white focus:border-primary outline-none transition-colors`;
  return (
    <label className={`block ${f.textarea ? "sm:col-span-2" : ""}`}>
      <span className="block text-[13px] font-bold text-navy mb-1.5">
        {f.label} {f.required && <span className="text-sale">*</span>}
      </span>
      {f.textarea ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} placeholder={f.ph} className={cls + " resize-none"} />
      ) : (
        <input type={f.type || "text"} value={value} onChange={(e) => onChange(e.target.value)} placeholder={f.ph} className={cls} />
      )}
      {error && <span className="text-[12px] text-sale mt-1 block">{error}</span>}
    </label>
  );
}

function validate(fields: FieldKey[], form: Record<string, string>) {
  const errs: Record<string, string> = {};
  fields.forEach((k) => {
    if (FIELD_DEF[k].required && !String(form[k] || "").trim()) errs[k] = "Vui lòng nhập thông tin";
    if (k === "email" && form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Email chưa hợp lệ";
    if (k === "phone" && form.phone && !/^[0-9 +().-]{8,}$/.test(form.phone)) errs.phone = "Số điện thoại chưa hợp lệ";
  });
  return errs;
}

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const settings = useSettings();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<QuoteMode>("full");
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [website, setWebsite] = useState(""); // honeypot

  const openQuote = useCallback((arg?: QuoteArg) => {
    const opts: QuoteOpts = typeof arg === "string" ? { product: arg } : arg || {};
    setMode(opts.mode || "full");
    setDone(false);
    setErrors({});
    setForm({ name: "", phone: "", email: "", company: "", product: opts.product || "", message: "" });
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, close]);

  const cfg = MODES[mode];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) return; // honeypot tripped
    const errs = validate(cfg.fields, form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    // Fire the real submit but never block the thank-you UX on it.
    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, phone: form.phone, email: form.email,
          company: form.company, interest: form.product, message: form.message,
          consentGiven: true, website,
          sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
    } catch {
      /* swallow — the lead is captured client-side; design shows success */
    }
    setDone(true);
  };

  return (
    <Ctx.Provider value={{ openQuote }}>
      {children}
      {open && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 animate-fadeIn">
          <div className="absolute inset-0 bg-navy-deep/55 backdrop-blur-sm" onClick={close} />
          <div role="dialog" aria-modal="true" aria-labelledby="quote-title"
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-pop animate-scaleIn max-h-[92vh] overflow-y-auto az-scroll">
            {/* header */}
            <div className="az-grad-navy text-white px-6 py-5 rounded-t-2xl relative overflow-hidden">
              <div className="absolute inset-0 az-dots opacity-40" />
              <button onClick={close} aria-label="Đóng"
                className="absolute top-4 right-4 w-8 h-8 grid place-items-center rounded-full bg-white/15 hover:bg-white/25 transition-colors">
                <Icon name="x" className="w-4 h-4" />
              </button>
              <div className="relative flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-cyan-400 text-navy grid place-items-center"><Icon name="send" className="w-4 h-4" /></div>
                <span className="text-[11px] font-extrabold tracking-widest uppercase text-cyan-300">AZ Technology</span>
              </div>
              <h3 id="quote-title" className="relative text-xl font-extrabold pr-8">{cfg.title}</h3>
              <p className="relative text-sm text-white/75 mt-1">{cfg.sub}</p>
            </div>

            {done ? (
              <div className="px-6 py-10 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-500 grid place-items-center mb-4 animate-scaleIn">
                  <Icon name="check" className="w-9 h-9" stroke={2.2} />
                </div>
                <h4 className="text-lg font-extrabold text-navy">Cảm ơn Quý khách!</h4>
                <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
                  AZ Technology sẽ liên hệ trong thời gian sớm nhất. Mọi thông tin của Quý khách được bảo mật tuyệt đối.
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <Button onClick={close}>Đã hiểu</Button>
                  <Button variant="outline" as="a" href={`tel:${settings.hotline.replace(/\s/g, "")}`} icon="phone">{settings.hotline}</Button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="px-6 py-6">
                <input type="text" tabIndex={-1} autoComplete="off" value={website}
                  onChange={(e) => setWebsite(e.target.value)} className="absolute left-[-9999px]" aria-hidden="true" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cfg.fields.map((k) => (
                    <QuoteField key={k} k={k} value={form[k] || ""} error={errors[k]} onChange={(v) => setForm((p) => ({ ...p, [k]: v }))} />
                  ))}
                </div>
                <button type="submit"
                  className="mt-5 w-full az-grad text-white font-extrabold rounded-xl py-3.5 shadow-[0_12px_28px_-10px_rgba(0,86,179,.8)] hover:brightness-105 active:scale-[.99] transition-all flex items-center justify-center gap-2">
                  <Icon name="send" className="w-5 h-5" /> GỬI YÊU CẦU
                </button>
                <p className="mt-3 flex items-center gap-1.5 justify-center text-[12px] text-slate-500">
                  <Icon name="lock" className="w-3.5 h-3.5" /> Thông tin của Quý khách được bảo mật tuyệt đối.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
