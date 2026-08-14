/**
 * Sanity schema — Case Study
 * Grid card: Figma 818:3835 | Detail page: Figma 790:2863 (Wisper Refresh 2026)
 */

const SERVICE_TAGS = [
  { title: "Brand Identity", value: "Brand Identity" },
  { title: "Packaging", value: "Packaging" },
  { title: "Website", value: "Website" },
  { title: "Photography", value: "Photography" },
  { title: "Videography", value: "Videography" },
  { title: "Social Media", value: "Social Media" },
  { title: "Paid Ads", value: "Paid Ads" },
  { title: "Launch Campaign", value: "Launch Campaign" },
];

const imageAltField = {
  name: "alt",
  title: "Alt text",
  type: "string",
  description: "Short description for screen readers.",
};

export default {
  name: "caseStudy",
  title: "Case Study",
  type: "document",

  fieldsets: [
    {
      name: "listing",
      title: "Work Grid & Homepage Card",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "detail",
      title: "Detail Page",
      options: { collapsible: true, collapsed: false },
    },
  ],

  fields: [
    {
      name: "clientName",
      title: "Project Name",
      type: "string",
      fieldset: "listing",
      description: "Primary project name (e.g. 'ShipNomad').",
      validation: (R) => R.required(),
    },
    {
      name: "projectTitle",
      title: "Project Subtitle",
      type: "string",
      fieldset: "listing",
      description: "Short descriptor on work cards (e.g. '3PL Rebrand').",
      validation: (R) => R.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      fieldset: "listing",
      description: "URL path for /work/[slug]. Auto-generated from project name.",
      options: { source: "clientName", maxLength: 96 },
      validation: (R) => R.required(),
    },
    {
      name: "afterImage",
      title: "After Image",
      type: "image",
      fieldset: "listing",
      description: "After state — default on cards and detail before/after section.",
      options: { hotspot: true },
      validation: (R) => R.required(),
      fields: [imageAltField],
    },
    {
      name: "beforeImage",
      title: "Before Image",
      type: "image",
      fieldset: "listing",
      description: "Before state — cards toggle + detail before/after section.",
      options: { hotspot: true },
      fields: [imageAltField],
    },
    {
      name: "services",
      title: "Service Tags",
      type: "array",
      fieldset: "listing",
      of: [{ type: "string" }],
      description: "Tag pills on the detail hero and services line on work cards.",
      options: { list: SERVICE_TAGS },
    },
    {
      name: "cardColor",
      title: "Card Background Color",
      type: "string",
      fieldset: "listing",
      description: "Brand color behind the case study image on the Work grid.",
      options: {
        list: [
          { title: "Navy", value: "navy" },
          { title: "Pelli Pink", value: "pelli-pink" },
          { title: "Gooper Green", value: "gooper-green" },
          { title: "Yumazo Yellow", value: "yumazo-yellow" },
          { title: "Onglo Orange", value: "onglo-orange" },
          { title: "Cotton Blue", value: "cotton-blue" },
        ],
        layout: "radio",
      },
      initialValue: "navy",
    },
    {
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      fieldset: "listing",
      description: "Show this case study in the homepage grid.",
      initialValue: false,
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      fieldset: "listing",
      description: "Lower numbers appear first. Homepage grid shows up to 6.",
    },

    {
      name: "detailReady",
      title: "Publish Detail Page",
      type: "boolean",
      fieldset: "detail",
      description:
        "When enabled, /work/[slug] shows the full case study page instead of Building In Progress.",
      initialValue: false,
    },
    {
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 4,
      fieldset: "detail",
      description: "Intro copy below the project name on the detail page.",
    },
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      fieldset: "detail",
      description: "Full-width hero visual on the detail page.",
      options: { hotspot: true },
      fields: [imageAltField],
    },
    {
      name: "heroTagline",
      title: "Hero Tagline",
      type: "string",
      fieldset: "detail",
      description: "Line overlaid on the hero image (below the tag pills).",
    },
    {
      name: "quote",
      title: "Quote",
      type: "object",
      fieldset: "detail",
      fields: [
        {
          name: "text",
          title: "Quote Text",
          type: "text",
          rows: 5,
        },
        {
          name: "name",
          title: "Name",
          type: "string",
        },
        {
          name: "role",
          title: "Role / Title",
          type: "string",
        },
      ],
    },
    {
      name: "showQuote",
      title: "Show Quote Section",
      type: "boolean",
      fieldset: "detail",
      description: "Toggle visibility of the quote block on the detail page.",
      initialValue: true,
    },
    {
      name: "moodboard",
      title: "Moodboard",
      type: "array",
      fieldset: "detail",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [imageAltField],
        },
      ],
      description: "Visual direction images for the moodboard gallery.",
    },
    {
      name: "showMoodboard",
      title: "Show Moodboard Section",
      type: "boolean",
      fieldset: "detail",
      description: "Toggle visibility of the moodboard gallery on the detail page.",
      initialValue: true,
    },
  ],

  preview: {
    select: {
      title: "clientName",
      subtitle: "projectTitle",
      media: "heroImage",
      detailReady: "detailReady",
    },
    prepare({ title, subtitle, media, detailReady }) {
      return {
        title: title || "Untitled project",
        subtitle: `${subtitle || "Case study"}${detailReady ? " · Detail live" : ""}`,
        media: media,
      };
    },
  },

  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
};
