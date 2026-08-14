/**
 * CaseStudyPreview — Figma frame 818:3835 "Case Studies"
 * (Wisper Refresh 2026)
 *
 * Fields sourced from Sanity (via `caseStudies` prop):
 *   clientName, projectTitle, afterImage, beforeImage, slug
 *
 * Fields that are static (hardcoded in this component):
 *   Section subtitle "- CASE STUDIES -"
 *   Section headline "We Work With Brands That We Believe In."
 *   "SEE THE BEFORE:" toggle label
 *   "SEE MORE →" link target (/work)
 */

"use client";

import gsap from "gsap";
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { springOut } from "@/lib/gsap-spring";

import styles from "./case-study-preview.module.css";

const TILT_ROTATION = -7;
const TILT_DURATION = 0.4;
const TILT_RETURN_DURATION = 0.22;
const TILT_EASE = "back.out(0.45)";
const IMAGE_CROSSFADE_MS = 450;
const TOGGLE_KNOB_DURATION = 0.5;
const TOGGLE_KNOB_BOUNCE = 0.3;

const FALLBACK_CASE_STUDIES = [
  {
    _id: "shipnomad",
    clientName: "ShipNomad",
    projectTitle: "3PL Rebrand",
    slug: { current: "shipnomad" },
    afterImage: null,
    beforeImage: null,
  },
  {
    _id: "deep-pocket-monster",
    clientName: "Deep Pocket Monster",
    projectTitle: "Pokemon Website Redesign",
    slug: { current: "deep-pocket-monster" },
    afterImage: null,
    beforeImage: null,
  },
  {
    _id: "fallback-3",
    clientName: "Coming Soon",
    projectTitle: "Case Study",
    slug: { current: "fallback-3" },
    afterImage: null,
    beforeImage: null,
  },
  {
    _id: "fallback-4",
    clientName: "Coming Soon",
    projectTitle: "Case Study",
    slug: { current: "fallback-4" },
    afterImage: null,
    beforeImage: null,
  },
  {
    _id: "fallback-5",
    clientName: "Coming Soon",
    projectTitle: "Case Study",
    slug: { current: "fallback-5" },
    afterImage: null,
    beforeImage: null,
  },
  {
    _id: "fallback-6",
    clientName: "Coming Soon",
    projectTitle: "Case Study",
    slug: { current: "fallback-6" },
    afterImage: null,
    beforeImage: null,
  },
];

