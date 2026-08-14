import { getImageUrl } from "@/lib/sanity-image";

const DEFAULT_BILLING = "One-time project";

/**
 * @param {Array<Record<string, unknown>> | null | undefined} raw
 */
export function mapPricingPackages(raw) {
  return (raw ?? []).map((pkg) => {
    const name = pkg.packageName ?? "Package";

    return {
      id: pkg._id,
      name,
      price: pkg.price ?? "",
      billing: pkg.billingLabel?.trim() || DEFAULT_BILLING,
      recommended: Boolean(pkg.recommended),
      iconUrl: getImageUrl(pkg.packageIcon, { width: 100, height: 100 }),
      iconAlt: pkg.packageIcon?.alt ?? `${name} package icon`,
      features: (pkg.bulletPoints ?? []).map((bullet) => ({
        key: bullet._key,
        included: !bullet.grayedOut,
        icon: bullet.grayedOut
          ? "minus"
          : bullet.includedIcon === "plus"
            ? "plus"
            : "check",
        text: bullet.text ?? "",
      })),
    };
  });
}

/**
 * @param {ReturnType<mapPricingPackages>} packages
 */
export function getPricingMetaLabel(packages) {
  if (!packages.length) {
    return null;
  }

  const tierLabel = packages.length === 1 ? "Tier" : "Tiers";
  const startingPrice = packages[0]?.price ?? "";

  return `${packages.length} ${tierLabel} · Starts at ${startingPrice} USD`;
}
