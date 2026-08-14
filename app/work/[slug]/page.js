import { notFound } from "next/navigation";

import BuildingInProgress from "@/components/BuildingInProgress";
import { sanityFetch } from "@/lib/sanity-client";
import { isCaseStudyDetailReady } from "@/lib/case-study-detail-ready";
import { mapCaseStudyDetail } from "@/lib/map-case-study-detail";
import { caseStudyBySlugQuery, caseStudySlugsQuery } from "@/lib/queries";

import BeforeAfter from "@/components/BeforeAfter";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import HeroOverview from "@/components/HeroOverview";
import Moodboard from "@/components/Moodboard";
import Quote from "@/components/Quote";

/** Revalidate case study pages when Sanity content (e.g. detailReady) changes. */
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await sanityFetch({ query: caseStudySlugsQuery });
  return (slugs ?? []).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const caseStudy = await sanityFetch({
    query: caseStudyBySlugQuery,
    params: { slug },
  });

  if (!caseStudy) {
    return { title: "Work | Wisper Studios" };
  }

  if (!isCaseStudyDetailReady(caseStudy)) {
    return {
      title: `Building In Progress — ${caseStudy.clientName} | Wisper Studios`,
      description: `${caseStudy.clientName} case study — coming soon.`,
    };
  }

  return {
    title: `${caseStudy.clientName} — ${caseStudy.projectTitle} | Wisper Studios`,
    description:
      caseStudy.description ??
      `${caseStudy.clientName} case study — Wisper Studios.`,
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = params;
  const rawCaseStudy = await sanityFetch({
    query: caseStudyBySlugQuery,
    params: { slug },
  });

  if (!rawCaseStudy) notFound();

  if (!isCaseStudyDetailReady(rawCaseStudy)) {
    return <BuildingInProgress />;
  }

  const caseStudy = mapCaseStudyDetail(rawCaseStudy);

  return (
    <>
      <HeroOverview caseStudy={caseStudy} />
      <BeforeAfter caseStudy={caseStudy} />
      <Quote caseStudy={caseStudy} />
      <Moodboard caseStudy={caseStudy} />
      <CTA />
      <Footer />
    </>
  );
}
