import gsap from "gsap";

import { springOut } from "@/lib/gsap-spring";

/** Delay between sequential flip-ins (left-to-right cards). */
export const FLIP_IN_STAGGER = 0.18;

const FLIP_DURATION = 0.95;
const FLIP_BOUNCE = 0.4;

/**
 * Pricing-card flip-in: 180° Y rotation from blank back face to front.
 * @param {gsap.TweenTarget} target
 * @param {{ delay?: number }} [options]
 * @returns {gsap.core.Tween}
 */
export function runFlipInY(target, { delay = 0 } = {}) {
  gsap.set(target, {
    rotationY: 180,
    transformPerspective: 1000,
  });

  return gsap.to(target, {
    rotationY: 0,
    duration: FLIP_DURATION,
    delay,
    ease: springOut(FLIP_BOUNCE),
  });
}

/**
 * @param {gsap.TweenTarget} target
 */
export function setFlipInVisible(target) {
  gsap.set(target, { rotationY: 0 });
}
