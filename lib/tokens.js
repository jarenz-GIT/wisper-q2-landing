/**
 * Design tokens mirrored from `app/globals.css`.
 * Values were read from Figma file `9ifnbgihcfs0N2uw7plpkw` via the REST API
 * (swatch fills, text styles on nodes `12:441`, `12:22`, `284:2`, `288:137`).
 * Spacing and radius match the implementation spec (8px grid; 12px / 24px radii).
 */

export const spacing = {
  1: 8,
  2: 16,
  3: 24,
  4: 32,
  5: 40,
  6: 48,
  7: 56,
  8: 64,
  9: 72,
  10: 80,
  11: 88,
  12: 96,
};

export const radius = {
  sm: 12,
  lg: 24,
};

/**
 * Swatch fills from Color System frame `12:441` (Swatch frame `fills[0]`).
 * `copyPrimary`, `pureBlack`, `e5744b` appear as TEXT/FRAME fills in the cited frames.
 */
export const colors = {
  white: "#fcfcfc",
  ivory: "#faf9f5",
  pelliPink: "#f5b5ae",
  ongloOrange: "#ff914d",
  pumpkinNinja: "#c96e49",
  yumazoYellow: "#f6cb43",
  gooperGreen: "#8b9a6e",
  brigletBlue: "#6391d3",
  cottonBlue: "#a9c2dd",
  navy: "#1f293a",
  tagBlueBeam: "#3276ff",
  tagGreenBeam: "#d9ffb3",
  tagPurpBeam: "#8a38f5",
  neutral100: "#ededed",
  neutral300: "#dadada",
  neutral400: "#bababa",
  neutral500: "#aeaeae",
  navySoft: "#414f69",
  copyPrimary: "#1c1c1c",
  pureBlack: "#000000",
  e5744b: "#e5744b",
};

