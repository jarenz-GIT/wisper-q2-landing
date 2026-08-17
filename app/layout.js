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

const SITE_URL = site.url;
const OG_IMAGE_PATH = "/images/og-preview.jpg?v=making-videos-title";
const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: site.title,
  description: site.description,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: site.previewTitle,
    description: site.description,
    url: SITE_URL,
    siteName: "Wisper Studios",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: OG_IMAGE_URL,
        secureUrl: OG_IMAGE_URL,
        type: "image/jpeg",
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
    images: [OG_IMAGE_URL],
  },
  icons: {
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
