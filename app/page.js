import { sanityFetch } from "@/lib/sanity-client";
import { getImageUrl } from "@/lib/sanity-image";
import {
  featuredCaseStudiesQuery,
  customerTypesQuery,
  faqsQuery,
} from "@/lib/queries";

import CTA from "@/components/CTA";
import Partners from "@/components/Partners";
import FAQ from "@/components/FAQ";
import FeaturedCaseStudies from "@/components/FeaturedCaseStudies";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Services from "@/components/Services";
import WhoWeServe from "@/components/WhoWeServe";

export default async function Home() {
  const [rawCaseStudies, rawCustomerTypes, rawFaqs] = await Promise.all([
    sanityFetch({ query: featuredCaseStudiesQuery }),
    sanityFetch({ query: customerTypesQuery }),
    sanityFetch({ query: faqsQuery }),
  ]);

  const caseStudies = (rawCaseStudies ?? []).map((study) => ({
    ...study,
    afterImageUrl: getImageUrl(study.afterImage, { width: 1056 }),
    beforeImageUrl: getImageUrl(study.beforeImage, { width: 1056 }),
  }));

  const customerTypes = (rawCustomerTypes ?? []).map((doc) => ({
    ...doc,
    timelineImageUrl: getImageUrl(doc.timelineImage, { width: 1920 }),
  }));

  const faqItems = (rawFaqs ?? []).map((doc) => ({
    id: doc._id,
    number: String(doc.order).padStart(2, "0"),
    question: doc.question,
    answer: doc.answer,
  }));

  return (
    <>
      <Hero />
      <Metrics />
      <Services />
      <Partners />
      <FeaturedCaseStudies caseStudies={caseStudies} />
      <WhoWeServe customerTypes={customerTypes} />
      <FAQ items={faqItems} />
      <CTA />
      <Footer />
    </>
  );
}
