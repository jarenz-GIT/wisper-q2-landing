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

import { sanityFetch } from "@/lib/sanity-client";
import { siteSettingsQuery } from "@/lib/queries";
import { getImageUrl } from "@/lib/sanity-image";

export async function generateMetadata() {
  const settings = await sanityFetch({
    query: siteSettingsQuery,
    revalidate: 3600,
  });

  const title = settings?.tabTitle || site.title;
  const description = settings?.searchDescription || site.description;
  const ogImageUrl = settings?.websitePreviewImage
    ? getImageUrl(settings.websitePreviewImage, { width: 1200, height: 630 })
    : OG_IMAGE_URL;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: "Wisper Studios",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          type: "image/jpeg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    icons: {
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
  };
}

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