export const typography = {
  fontFamily: {
    sans: "Hanken Grotesk",
    mono: "DM Mono",
    specimenSerif: "Times New Roman",
    rationale: "Roboto",
  },
  fontWeight: {
    monoRegular: 400,
    monoLight: 300,
    sansRegular: 400,
    sansBold: 700,
    sansBlack: 900,
  },
  /** Typographic System overview — frame `12:22` (unique TEXT styles). */
  typographicSystem: {
    dmMonoTitle: {
      fontFamily: "DM Mono",
      fontWeight: 400,
      fontSize: 15.397148132324219,
      lineHeightPx: 16.93686294555664,
      letterSpacing: 0.7698574066162109,
    },
    dmMonoGlyphSample: {
      fontFamily: "DM Mono",
      fontWeight: 400,
      fontSize: 24,
      lineHeightPx: 28.80000114440918,
      letterSpacing: 0,
    },
    timesNewRomanGlyphSample: {
      fontFamily: "Times New Roman",
      fontWeight: 400,
      fontSize: 26.395111083984375,
      lineHeightPx: 31.674135208129883,
      letterSpacing: -0.5279022216796875,
    },
    hankenGroteskGlyphSample26: {
      fontFamily: "Hanken Grotesk",
      fontWeight: 400,
      fontSize: 26.395111083984375,
      lineHeightPx: 31.674135208129883,
      letterSpacing: -0.5279022216796875,
    },
    dmMonoSection48: {
      fontFamily: "DM Mono",
      fontWeight: 400,
      fontSize: 48,
      lineHeightPx: 72,
      letterSpacing: 0,
    },
    hankenGroteskGlyphSample52: {
      fontFamily: "Hanken Grotesk",
      fontWeight: 400,
      fontSize: 52.79022216796875,
      lineHeightPx: 63.348270416259766,
      letterSpacing: -1.055804443359375,
    },
    hankenGroteskPageTitle64: {
      fontFamily: "Hanken Grotesk",
      fontWeight: 400,
      fontSize: 64,
      lineHeightPx: 64,
      letterSpacing: -1.28,
    },
  },
  /** Heading styles — frame `284:2` (labels “Heading 20” … “Heading 48”). */
  heading: {
    h20: { fontFamily: "Hanken Grotesk", fontWeight: 700, fontSize: 20, lineHeightPx: 24, letterSpacing: -0.3 },
    h24: { fontFamily: "Hanken Grotesk", fontWeight: 700, fontSize: 24, lineHeightPx: 28, letterSpacing: -0.36 },
    h28: { fontFamily: "Hanken Grotesk", fontWeight: 700, fontSize: 28, lineHeightPx: 32, letterSpacing: -0.42 },
    h32: { fontFamily: "Hanken Grotesk", fontWeight: 700, fontSize: 32, lineHeightPx: 40, letterSpacing: -0.48 },
    h40: { fontFamily: "Hanken Grotesk", fontWeight: 700, fontSize: 40, lineHeightPx: 48, letterSpacing: -0.6 },
    h48: { fontFamily: "Hanken Grotesk", fontWeight: 700, fontSize: 48, lineHeightPx: 56, letterSpacing: -0.72 },
  },
  /** “Rationale” label style — frame `284:2` (layer name `Rationale`). */
  rationale: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: 24,
    lineHeightPx: 28.125,
    letterSpacing: -0.36,
  },
  /** Body styles — frame `288:137` (“Example” rows). */
  body: {
    b12: { fontFamily: "Hanken Grotesk", fontWeight: 400, fontSize: 12, lineHeightPx: 16, letterSpacing: -0.18 },
    b14: { fontFamily: "Hanken Grotesk", fontWeight: 400, fontSize: 14, lineHeightPx: 16, letterSpacing: -0.21 },
    b16: { fontFamily: "Hanken Grotesk", fontWeight: 400, fontSize: 16, lineHeightPx: 20, letterSpacing: -0.24 },
  },
  /** Logo Application — frame `12:379` (DM Mono section labels / notes; wordmark specimens). */
  logoApplication: {
    dmMonoSectionLabel: {
      fontFamily: "DM Mono",
      fontWeight: 400,
      fontSize: 48,
      lineHeightPx: 72,
      letterSpacing: 0,
    },
    dmMonoPrimarySecondaryLabel: {
      fontFamily: "DM Mono",
      fontWeight: 300,
      fontSize: 48,
      lineHeightPx: 63.36000061035156,
      letterSpacing: 0,
    },
    hankenWordmarkPrimary: {
      fontFamily: "Hanken Grotesk",
      fontWeight: 900,
      fontSize: 149.90037536621094,
      lineHeightPx: 164.89041137695312,
      letterSpacing: -10.493026275634767,
    },
    hankenClearSpaceVerticalNote: {
      fontFamily: "Hanken Grotesk",
      fontWeight: 400,
      fontSize: 15,
      lineHeightPx: 16.5,
      letterSpacing: -0.3,
    },
    hankenClearSpaceHorizontalNote: {
      fontFamily: "Hanken Grotesk",
      fontWeight: 400,
      fontSize: 12,
      lineHeightPx: 13.200000762939453,
      letterSpacing: -0.24,
    },
    hankenWordmarkSecondary: {
      fontFamily: "Hanken Grotesk",
      fontWeight: 900,
      fontSize: 125.54155731201172,
      lineHeightPx: 138.09571838378906,
      letterSpacing: -8.78790901184082,
    },
    hankenClearSpaceSmallNote: {
      fontFamily: "Hanken Grotesk",
      fontWeight: 400,
      fontSize: 10,
      lineHeightPx: 11,
      letterSpacing: -0.2,
    },
    hankenMarkSingleLetter: {
      fontFamily: "Hanken Grotesk",
      fontWeight: 400,
      fontSize: 221.74844360351562,
      lineHeightPx: 243.9232940673828,
      letterSpacing: -15.522391052246094,
    },
  },
};

export const tokens = {
  spacing,
  radius,
  colors,
  typography,
};

export default tokens;
