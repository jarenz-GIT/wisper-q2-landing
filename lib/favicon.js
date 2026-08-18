import { getImageUrl } from "@/lib/sanity-image";

export const FALLBACK_FAVICON = "/images/brand/wisper-studio-icon.png";
export const FALLBACK_FAVICON_FILE = "public/images/brand/wisper-studio-icon.png";

/**
 * Square PNG URL for browser tabs. Avoids Sanity `auto(format)` so we never
 * serve WebP/AVIF as a favicon (Safari and some crawlers reject those).
 * ICO files skip the image pipeline and use the original asset URL.
 */
export function getFaviconUrl(source, size = 32) {
  const mime = source?.asset?.mimeType || "";
  if (mime.includes("icon") && source.asset.url) {
    return source.asset.url;
  }

  return (
    getImageUrl(source, {
      width: size,
      height: size,
      quality: 100,
      format: "png",
      autoFormat: false,
    }) ||
    source?.asset?.url ||
    null
  );
}

export function getMetadataIcons(favicon) {
  const iconUrl = getFaviconUrl(favicon, 32) || FALLBACK_FAVICON;
  const appleUrl = getFaviconUrl(favicon, 180) || FALLBACK_FAVICON;
  const iconType = /\.svg(\?|$)/i.test(iconUrl)
    ? "image/svg+xml"
    : /\.ico(\?|$)/i.test(iconUrl)
      ? "image/x-icon"
      : "image/png";

  return {
    icon: [{ url: iconUrl, type: iconType, sizes: "32x32" }],
    shortcut: iconUrl,
    apple: [{ url: appleUrl, sizes: "180x180", type: "image/png" }],
  };
}

export async function fetchFaviconResponse(source, size) {
  const url = getFaviconUrl(source, size);

  if (url) {
    try {
      const response = await fetch(url, { next: { revalidate: 3600 } });
      if (response.ok) {
        const contentType = response.headers.get("content-type") || "image/png";
        return new Response(await response.arrayBuffer(), {
          headers: { "Content-Type": contentType },
        });
      }
    } catch {
      // Use the bundled mark if Sanity is unreachable.
    }
  }

  const { readFile } = await import("node:fs/promises");
  const { join } = await import("node:path");
  const body = await readFile(join(process.cwd(), FALLBACK_FAVICON_FILE));
  return new Response(body, {
    headers: { "Content-Type": "image/png" },
  });
}
