/**
 * WorkGrid — /work page case study grid
 * Connected to Sanity via `caseStudies` prop (allCaseStudiesQuery).
 *
 * Each card uses `cardColor` from Sanity to set its background.
 * `afterImageUrl` (pre-resolved CDN URL) is displayed as the card image.
 */

"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./WorkGrid.module.css";

/* Maps Sanity cardColor values → design-system CSS variables */
const COLOR_MAP = {
  "navy":          "var(--color-navy)",
  "pelli-pink":    "var(--color-pelli-pink)",
  "gooper-green":  "var(--color-gooper-green)",
  "yumazo-yellow": "var(--color-yumazo-yellow)",
  "onglo-orange":  "var(--color-onglo-orange)",
  "cotton-blue":   "var(--color-cotton-blue)",
};

/* Fallback rotation so un-colored cards still look intentional */
const FALLBACK_COLORS = [
  "var(--color-navy)",
  "var(--color-pelli-pink)",
  "var(--color-gooper-green)",
  "var(--color-yumazo-yellow)",
];

export default function WorkGrid({ caseStudies = [] }) {
  return (
    <section
      className={styles.section}
      aria-label="Work we've done"
      data-nav-logo="navy"
    >
      <div className={styles.inner}>

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className={styles.header}>
          <p className={styles.subtitle}>
            <span aria-hidden="true">-</span>
            <span>WORK WE&rsquo;VE DONE</span>
            <span aria-hidden="true">-</span>
          </p>

          <div className={styles.headline}>
            <p className={styles.headlineLine}>We Work With Brands</p>
            <p className={styles.headlineLine}>That We Believe In.</p>
          </div>
        </div>

        {/* ── Card grid ──────────────────────────────────────────────── */}
        {caseStudies.length > 0 ? (
          <div className={styles.grid}>
            {caseStudies.map((study, index) => (
              <WorkCard
                key={study._id}
                study={study}
                fallbackColor={FALLBACK_COLORS[index % FALLBACK_COLORS.length]}
              />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No case studies yet — check back soon.</p>
        )}

      </div>
    </section>
  );
}

/* ── Individual card ─────────────────────────────────────────────────────── */
function WorkCard({ study, fallbackColor }) {
  const { clientName, projectTitle, services, slug, afterImageUrl, cardColor } = study;

  const href         = `/work/${slug?.current ?? ""}`;
  const bgColor      = (cardColor && COLOR_MAP[cardColor]) || fallbackColor;
  const serviceLabel = services?.length ? services.join(" + ") : projectTitle;
  const afterSrc     = afterImageUrl ?? `/images/case-studies/${slug?.current}/after.png`;

  /* Ref-based cursor — avoids re-renders on every mousemove */
  const cursorRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top  = `${e.clientY}px`;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (cursorRef.current) cursorRef.current.dataset.visible = "true";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cursorRef.current) cursorRef.current.dataset.visible = "false";
  }, []);

  return (
    <article
      className={styles.card}
      style={{ backgroundColor: bgColor }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/*
        Custom cursor — position:fixed so it escapes the card's DOM subtree
        and sits at true viewport coordinates. Note: the card must NOT have
        transform/filter/will-change:transform active or fixed positioning
        gets re-contained. We intentionally avoid those on .card.
      */}
      <div
        ref={cursorRef}
        className={styles.customCursor}
        data-visible="false"
        aria-hidden="true"
      >
        visit
      </div>

      <Link href={href} className={styles.cardLink}>

        {/* Full-bleed image — clipped top & bottom by object-fit:cover */}
        <div className={styles.cardMedia}>
          <Image
            src={afterSrc}
            alt={`${clientName} — after`}
            fill
            className={styles.cardImage}
            sizes="(max-width: 767px) 100vw, 550px"
          />
        </div>

        {/* Dark blur overlay — animates in on hover */}
        <div className={styles.cardOverlay} aria-hidden="true" />

        {/* Bottom gradient for text legibility */}
        <div className={styles.cardGradient} aria-hidden="true" />

        {/* Hover tagline — slides in from top */}
        <p className={styles.cardTagline}>{projectTitle}</p>

        {/* Always-visible bottom info */}
        <div className={styles.cardContent}>
          <p className={styles.cardTitle}>{clientName}</p>
          <p className={styles.cardServices}>{serviceLabel}</p>
        </div>

      </Link>
    </article>
  );
}