export default function CaseStudyPreview({ caseStudies = FALLBACK_CASE_STUDIES }) {
  const [showBefore, setShowBefore] = useState(false);
  const [imagesBefore, setImagesBefore] = useState(false);
  const [smoothCrossfade, setSmoothCrossfade] = useState(false);
  const cardRefs = useRef([]);
  const toggleRef = useRef(null);
  const toggleKnobRef = useRef(null);
  const toggleKnobInitialized = useRef(false);

  const displayedStudies = caseStudies.slice(0, 6);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, displayedStudies.length);
  }, [displayedStudies.length]);

  useEffect(() => {
    if (!smoothCrossfade) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setSmoothCrossfade(false);
    }, IMAGE_CROSSFADE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [smoothCrossfade]);

  useLayoutEffect(() => {
    const toggle = toggleRef.current;
    const knob = toggleKnobRef.current;
    if (!toggle || !knob) return undefined;

    const style = window.getComputedStyle(toggle);
    const paddingLeft = Number.parseFloat(style.paddingLeft) || 0;
    const paddingRight = Number.parseFloat(style.paddingRight) || 0;
    const travel = toggle.clientWidth - knob.offsetWidth - paddingLeft - paddingRight;
    const x = showBefore ? travel : 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!toggleKnobInitialized.current || reduceMotion) {
      gsap.set(knob, { x });
      toggleKnobInitialized.current = true;
      return undefined;
    }

    gsap.to(knob, {
      x,
      duration: TOGGLE_KNOB_DURATION,
      ease: springOut(TOGGLE_KNOB_BOUNCE),
    });

    return () => gsap.killTweensOf(knob);
  }, [showBefore]);

  const handleBeforeToggle = () => {
    const next = !showBefore;
    setShowBefore(next);

    const cards = cardRefs.current.filter(Boolean);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!cards.length || reduceMotion) {
      setSmoothCrossfade(false);
      setImagesBefore(next);
      return;
    }

    gsap.killTweensOf(cards);

    if (next) {
      setSmoothCrossfade(false);
      gsap.set(cards, {
        transformOrigin: "18% 50%",
        rotation: 0,
        transition: "none",
      });

      gsap
        .timeline({
          defaults: {
            duration: TILT_DURATION,
            ease: TILT_EASE,
          },
        })
        .to(cards, {
          rotation: TILT_ROTATION,
        })
        .call(() => {
          setImagesBefore(true);
        })
        .to(cards, {
          rotation: 0,
          duration: TILT_RETURN_DURATION,
          clearProps: "transform,transition",
        });

      return;
    }

    gsap.set(cards, { clearProps: "transform" });
    setSmoothCrossfade(true);
    setImagesBefore(false);
  };

  return (
    <section
      className={styles.section}
      aria-label="Featured case studies"
      data-nav-logo="navy"
      data-node-id="818:3835"
    >
      <div className={styles.inner}>

        {/* ── Section header ──────────────────────────────────────────── */}
        <div className={styles.header} data-node-id="818:3836">

          <p className={styles.subtitle} data-node-id="818:3837">
            <span aria-hidden="true">-</span>
            <span>CASE STUDIES</span>
            <span aria-hidden="true">-</span>
          </p>

          <div className={styles.headlineRow} data-node-id="818:3841">
          <div className={styles.headline} data-node-id="818:3842">
              <p className={styles.headlineLine}>We Work With Brands</p>
              <p className={styles.headlineLine}>That We Believe In.</p>
            </div>

            <div className={styles.beforeSwitch} data-node-id="818:3843">
              <span className={styles.beforeLabel} data-node-id="818:3844">
                See the before:
              </span>
              <button
                ref={toggleRef}
                type="button"
                className={`${styles.toggle} ${showBefore ? styles.toggleOn : ""}`}
                onClick={handleBeforeToggle}
                aria-pressed={showBefore}
                aria-label={showBefore ? "Showing before state — click to show after" : "Showing after state — click to show before"}
                data-node-id="818:3845"
              >
                <span ref={toggleKnobRef} className={styles.toggleKnob} />
              </button>
            </div>
          </div>

        </div>

        {/* ── Card grid ────────────────────────────────────────────────── */}
        <div className={styles.grid} data-node-id="818:3846">
          {displayedStudies.map((study, index) => (
            <WorkCard
              key={study._id}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              caseStudy={study}
              imagesBefore={imagesBefore}
              smoothCrossfade={smoothCrossfade}
            />
          ))}
        </div>

        {/* ── See more ─────────────────────────────────────────────────── */}
        <div className={styles.seeMoreRow}>
          <Link href="/work" className={styles.seeMore} data-node-id="818:3854">
            SEE MORE →
          </Link>
        </div>

      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// WorkCard — individual case study card
// ---------------------------------------------------------------------------
const WorkCard = forwardRef(function WorkCard(
  { caseStudy, imagesBefore, smoothCrossfade },
  ref,
) {
  const { clientName, projectTitle, slug, afterImageUrl, beforeImageUrl } = caseStudy;
  const href = `/work/${slug?.current ?? ""}`;

  const layerClassName = (visible) =>
    [
      styles.cardImageLayer,
      visible ? styles.imageVisible : styles.imageHidden,
      smoothCrossfade ? styles.imageCrossfade : "",
    ]
      .filter(Boolean)
      .join(" ");

  const afterSrc =
    afterImageUrl ?? `/images/case-studies/${slug?.current}/after.jpg`;
  const beforeSrc =
    beforeImageUrl ?? `/images/case-studies/${slug?.current}/before.jpg`;

  return (
    <article ref={ref} className={styles.card} data-node-id="818:3847">
      <Link href={href} className={styles.cardLink} tabIndex={0}>

        {/* ── Images ──────────────────────────────────────────────────── */}
        <div className={styles.cardMedia} aria-hidden="true">
          <div className={layerClassName(!imagesBefore)}>
            <Image
              src={afterSrc}
              alt={`${clientName} — after`}
              fill
              className={styles.cardImage}
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            />
          </div>

          <div className={layerClassName(imagesBefore)}>
            <Image
              src={beforeSrc}
              alt={`${clientName} — before`}
              fill
              className={styles.cardImage}
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            />
          </div>

          <div className={styles.cardOverlay} />
        </div>

        {/* ── Card content ────────────────────────────────────────────── */}
        <div className={styles.cardContent} data-node-id="I818:3847;386:2038">
          <p className={styles.cardCategory} data-node-id="I818:3847;386:2040">
            {projectTitle}
          </p>
          <p className={styles.cardTitle} data-node-id="I818:3847;386:2041">
            {clientName}
          </p>
        </div>

      </Link>
    </article>
  );
});
