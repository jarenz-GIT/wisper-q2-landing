import { createImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "9uv9qcbo",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
});

export function urlFor(source) {
  return builder.image(source);
}

/** Build a CDN URL from a Sanity image field, or return null if missing. */
export function getImageUrl(source, { width, height, quality = 85 } = {}) {
  if (!source?.asset) {
    return null;
  }

  let img = urlFor(source).auto("format").quality(quality);
  if (width) img = img.width(width);
  if (height) img = img.height(height);
  return img.url();
}
