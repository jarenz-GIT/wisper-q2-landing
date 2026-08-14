/**
 * Split bullet copy and wrap known package names in <em> (Times New Roman in CSS).
 * @param {string} text
 * @param {string[]} packageNames — longest names first for correct matching
 * @returns {Array<string | import("react").JSX.Element>}
 */
export function renderBulletTextWithPackageNames(text, packageNames) {
  if (!text || !packageNames.length) {
    return text;
  }

  const names = [...packageNames]
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  const pattern = names
    .map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");

  if (!pattern) {
    return text;
  }

  const re = new RegExp(`(${pattern})`, "gi");
  const parts = text.split(re).filter((part) => part !== "");

  return parts.map((part, index) => {
    const isPackageName = names.some(
      (name) => name.toLowerCase() === part.toLowerCase(),
    );

    if (!isPackageName) {
      return part;
    }

    return <em key={`pkg-name-${index}-${part}`}>{part}</em>;
  });
}

/**
 * @param {Array<{ name?: string }>} packages
 * @returns {string[]}
 */
export function getPackageNamesForMatching(packages) {
  return [...new Set(packages.map((pkg) => pkg.name).filter(Boolean))];
}
