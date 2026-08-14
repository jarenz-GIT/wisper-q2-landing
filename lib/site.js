/** Canonical links and copy for the Q2 landing page (Figma `PFhyA7rgjoSE6CkxzIsn5w`). */

export const site = {
  name: "wisper studios",
  legalName: "WISPER STUDIOS",
  tagline: "BRANDING-FIRST PRODUCTION STUDIO",
  title: "Wisper Studios | The production partner for pre-seed to Seed-A startups",
  description:
    "Launching, growing, and showing startups one (or 10) videos at a time. Branding-first production for pre-seed to Seed-A startups.",
  year: 2026,
  links: {
    home: "/",
    terms: "/terms",
    calendly: "https://calendly.com/jarenz",
    linkedin: "https://www.linkedin.com/company/wisperstudios",
    instagram: "https://www.instagram.com/wisperstudios",
    x: "https://x.com/wisperstu",
  },
  hero: {
    headline: "The production partner for pre-seed to Seed-A startups.",
    subhead: "Launching, growing, and showing startups one (or 10) videos at a time.",
    cta: "Book a Call",
  },
  featured: {
    title: "Featured Launches",
    lockNote: "Other Projects Available Via DM",
    items: [
      {
        slug: "bolto-seriesa",
        title: "Bolto Series A",
        image: "/images/launches/bolto-seriesa.jpg",
        postUrl:
          "https://www.linkedin.com/posts/mrinalsingh2_today-im-thrilled-to-share-that-bolto-has-ugcPost-7452402862795689987-lfOc/",
        embedUrl:
          "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7452402862795689987?compact=1",
      },
      {
        slug: "twolabs-launch",
        title: "Twolabs Launch",
        image: "/images/launches/twolabs-launch.jpg",
        postUrl:
          "https://www.linkedin.com/posts/twolabs-yc-p26-is-building-humanoid-robots-ugcPost-7465061589071605760-c6su/",
        embedUrl:
          "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7465061589071605760?compact=1",
      },
      {
        slug: "bolto-poster",
        title: "Bolto Poster",
        image: "/images/launches/bolto-poster.jpg",
        postUrl:
          "https://www.linkedin.com/posts/mrinalsingh2_sales-shouldnt-be-boring-so-we-made-90-ugcPost-7445525481069903872-n1px/",
        embedUrl:
          "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7445525481069903872?compact=1",
      },
      {
        slug: "coming-soon",
        title: "More work coming soon",
        placeholder: true,
      },
    ],
  },
  experience: {
    statement:
      "A branding-first approach for production with experience in tech startups, nonprofits, ecommerce, and film",
    categories: [
      {
        id: "tech",
        label: "tech startups",
        color: "#6391d3",
        eyebrow: "Tech Startup Experience",
        bodyParts: [
          { text: "We understand how positioning matters when it comes to " },
          { text: "speed", em: true },
          { text: " and " },
          { text: "comprehension", em: true },
          { text: " for a variety of stakeholders from investors to customers." },
        ],
      },
      {
        id: "nonprofits",
        label: "nonprofits",
        color: "#8b9a6e",
        eyebrow: "Nonprofit Experience",
        bodyParts: [
          { text: "We know mission-driven stories have to land with " },
          { text: "clarity", em: true },
          { text: " and " },
          { text: "care", em: true },
          { text: " for donors, communities, and the people doing the work." },
        ],
      },
      {
        id: "ecommerce",
        label: "ecommerce",
        color: "#ff914d",
        eyebrow: "Ecommerce Experience",
        bodyParts: [
          { text: "We treat product films as brand systems — built for " },
          { text: "conversion", em: true },
          { text: " without losing the " },
          { text: "world", em: true },
          { text: " a shopper actually wants to buy into." },
        ],
      },
      {
        id: "film",
        label: "film",
        color: "#f6cb43",
        eyebrow: "Film Experience",
        bodyParts: [
          { text: "We bring a director’s eye to startup work: " },
          { text: "pacing", em: true },
          { text: ", " },
          { text: "taste", em: true },
          { text: ", and a frame that still feels like cinema when it has to move fast." },
        ],
      },
    ],
  },
  cards: {
    contact: {
      title: "Contact Us",
      calendly: "Visit Calendly",
      linkedin: "DM on LinkedIn",
    },
    pricing: {
      title: "Pricing Info",
      body: "Standard launch videos start at $10k minimum with pricing flex based on turnaround time, production scope, creative vision, visibility strategy.",
    },
    socials: {
      title: "Socials",
    },
  },
  menu: [
    { href: "/#featured", label: "Featured Launches" },
    { href: "/#experience", label: "Experience" },
    { href: "/#contact", label: "Contact" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/terms", label: "Terms & Conditions" },
  ],
};

export default site;
