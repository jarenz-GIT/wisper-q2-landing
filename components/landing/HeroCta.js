"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import { site } from "@/lib/site";

import styles from "./LandingPage.module.css";

const IDLE_SPEED = 0.15;
const HOVER_SPEED = 0.35;

export default function HeroCta() {
  const linkRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const link = linkRef.current;
    const glow = glowRef.current;
    if (!link || !glow) return undefined;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return undefined;

    const tween = gsap.to(glow, {
      xPercent: -50,
      duration: 2.5,
      ease: "none",
      repeat: -1,
    });
    tween.timeScale(IDLE_SPEED);

    const speedUp = () => {
      gsap.to(tween, {
        timeScale: HOVER_SPEED,
        duration: 0.4,
        ease: "power1.out",
        overwrite: true,
      });
    };
    const slowDown = () => {
      gsap.to(tween, {
        timeScale: IDLE_SPEED,
        duration: 0.45,
        ease: "power1.out",
        overwrite: true,
      });
    };

    link.addEventListener("mouseenter", speedUp);
    link.addEventListener("mouseleave", slowDown);
    link.addEventListener("focus", speedUp);
    link.addEventListener("blur", slowDown);

    const onMotionChange = () => {
      if (media.matches) {
        tween.pause();
        gsap.set(glow, { xPercent: 0 });
      } else {
        tween.timeScale(IDLE_SPEED);
        tween.play();
      }
    };
    media.addEventListener("change", onMotionChange);

    return () => {
      tween.kill();
      link.removeEventListener("mouseenter", speedUp);
      link.removeEventListener("mouseleave", slowDown);
      link.removeEventListener("focus", speedUp);
      link.removeEventListener("blur", slowDown);
      media.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <a
      ref={linkRef}
      href={site.links.calendly}
      className={styles.heroCta}
      target="_blank"
      rel="noreferrer"
    >
      <span className={styles.heroCtaFill} aria-hidden="true">
        <span ref={glowRef} className={styles.heroCtaGlow} />
      </span>
      <span className={styles.heroCtaLabel}>{site.hero.cta}</span>
    </a>
  );
}
