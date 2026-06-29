import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { settings } from "@/lib/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { QuoteProvider } from "@/components/QuoteModal";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.company,
    url: SITE,
    telephone: settings.hotline,
    email: settings.email,
    address: { "@type": "PostalAddress", streetAddress: settings.address, addressCountry: "VN" },
  };
  return (
    <html lang="vi" className={manrope.variable}>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
        <QuoteProvider>
          <Reveal />
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingButtons />
        </QuoteProvider>
      </body>
    </html>
  );
}
