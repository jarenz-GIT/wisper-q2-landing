/**
 * Sanity schema — FAQ
 * Figma frame 837:527 ("FAQs" section, Wisper Refresh 2026)
 *
 * Each document is one accordion item on the homepage FAQ section.
 * Static UI (headline, dividers, icons) lives in components/FAQ/faq.js.
 */

export default {
  name: "faq",
  title: "FAQ",
  type: "document",

  fields: [
    {
      name: "question",
      title: "Question",
      type: "string",
      validation: (R) => R.required(),
    },
    {
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 5,
      validation: (R) => R.required(),
    },
    {
      name: "order",
      title: "Question Number / Order",
      type: "number",
      description:
        "Controls display order and the numbered tag shown in the accordion (e.g. 1 → 01). Lower numbers appear first.",
      validation: (R) => R.required().integer().min(1),
    },
  ],

  preview: {
    select: {
      title: "question",
      order: "order",
    },
    prepare({ title, order }) {
      const label =
        typeof order === "number" ? String(order).padStart(2, "0") : "—";
      return {
        title: title || "Untitled question",
        subtitle: `Question ${label}`,
      };
    },
  },

  orderings: [
    {
      title: "Question Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
};
