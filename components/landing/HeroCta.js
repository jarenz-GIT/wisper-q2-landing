"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import { site } from "@/lib/site";

import styles from "./LandingPage.module.css";

const IDLE_SPEED = 0.336;

const BLOB_MOTIONS = [
  {
    xPercent: 22,
    yPercent: 18,
    scale: 1.18,
    rotation: 14,
    borderRadius: "58% 42% 62% 38%",
    duration: 2.4,
  },
  {
    xPercent: -20,
    yPercent: 16,
    scale: 1.22,
    rotation: -12,
    borderRadius: "40% 60% 38% 62%",
    duration: 2.9,
  },
  {
    xPercent: 16,
    yPercent: -22,
    scale: 1.16,
    rotation: 10,
    borderRadius: "62% 38% 48% 52%",
    duration: 3.2,
  },
  {
    xPercent: -14,
    yPercent: -18,
    scale: 1.2,
    rotation: -16,
    borderRadius: "46% 54% 60% 40%",
    duration: 2.6,
  },
  {
    xPercent: 10,
    yPercent: 12,
    scale: 1.28,
    rotation: 8,
    borderRadius: "50% 50% 42% 58%",
    duration: 3.5,
  },
];

export default function HeroCta() {
  const blobsRef = useRef(null);

  useEffect(() => {
    const blobsWrap = blobsRef.current;
    if (!blobsWrap) return undefined;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return undefined;

    const blobs = Array.from(blobsWrap.children);
    const tweens = blobs.map((blob, index) => {
      const motion = BLOB_MOTIONS[index] ?? BLOB_MOTIONS[0];
      const tween = gsap.to(blob, {
        xPercent: motion.xPercent,
        yPercent: motion.yPercent,
        scale: motion.scale,
        rotation: motion.rotation,
        borderRadius: motion.borderRadius,
        duration: motion.duration,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      tween.timeScale(IDLE_SPEED);
      return tween;
    });

    const groupTween = gsap.to(blobsWrap, {
      rotation: 12,
      duration: 8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    groupTween.timeScale(IDLE_SPEED);
    tweens.push(groupTween);

    const onMotionChange = () => {
      if (media.matches) {
        tweens.forEach((tween) => tween.pause());
        gsap.set(blobs, { xPercent: 0, yPercent: 0, scale: 1, rotation: 0 });
        gsap.set(blobsWrap, { rotation: 0 });
      } else {
        tweens.forEach((tween) => {
          tween.timeScale(IDLE_SPEED);
          tween.play();
        });
      }
    };
    media.addEventListener("change", onMotionChange);

    return () => {
      tweens.forEach((tween) => tween.kill());
      media.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <a
      href={site.links.calendly}
      className={styles.heroCta}
      target="_blank"
      rel="noreferrer"
    >
      <span className={styles.heroCtaFill} aria-hidden="true">
        <span ref={blobsRef} className={styles.heroCtaBlobs}>
          <span className={`${styles.heroCtaBlob} ${styles.heroCtaBlobNavy}`} />
          <span className={`${styles.heroCtaBlob} ${styles.heroCtaBlobTeal}`} />
          <span className={`${styles.heroCtaBlob} ${styles.heroCtaBlobOrange}`} />
          <span className={`${styles.heroCtaBlob} ${styles.heroCtaBlobBlue}`} />
          <span className={`${styles.heroCtaBlob} ${styles.heroCtaBlobWhite}`} />
        </span>
        <span className={styles.heroCtaNoise} />
        <span className={styles.heroCtaHover} />
      </span>
      <span className={styles.heroCtaLabel}>{site.hero.cta}</span>
    </a>
  );
}
