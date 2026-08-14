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
    x: "https://x.com/wisperstudios",
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
    highlights: [
      { icon: "💠", label: "tech startups" },
      { icon: "🌐", label: "nonprofits" },
      { icon: "🛍️", label: "ecommerce" },
      { icon: "🎬", label: "film" },
    ],
    cardEyebrow: "Tech Startup Experience",
    cardBody:
      "We understand how positioning matters when it comes to speed and comprehension for a variety of stakeholders from investors to customers.",
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
