import { getImageUrl } from "@/lib/sanity-image";

/**
 * Resolve CDN URLs and normalized fields for case study detail sections.
 * @param {Record<string, unknown> | null | undefined} raw
 */
export function mapCaseStudyDetail(raw) {
  if (!raw) return null;

  const moodboard = (raw.moodboard ?? []).map((image, index) => ({
    url: getImageUrl(image, { width: 960 }),
    alt:
      image?.alt ??
      `${raw.clientName ?? "Case study"} moodboard image ${index + 1}`,
  }));

  return {
    ...raw,
    heroImageUrl:
      getImageUrl(raw.heroImage, { width: 1920 }) ??
      getImageUrl(raw.afterImage, { width: 1920 }),
    beforeImageUrl: getImageUrl(raw.beforeImage, { width: 1400 }),
    afterImageUrl: getImageUrl(raw.afterImage, { width: 1400 }),
    moodboardImages: moodboard.filter((item) => item.url),
    serviceTags: raw.services ?? [],
    quoteText: raw.quote?.text ?? "",
    quoteName: raw.quote?.name ?? "",
    quoteRole: raw.quote?.role ?? "",
  };
}
