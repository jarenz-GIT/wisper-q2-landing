import { sanityFetch } from "@/lib/sanity-client";
import { fetchFaviconResponse } from "@/lib/favicon";
import { siteSettingsQuery } from "@/lib/queries";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const settings = await sanityFetch({
    query: siteSettingsQuery,
    revalidate: 3600,
  });

  return fetchFaviconResponse(settings?.favicon, 32);
}
