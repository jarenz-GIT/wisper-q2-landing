import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "9uv9qcbo",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  // Next.js handles caching/revalidation; avoid a second stale layer on Sanity CDN.
  useCdn: false,
});

/**
 * Fetch from Sanity with Next.js cache rules (avoids indefinite force-cache).
 * @param {{
 *   query: string;
 *   params?: Record<string, unknown>;
 *   revalidate?: number | false;
 * }} options
 */
export async function sanityFetch({ query, params = {}, revalidate }) {
  if (process.env.NODE_ENV === "development") {
    return client.fetch(query, params, { cache: "no-store" });
  }

  const seconds = revalidate ?? 60;

  return client.fetch(query, params, {
    next: {
      revalidate: seconds === false ? false : seconds,
    },
  });
}
