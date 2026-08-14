/**
 * Sanity schema — Site Settings (singleton)
 *
 * Global site configuration editable in Studio.
 * Document ID should remain `siteSettings` (see sanity.config.js structure).
 */

export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",

  fieldsets: [
    {
      name: "contact",
      title: "Contact",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "seo",
      title: "Browser & Search Preview",
      options: { collapsible: true, collapsed: false },
    },
  ],

  fields: [
    {
      name: "contactTypeformUrl",
      title: "Contact Typeform URL",
      type: "url",
      fieldset: "contact",
      description:
        "Full link to the Wisper contact Typeform (e.g. https://form.typeform.com/to/b8s1YVtI). Used by Contact Us and CTA buttons site-wide.",
      validation: (R) =>
        R.required().uri({
          scheme: ["https"],
          allowRelative: false,
        }),
      initialValue: "https://form.typeform.com/to/b8s1YVtI",
    },
    {
      name: "favicon",
      title: "Favicon",
      type: "image",
      fieldset: "seo",
      description:
        "Small icon shown in browser tabs and bookmarks. Use a square image for best results.",
      options: { hotspot: true },
    },
    {
      name: "tabTitle",
      title: "Tab Title",
      type: "string",
      fieldset: "seo",
      description:
        "Default browser tab title and search result title for the site.",
      validation: (R) => R.max(70),
      initialValue:
        "Wisper Studios | All-In-One Branding Studios for Creators & Brands",
    },
    {
      name: "searchDescription",
      title: "Search Engine Description",
      type: "text",
      rows: 3,
      fieldset: "seo",
      description:
        "Meta description shown by search engines and link previews when available.",
      initialValue:
        "Wisper Studios builds all-in-one brand systems for creators and lifestyle brands, spanning identity, websites, and content.",
    },
    {
      name: "websitePreviewImage",
      title: "Website Preview Image",
      type: "image",
      fieldset: "seo",
      description:
        "Image used for social/link previews and search result previews where supported.",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Short description for screen readers and previews.",
        },
      ],
    },
  ],

  initialValue: {
    contactTypeformUrl: "https://form.typeform.com/to/b8s1YVtI",
    tabTitle:
      "Wisper Studios | All-In-One Branding Studios for Creators & Brands",
    searchDescription:
      "Wisper Studios builds all-in-one brand systems for creators and lifestyle brands, spanning identity, websites, and content.",
  },

  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
};
