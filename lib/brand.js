/**
 * Brand copy transcribed from Figma (Wisper Design System file `9ifnbgihcfs0N2uw7plpkw`).
 * Sources are cited in comments on each field. Apostrophes and spacing match the Figma text layers.
 */

/** @type {string} Brand Purpose & Platform — frame node `157:7` */
const purposePlatform157_7 = "We Build the Stage.\nYou Take the Spotlight";

/** @type {string} Brand Purpose & Platform — frame node `12:550` (same platform line; alternate goal copy) */
const purposePlatform12_550 = "We Build the Stage.\nYou Take the Spotlight";

/** @type {string} Brand Purpose body — frame node `157:7` */
const purposeBody157_7 =
  "Our purpose is to design with intention and presence, helping creators find clarity, direction, and their moment to shine. From strategy to spotlight, we guide the bold unveiling of everything you already are.";

/** @type {string} Brand Purpose body — frame node `12:550` */
const purposeBody12_550 =
  "Our goal is to help you authentically bring out the best version of yourself. \nWe join you on your journey of becoming, presenting the dream version of your brand.";

export const brand = {
  /**
   * Primary purpose string: platform line (from `157:7`) plus purpose paragraph from the same frame.
   * The `12:550` frame repeats the platform line and adds `purposeAlternate` below.
   */
  purpose: `${purposePlatform157_7}\n\n${purposeBody157_7}`,

  purposeAlternate: purposeBody12_550,

  purposeParts: {
    platformLine157_7: purposePlatform157_7,
    platformLine12_550: purposePlatform12_550,
    narrative157_7: purposeBody157_7,
    narrative12_550: purposeBody12_550,
  },

  /**
   * Personality pillars — frame node `157:23` (layer tree under “Brand Strategy”; includes “Personality” heading).
   */
  personality: [
    {
      figmaNodeId: "157:23",
      title: "Gracefully bold",
      body:
        "Like A$AP Rocky, we make statements with control. Our presence is curated, mildly chaotic, confident, and about work that lingers long after the curtain falls.",
    },
    {
      figmaNodeId: "157:23",
      title: "Intentionally playful",
      body:
        "We experiment, but always with taste. Akin to Zendaya’s style evolution, our creativity is grounded in intention. We know the rules, so we bend them with care and charm.",
    },
    {
      figmaNodeId: "157:23",
      title: "Quietly confident",
      body:
        "We don’t chase clout, we shape the culture. Our power is in our poise. We lead from the wings, design the spotlight, and let our clients take center stage.",
    },
    {
      figmaNodeId: "157:85",
      title: "Quietly confident",
      body:
        "Why fit in when you can stand out? \nWe don’t chase clout, we shape the culture. Our power is in our poise. We lead from the wings, design the spotlight, and let our clients take center stage.",
    },
    {
      figmaNodeId: "157:85",
      title: "PROFESSIONALLY PLAYFUL",
      body:
        "We revisit the first spark with that brought your business to life with intention, and blending care and charm to turn it into something familiar yet beautiful and brand new .",
    },
    {
      figmaNodeId: "157:85",
      title: "Deliberately UNCANNY",
      body:
        "We allow you to make uncanny impressions that leaves marks, invoking emotions that last longer after the curtains fall.",
    },
  ],

  /**
   * Voice-related copy — frame node `157:85` (“Language System”; Voice / Personality section).
   */
  voice: {
    heading: "Voice",
    intro: "The driving force of creation.",
    celebrityVibe:
      "The presence behind the performance. \n\nCelebrity Vibe: A$AP Rocky and Zendaya.",
  },

  /**
   * Values & offerings — frame node `157:43` (Brand Strategy).
   */
  strategy: [
    "Clarity → Brand Strategy",
    "We believe good ideas deserve to be understood. Through brand strategy, we distill your vision into something clear, resonant, and ready to be seen.",
    "Presence → Visual Identity",
    "We design with presence. Not just how you look, but how you land. (Jarenz’s look good, do good). Your brand’s identity should be felt in a glance and remembered long after.",
    "Intention → Web & Digital Design",
    "Every pixel should serve a purpose. From websites to digital systems, we craft experiences that feel cohesive, intuitive, and alive.",
    "Our values capture what we care about, and our offerings define how we create impact. Together, they shape the experience that we shape.",
  ].join("\n\n"),
};
