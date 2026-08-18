import { sanityFetch } from "@/lib/sanity-client";
import { fetchFaviconResponse } from "@/lib/favicon";
import { siteSettingsQuery } from "@/lib/queries";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const settings = await sanityFetch({
    query: siteSettingsQuery,
    revalidate: 3600,
  });

  return fetchFaviconResponse(settings?.favicon, 180);
}
