/**
 * GROQ queries for Wisper Studio's Sanity content.
 *
 * All queries project only the fields each component actually needs;
 * pass the exported query strings + params into `sanityFetch()`.
 */

// ─── Case Studies ─────────────────────────────────────────────────────────────

/**
 * Homepage — up to 6 featured case studies in display order.
 * Used by: FeaturedCaseStudies (app/page.js)
 */
export const featuredCaseStudiesQuery = `
  *[_type == "caseStudy" && featured == true] | order(order asc) [0...6] {
    _id,
    clientName,
    projectTitle,
    slug,
    afterImage {
      asset,
      hotspot,
      crop,
      alt
    },
    beforeImage {
      asset,
      hotspot,
      crop,
      alt
    }
  }
`;

/**
 * /work page — all case studies in display order.
 * Used by: ProjectGrid (app/work/page.js)
 */
export const allCaseStudiesQuery = `
  *[_type == "caseStudy"] | order(order asc) {
    _id,
    clientName,
    projectTitle,
    slug,
    services,
    cardColor,
    afterImage {
      asset,
      hotspot,
      crop,
      alt
    },
    beforeImage {
      asset,
      hotspot,
      crop,
      alt
    }
  }
`;

/**
 * /work/[slug] — single case study detail.
 * Pass params: { slug: string }
 * Used by: CaseStudyPage (app/work/[slug]/page.js)
 */
export const caseStudyBySlugQuery = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    clientName,
    projectTitle,
    slug,
    description,
    services,
    detailReady,
    heroImage {
      asset,
      hotspot,
      crop,
      alt
    },
    heroTagline,
    quote {
      text,
      name,
      role
    },
    showQuote,
    moodboard[] {
      asset,
      hotspot,
      crop,
      alt
    },
    showMoodboard,
    afterImage {
      asset,
      hotspot,
      crop,
      alt
    },
    beforeImage {
      asset,
      hotspot,
      crop,
      alt
    }
  }
`;

/**
 * All case study slugs — used in generateStaticParams.
 */
export const caseStudySlugsQuery = `
  *[_type == "caseStudy" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// ─── Customer Types ───────────────────────────────────────────────────────────

/**
 * Who We Serve tabs — all customer types in tab order.
 * Used by: WhoWeServe (app/page.js)
 */
export const customerTypesQuery = `
  *[_type == "customerType"] {
    segment,
    timelineImage {
      asset,
      hotspot,
      crop
    },
    quoteText,
    quoteName,
    quoteRole
  }
`;

// ─── FAQ ──────────────────────────────────────────────────────────────────────

/**
 * Homepage FAQ accordion — all items in display order.
 * Used by: FAQ (app/page.js)
 */
export const faqsQuery = `
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    order
  }
`;

// ─── Pricing Packages ─────────────────────────────────────────────────────────

/**
 * Pricing page — all packages in display order.
 * Used by: PricingHero (app/pricing/page.js)
 */
export const pricingPackagesQuery = `
  *[_type == "pricingPackage"] | order(order asc) {
    _id,
    packageName,
    price,
    billingLabel,
    order,
    recommended,
    packageIcon {
      asset,
      hotspot,
      crop,
      alt
    },
    bulletPoints[] {
      _key,
      text,
      grayedOut,
      includedIcon
    }
  }
`;

// ─── Site Settings ────────────────────────────────────────────────────────────

/**
 * Global site configuration singleton (`_id` == "siteSettings").
 * Used by: RootLayout (Typeform contact popup)
 */
export const siteSettingsQuery = `
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    contactTypeformUrl,
    tabTitle,
    searchDescription,
    favicon {
      asset,
      hotspot,
      crop
    },
    websitePreviewImage {
      asset,
      hotspot,
      crop,
      alt
    }
  }
`;
