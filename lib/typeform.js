/** Fallback when Site Settings is missing or URL is invalid in Sanity. */
export const WISPER_CONTACT_TYPEFORM_ID = "b8s1YVtI";

/** Default URL matching the fallback ID — seed value for Site Settings in Studio. */
export const WISPER_CONTACT_TYPEFORM_URL =
  "https://form.typeform.com/to/b8s1YVtI";

/**
 * Extract a Typeform form ID from a full URL or bare ID string.
 * @param {string | null | undefined} value
 * @returns {string | null}
 */
export function parseTypeformId(value) {
  if (!value || typeof value !== "string") return null;

  const trimmed = value.trim();
  const fromUrl = trimmed.match(
    /(?:https?:\/\/)?(?:[\w-]+\.)*typeform\.com\/to\/([a-zA-Z0-9]+)/,
  );

  if (fromUrl?.[1]) return fromUrl[1];

  if (/^[a-zA-Z0-9]+$/.test(trimmed)) return trimmed;

  return null;
}

/**
 * Resolve the contact Typeform ID from a Sanity Site Settings URL field.
 * @param {string | null | undefined} contactTypeformUrl
 * @returns {string}
 */
export function getContactTypeformId(contactTypeformUrl) {
  return parseTypeformId(contactTypeformUrl) ?? WISPER_CONTACT_TYPEFORM_ID;
}
