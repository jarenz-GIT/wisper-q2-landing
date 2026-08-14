/** @type {import("lenis").default | null} */
let lenisInstance = null;

/** @returns {import("lenis").default | null} */
export function getLenis() {
  return lenisInstance;
}

/** @param {import("lenis").default | null} instance */
export function setLenis(instance) {
  lenisInstance = instance;
}
