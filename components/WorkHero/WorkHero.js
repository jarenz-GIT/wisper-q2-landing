/**
 * WorkHero — /work page hero (Wisper Refresh 2026, Figma 898:4260)
 *
 * Layout (stacked):
 *   1. Full-width headline row
 *   2. Bottom row: descriptor copy (left) + featured video (right)
 *   3. Full-width divider
 */

"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import { isReady } from "@/lib/loading-ready";

import styles from "./WorkHero.module.css";

const VIDEO_SRC = "/images/work/fieldsvideo.mov";

export default function WorkHero() {
  const highlightRef = useRef(null);

  useEffect(() => {
    const el = highlightRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Hide immediately so it stays invisible while the loading screen is active.
    gsap.set(el, { clipPath: "inset(0 100% 0 0)" });

    let tween;
    const animate = () => {
      tween = gsap.to(el, {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.9,
        ease: "power3.inOut",
        delay: 0.15,
      });
    };

    if (isReady()) {
      animate();
    } else {
      window.addEventListener("wisper:ready", animate, { once: true });
    }

    return () => {
      window.removeEventListener("wisper:ready", animate);
      tween?.kill();
    };
  }, []);

  return (
    <section
      className={styles.section}
      aria-label="Work hero"
      data-nav-logo="navy"
      data-node-id="898:4260"
    >
      <div className={styles.inner}>

        {/* ── Headline ───────────────────────────────────────────────── */}
        <div className={styles.headline}>
          <p className={styles.lineGrotesk}>For brands that</p>
          <p className={styles.lineSerif}>
            <span ref={highlightRef} className={styles.highlight}>nobody saw coming.</span>
          </p>
        </div>

        {/* ── Bottom row ─────────────────────────────────────────────── */}
        <div className={styles.bottomRow}>

          {/* Left: descriptor card */}
          <div className={styles.descCard}>
            <p className={styles.descText}>
              We&rsquo;re a relationship-first branding studio. Brand, web, and
              media &mdash; made for the founders who don&rsquo;t just believe,
              but foresee.
            </p>
          </div>

          {/* Right: featured video */}
          <div className={styles.videoWrap} aria-hidden="true">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              className={styles.video}
              src={VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>

        </div>
      </div>

      {/* Inset divider */}
      <div className={styles.dividerWrap} aria-hidden="true">
        <div className={styles.divider} />
      </div>
    </section>
  );
}
