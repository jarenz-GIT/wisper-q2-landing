import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Pin + scrub ScrollTrigger that only hijacks scroll while moving downward.
 * Scrolling back up releases the pin, resets content, and returns to normal scroll.
 */
export function createDownwardPinScrollTrigger({
  trigger,
  start = "top top",
  end,
  scrub,
  anticipatePin = 1,
  invalidateOnRefresh = true,
  allowReverse = false,
  onEnter,
  onLeave,
  onEnterBack,
  onLeaveBack,
  onProgress,
  onReset,
}) {
  let pinReleased = false;

  const releasePin = (self) => {
    if (!pinReleased && self.isEnabled) {
      pinReleased = true;
      onReset?.();
      self.disable(false, true);
    }
  };

  const st = ScrollTrigger.create({
    trigger,
    start,
    end,
    pin: true,
    scrub,
    anticipatePin,
    invalidateOnRefresh,
    onEnter(self) {
      onEnter?.(self);
    },
    onLeave(self) {
      onLeave?.(self);
    },
    onUpdate(self) {
      if (allowReverse) {
        onProgress?.(self.progress, self);
        return;
      }

      if (self.direction === -1) {
        releasePin(self);
        return;
      }

      pinReleased = false;
      onProgress?.(self.progress, self);
    },
    onEnterBack(self) {
      onEnterBack?.(self);

      if (allowReverse) {
        onProgress?.(self.progress, self);
        return;
      }

      if (self.direction === -1) {
        releasePin(self);
      }
    },
    onLeaveBack(self) {
      if (!self.isEnabled) return;
      onLeaveBack?.(self);
      pinReleased = false;
      onReset?.();
      self.enable(false, true);
      ScrollTrigger.refresh();
    },
  });

  onProgress?.(st.progress, st);

  return st;
}

/**
 * Adds downward-only pin behavior to a timeline's embedded ScrollTrigger.
 */
export function bindDownwardPinTimeline(timeline, { onReset }) {
  const st = timeline.scrollTrigger;
  if (!st) return;

  let pinReleased = false;

  const releasePin = (self) => {
    if (!pinReleased && self.isEnabled) {
      pinReleased = true;
      onReset?.();
      self.disable(false, true);
    }
  };

  const prevOnUpdate = st.onUpdate;
  st.onUpdate = (self) => {
    prevOnUpdate?.(self);

    if (self.direction === -1) {
      releasePin(self);
      return;
    }

    pinReleased = false;
  };

  const prevOnEnterBack = st.onEnterBack;
  st.onEnterBack = (self) => {
    prevOnEnterBack?.(self);

    if (self.direction === -1) {
      releasePin(self);
    }
  };

  const prevOnLeaveBack = st.onLeaveBack;
  st.onLeaveBack = (self) => {
    if (!self.isEnabled) return;
    prevOnLeaveBack?.(self);

    pinReleased = false;
    onReset?.();
    self.enable(false, true);
    ScrollTrigger.refresh();
  };
}
