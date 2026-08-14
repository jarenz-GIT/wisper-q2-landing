import { sanityFetch } from "@/lib/sanity-client";
import { getImageUrl } from "@/lib/sanity-image";
import { allCaseStudiesQuery } from "@/lib/queries";

import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WorkHero from "@/components/WorkHero";
import WorkGrid from "@/components/WorkGrid";

export const metadata = {
  title: "Work | Wisper Studios",
  description: "Selected work — Wisper Studios.",
};

export default async function WorkPage() {
  const rawCaseStudies =
    (await sanityFetch({ query: allCaseStudiesQuery })) ?? [];

  const caseStudies = rawCaseStudies.map((study) => ({
    ...study,
    afterImageUrl:  getImageUrl(study.afterImage,  { width: 1056 }),
    beforeImageUrl: getImageUrl(study.beforeImage, { width: 1056 }),
  }));

  return (
    <>
      <WorkHero />
      <WorkGrid caseStudies={caseStudies} />
      <CTA />
      <Footer />
    </>
  );
}
