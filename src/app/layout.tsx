import type { Metadata } from "next";
import { Suspense } from "react";
import { Manrope } from "next/font/google";
import "./globals.css";
import { getMegaNav, getSettings } from "@/lib/data";
import { RouteProgress } from "@/components/RouteProgress";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { QuoteProvider } from "@/components/QuoteModal";
import { SettingsProvider } from "@/components/SettingsProvider";
import { Reveal } from "@/components/Reveal";

const manrope = Manrope({ subsets: ["latin", "vietnamese"], variable: "--font-manrope" });

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://az-technology.vn";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "AZ Technology — Giải pháp CNTT toàn diện cho doanh nghiệp",
    template: "%s | AZ Technology",
  },
  description:
    "AZ IT Solutions & Services — phần mềm bản quyền, phần cứng chính hãng, hạ tầng Data Center, dịch vụ IT & Cloud cho doanh nghiệp tại Việt Nam.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "AZ Technology",
    title: "AZ Technology — Giải pháp CNTT toàn diện",
    description: "Phần mềm · Phần cứng · Cloud · Dịch vụ IT cho doanh nghiệp.",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [nav, site] = await Promise.all([getMegaNav(), getSettings()]);
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.company,
    url: SITE,
    telephone: site.hotline,
    email: site.email,
    address: { "@type": "PostalAddress", streetAddress: site.address, addressCountry: "VN" },
  };
  return (
    <html lang="vi" className={manrope.variable} suppressHydrationWarning>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
        <Suspense fallback={null}>
          <RouteProgress />
        </Suspense>
        <SettingsProvider value={site}>
          <QuoteProvider>
            <Reveal />
            <Header nav={nav} />
            <main>{children}</main>
            <Footer />
            <FloatingButtons />
          </QuoteProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
