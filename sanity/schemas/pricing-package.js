/**
 * Sanity schema — Pricing Packages
 * Pricing page package cards (Figma 883:2252, Wisper Refresh 2026)
 */

const imageAltField = {
  name: "alt",
  title: "Alt text",
  type: "string",
  description: "Short description for screen readers.",
};

const INCLUDED_ICON_OPTIONS = [
  { title: "Checkmark", value: "check" },
  { title: "Plus", value: "plus" },
];

const bulletPoint = {
  type: "object",
  name: "bulletPoint",
  title: "Bullet point",
  fields: [
    {
      name: "text",
      title: "Bullet text",
      type: "text",
      rows: 3,
      validation: (R) => R.required(),
    },
    {
      name: "grayedOut",
      title: "Not included",
      type: "boolean",
      description:
        "When enabled, the line is grayed out and shows a gray minus icon on the pricing card.",
      initialValue: false,
    },
    {
      name: "includedIcon",
      title: "Bullet icon",
      type: "string",
      description:
        "Icon when this item is included. Not used when “Not included” is enabled (minus is shown instead).",
      options: {
        list: INCLUDED_ICON_OPTIONS,
        layout: "radio",
      },
      initialValue: "check",
      hidden: ({ parent }) => parent?.grayedOut === true,
      validation: (R) =>
        R.custom((value, context) => {
          if (context.parent?.grayedOut) return true;
          return value ? true : "Choose a checkmark or plus icon.";
        }),
    },
  ],
  preview: {
    select: { text: "text", grayedOut: "grayedOut", includedIcon: "includedIcon" },
    prepare({ text, grayedOut, includedIcon }) {
      const iconLabel = grayedOut
        ? "Minus (not included)"
        : includedIcon === "plus"
          ? "Plus"
          : "Checkmark";

      return {
        title: text || "Bullet point",
        subtitle: iconLabel,
      };
    },
  },
};

export default {
  name: "pricingPackage",
  title: "Pricing Packages",
  type: "document",

  fields: [
    {
      name: "packageIcon",
      title: "Package Icon Image",
      type: "image",
      description: "Avatar or icon shown at the top of the package card.",
      options: { hotspot: true },
      validation: (R) => R.required(),
      fields: [imageAltField],
    },
    {
      name: "packageName",
      title: "Package Name",
      type: "string",
      description: 'Display name for the tier (e.g. "The Jackie").',
      validation: (R) => R.required(),
    },
    {
      name: "price",
      title: "Price",
      type: "string",
      description: 'Price label as shown on the card (e.g. "$4,000", "$17,500+").',
      validation: (R) => R.required(),
    },
    {
      name: "billingLabel",
      title: "Billing label",
      type: "string",
      description:
        'Short label beneath the price on the card (e.g. "One-time project").',
      initialValue: "One-time project",
    },
    {
      name: "bulletPoints",
      title: "What's included",
      type: "array",
      description:
        "Lines describing what is included in this package. Mark items as not included to gray them out and show a minus icon.",
      of: [bulletPoint],
      validation: (R) => R.required().min(1),
    },
    {
      name: "order",
      title: "Package order",
      type: "number",
      description: "Lower numbers appear first (left to right on the pricing grid).",
      validation: (R) => R.required().integer().min(1),
    },
    {
      name: "recommended",
      title: "Recommended package",
      type: "boolean",
      description:
        "When enabled, this card uses the highlighted “Recommended” treatment on the pricing page.",
      initialValue: false,
    },
  ],

  preview: {
    select: {
      title: "packageName",
      price: "price",
      order: "order",
      recommended: "recommended",
      media: "packageIcon",
    },
    prepare({ title, price, order, recommended, media }) {
      const orderLabel = typeof order === "number" ? `#${order}` : "";
      const flags = [orderLabel, recommended ? "Recommended" : null]
        .filter(Boolean)
        .join(" · ");

      return {
        title: title || "Untitled package",
        subtitle: [price, flags].filter(Boolean).join(" — ") || "Pricing package",
        media,
      };
    },
  },

  orderings: [
    {
      title: "Package order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
};
