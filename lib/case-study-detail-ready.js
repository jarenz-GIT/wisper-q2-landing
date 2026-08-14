/**
 * Whether a case study has a published detail page in Sanity.
 * @param {{ detailReady?: boolean } | null | undefined} caseStudy
 */
export function isCaseStudyDetailReady(caseStudy) {
  return caseStudy?.detailReady === true;
}
