import gsap from "gsap";

import { springOut } from "@/lib/gsap-spring";

/** Delay between sequential pop-ins (e.g. left-to-right cards). */
export const POP_IN_STAGGER = 0.22;

const POP_IN_DURATION = 0.85;
const POP_IN_BOUNCE = 0.4;
const POP_IN_START_SCALE = 0.3;

/**
 * Pop-in: fade + scale from 0.3 → 1 with spring bounce.
 * @param {gsap.TweenTarget} target
 * @param {{ delay?: number }} [options]
 * @returns {gsap.core.Tween}
 */
export function runPopIn(target, { delay = 0 } = {}) {
  gsap.set(target, {
    scale: POP_IN_START_SCALE,
    opacity: 0,
    transformOrigin: "50% 50%",
  });

  return gsap.to(target, {
    scale: 1,
    opacity: 1,
    duration: POP_IN_DURATION,
    delay,
    ease: springOut(POP_IN_BOUNCE),
  });
}

/**
 * @param {gsap.TweenTarget} target
 */
export function setPopInVisible(target) {
  gsap.set(target, { scale: 1, opacity: 1 });
}
