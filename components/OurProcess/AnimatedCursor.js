"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import styles from "./OurProcess.module.css";
import { CURSOR_ANCHORS } from "./processSteps";

export default function AnimatedCursor({ stepId, isFollowing = false, cursorPosition = { x: 0, y: 0 } }) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const el = wrapRef.current;
    const anchor = CURSOR_ANCHORS[stepId];
    if (!el || !anchor) return;

    if (imgRef.current) {
      imgRef.current.src = anchor.src;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isFollowing) {
      gsap.set(el, {
        left: cursorPosition.x,
        top: cursorPosition.y,
        scale: anchor.scale,
        xPercent: -50,
        yPercent: -50,
      });
      return;
    }

    const vars = {
      left: `${anchor.x}%`,
      top: `${anchor.y}%`,
      scale: anchor.scale,
      xPercent: -50,
      yPercent: -50,
    };

    if (isFirstRender.current || reduceMotion) {
      gsap.set(el, vars);
      isFirstRender.current = false;
      return;
    }

    gsap.to(el, {
      ...vars,
      duration: 0.65,
      ease: "power2.inOut",
    });
  }, [stepId, isFollowing, cursorPosition.x, cursorPosition.y]);

  const anchor = CURSOR_ANCHORS[stepId];

  return (
    <div ref={wrapRef} className={styles.cursorOverlay} aria-hidden="true">
      <div className={styles.cursorOverlayRotate}>
        <div className={styles.cursorOverlayInner}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={anchor.src}
            alt=""
            className={styles.cursorOverlayImg}
            width={25}
            height={26}
          />
        </div>
      </div>
    </div>
  );
}
