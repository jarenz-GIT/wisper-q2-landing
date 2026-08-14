import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import OurProcess from "@/components/OurProcess";
import PricingHero from "@/components/PricingHero";
import {
  getPricingMetaLabel,
  mapPricingPackages,
} from "@/lib/map-pricing-packages";
import { pricingPackagesQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity-client";

export const metadata = {
  title: "Pricing | Wisper Studios",
  description:
    "Pick your lane. Two tracks, four tiers, one studio — Wisper builds the complete brand system for lifestyle and cultural brands ready to grow.",
};

export const revalidate = 60;

export default async function PricingPage() {
  const rawPackages = await sanityFetch({ query: pricingPackagesQuery });
  const packages = mapPricingPackages(rawPackages);

  return (
    <>
      <PricingHero
        packages={packages}
        metaLabel={getPricingMetaLabel(packages)}
      />
      <OurProcess />
      <CTA />
      <Footer />
    </>
  );
}
