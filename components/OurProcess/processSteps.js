/** Process step metadata + cursor anchors (Figma canvas 589×515) */

export const PROCESS_STEPS = [
  { id: 1, label: "01", name: "Listen", time: "Week 0" },
  { id: 2, label: "02", name: "Map", time: "Week 1" },
  { id: 3, label: "03", name: "Sketch", time: "Week 2 – 3" },
  { id: 4, label: "04", name: "Build", time: "Week 4 – 7" },
  { id: 5, label: "05", name: "Launch", time: "Week 8" },
  { id: 6, label: "06", name: "Scale", time: "Month 3+" },
];

/** Center of cursor wrapper as % of sketchpad */
export const CURSOR_ANCHORS = {
  1: { x: 35.77, y: 56.25, scale: 1, src: "/images/process/cursor.svg" },
  2: { x: 18.68, y: 66.75, scale: 1, src: "/images/process/cursor.svg" },
  3: { x: 77.36, y: 65.96, scale: 1, src: "/images/process/cursor.svg" },
  4: { x: 33.83, y: 54.89, scale: 1, src: "/images/process/cursor.svg" },
  5: { x: 65.16, y: 54.89, scale: 1, src: "/images/process/cursor.svg" },
  6: { x: 86.36, y: 80.13, scale: 1, src: "/images/process/cursor.svg" },
};
