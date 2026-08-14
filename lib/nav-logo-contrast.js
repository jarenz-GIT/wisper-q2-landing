/** Relative luminance for WCAG contrast checks. */
function relativeLuminance({ r, g, b }) {
  const channel = (value) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  return (
    0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
  );
}

function contrastRatio(luminanceA, luminanceB) {
  const lighter = Math.max(luminanceA, luminanceB);
  const darker = Math.min(luminanceA, luminanceB);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseRgb(color) {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return null;

  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
  };
}

const LOGO_LIGHT_LUMINANCE = relativeLuminance({ r: 252, g: 252, b: 252 });
const MIN_LOGO_CONTRAST = 3;

function isTransparentBackground(color) {
  return (
    !color ||
    color === "transparent" ||
    color === "rgba(0, 0, 0, 0)" ||
    /rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0\s*\)/.test(color)
  );
}

function isNavLogoZone(element, variant) {
  let node = element;

  while (node && node !== document.documentElement) {
    if (node.dataset?.navLogo === variant) {
      return true;
    }

    node = node.parentElement;
  }

  return false;
}

function getNavLogoVariantFromElement(element) {
  let node = element;

  while (node && node !== document.documentElement) {
    const variant = node.dataset?.navLogo;
    if (variant === "navy" || variant === "light") {
      return variant;
    }

    node = node.parentElement;
  }

  return null;
}

function getBackgroundLuminance(fromElement) {
  if (!fromElement) {
    return relativeLuminance({ r: 250, g: 249, b: 245 });
  }

  if (fromElement.tagName === "VIDEO") {
    return 0.08;
  }

  let node = fromElement;

  while (node && node !== document.documentElement) {
    const { backgroundColor } = window.getComputedStyle(node);

    if (!isTransparentBackground(backgroundColor)) {
      const rgb = parseRgb(backgroundColor);
      if (rgb) {
        return relativeLuminance(rgb);
      }
    }

    node = node.parentElement;
  }

  const bodyColor = window.getComputedStyle(document.body).backgroundColor;
  const bodyRgb = parseRgb(bodyColor);

  return bodyRgb
    ? relativeLuminance(bodyRgb)
    : relativeLuminance({ r: 250, g: 249, b: 245 });
}

/**
 * Prefer marked sections whose bounding box contains the probe point.
 * More reliable than elementFromPoint during fast scroll and GSAP pin/unpin.
 */
function findNavLogoVariantFromMarkedSections(x, y) {
  const marked = document.querySelectorAll("[data-nav-logo]");
  const candidates = [];

  for (const element of marked) {
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) continue;

    const style = window.getComputedStyle(element);
    if (style.visibility === "hidden" || style.display === "none") continue;

    const zIndex = Number.parseInt(style.zIndex, 10);

    candidates.push({
      variant: element.dataset.navLogo,
      zIndex: Number.isNaN(zIndex) ? 0 : zIndex,
      area: rect.width * rect.height,
    });
  }

  if (!candidates.length) {
    return null;
  }

  candidates.sort((a, b) => {
    if (b.zIndex !== a.zIndex) {
      return b.zIndex - a.zIndex;
    }

    return a.area - b.area;
  });

  return candidates[0].variant;
}

function findNavLogoVariantFromElementsAtPoint(x, y, navShell) {
  const elements = document.elementsFromPoint(x, y);

  for (const element of elements) {
    if (navShell?.contains(element)) {
      continue;
    }

    const variant = getNavLogoVariantFromElement(element);
    if (variant) {
      return variant;
    }
  }

  return null;
}

/**
 * Returns true when the light wordmark lacks sufficient contrast and the navy
 * variant should be shown instead.
 *
 * @param {number} x Viewport x coordinate (logo center).
 * @param {number} y Viewport y coordinate (logo center).
 * @param {HTMLElement | null} navShell Fixed navbar shell to ignore while probing.
 */
export function shouldUseNavyLogoAtPoint(x, y, navShell) {
  const markedVariant = findNavLogoVariantFromMarkedSections(x, y);
  if (markedVariant) {
    return markedVariant === "navy";
  }

  if (navShell) {
    navShell.style.pointerEvents = "none";
  }

  const stackVariant = findNavLogoVariantFromElementsAtPoint(x, y, navShell);
  const elements = document.elementsFromPoint(x, y);
  const target = elements.find((element) => !navShell?.contains(element)) ?? null;

  if (navShell) {
    navShell.style.pointerEvents = "";
  }

  if (stackVariant) {
    return stackVariant === "navy";
  }

  if (isNavLogoZone(target, "navy")) {
    return true;
  }

  if (isNavLogoZone(target, "light")) {
    return false;
  }

  const backgroundLuminance = getBackgroundLuminance(target);
  const lightLogoContrast = contrastRatio(
    LOGO_LIGHT_LUMINANCE,
    backgroundLuminance,
  );

  return lightLogoContrast < MIN_LOGO_CONTRAST;
}
