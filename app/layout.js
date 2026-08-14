import { DM_Mono, Hanken_Grotesk } from "next/font/google";
import Script from "next/script";

import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import SmoothScroll from "@/components/SmoothScroll";
import { TypeformProvider } from "@/components/TypeformProvider";
import { sanityFetch } from "@/lib/sanity-client";
import { getImageUrl } from "@/lib/sanity-image";
import { getContactTypeformId } from "@/lib/typeform";
import { siteSettingsQuery } from "@/lib/queries";

import "./globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-mono",
  display: "swap",
});

const DEFAULT_SITE_TITLE =
  "Wisper Studios | All-In-One Branding Studios for Creators & Brands";
const DEFAULT_SITE_DESCRIPTION =
  "Wisper Studios builds all-in-one brand systems for creators and lifestyle brands, spanning identity, websites, and content.";

export async function generateMetadata() {
  const siteSettings = await sanityFetch({ query: siteSettingsQuery });
  const title = siteSettings?.tabTitle || DEFAULT_SITE_TITLE;
  const description =
    siteSettings?.searchDescription || DEFAULT_SITE_DESCRIPTION;
  const faviconUrl = getImageUrl(siteSettings?.favicon, {
    width: 64,
    height: 64,
    quality: 90,
  });
  const previewImageUrl = getImageUrl(siteSettings?.websitePreviewImage, {
    width: 1200,
    height: 630,
    quality: 90,
  });
  const previewImageAlt =
    siteSettings?.websitePreviewImage?.alt || "Wisper Studios website preview";

  const metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: previewImageUrl ? "summary_large_image" : "summary",
      title,
      description,
    },
  };

  if (faviconUrl) {
    metadata.icons = {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    };
  }

  if (previewImageUrl) {
    const previewImage = {
      url: previewImageUrl,
      width: 1200,
      height: 630,
      alt: previewImageAlt,
    };

    metadata.openGraph.images = [previewImage];
    metadata.twitter.images = [previewImageUrl];
  }

  return metadata;
}

export default async function RootLayout({ children }) {
  const siteSettings = await sanityFetch({ query: siteSettingsQuery });
  const typeformId = getContactTypeformId(siteSettings?.contactTypeformUrl);

  return (
    <html lang="en" className={`${hanken.variable} ${dmMono.variable}`}>
      <body>
        <Script id="manual-scroll-restoration" strategy="beforeInteractive">
          {`if ("scrollRestoration" in history) history.scrollRestoration = "manual";`}
        </Script>
        <TypeformProvider typeformId={typeformId}>
          <SmoothScroll />
          <LoadingScreen />
          <Navbar />
          {children}
        </TypeformProvider>
      </body>
    </html>
  );
}
