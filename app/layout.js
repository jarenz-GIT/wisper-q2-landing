import { DM_Mono, Hanken_Grotesk } from "next/font/google";

import SiteFooter from "@/components/landing/SiteFooter";
import SiteHeader from "@/components/landing/SiteHeader";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/lib/site";

import "./globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://wisper-q3-landing.vercel.app"),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.previewTitle,
    description: site.description,
    type: "website",
    images: [
      {
        url: "/images/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: site.previewTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.previewTitle,
    description: site.description,
    images: ["/images/og-preview.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${hanken.variable} ${dmMono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SmoothScroll />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
