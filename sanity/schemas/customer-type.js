/**
 * Sanity schema — Customer Type
 * Figma frame 822:3941 ("Who We Serve" section, Wisper Refresh 2026)
 */

export default {
  name: "customerType",
  title: "Customer Type",
  type: "document",

  fields: [
    {
      name: "segment",
      title: "Customer Segment",
      type: "string",
      description: "Which customer segment this content appears for.",
      options: {
        list: [
          { title: "Ecommerce", value: "ecommerce" },
          { title: "Content Creators", value: "content-creators" },
          { title: "Startups", value: "startups" },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
    },
    {
      name: "timelineImage",
      title: "Timeline Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "quoteText",
      title: "Quote",
      type: "text",
      rows: 4,
    },
    {
      name: "quoteName",
      title: "Name of Speaker",
      type: "string",
    },
    {
      name: "quoteRole",
      title: "Role of Speaker",
      type: "string",
    },
  ],

  preview: {
    select: {
      title: "quoteName",
      segment: "segment",
      subtitle: "quoteRole",
      media: "timelineImage",
    },
    prepare({ title, segment, subtitle, media }) {
      const labels = {
        ecommerce: "Ecommerce",
        "content-creators": "Content Creators",
        startups: "Startups",
      };
      return {
        title: title || "Untitled",
        subtitle: [labels[segment] || segment, subtitle].filter(Boolean).join(" · "),
        media,
      };
    },
  },
};
