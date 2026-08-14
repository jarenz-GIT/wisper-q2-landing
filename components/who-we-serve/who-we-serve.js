/**
 * WhoWeServe — Figma frame 822:3941 "Momentum Builder V3"
 * (Wisper Refresh 2026)
 *
 * Fields that are STATIC (hardcoded):
 *   Section subtitle "- WHO WE SERVE AND HOW WE SERVE THEM -"
 *   Section headline "We trust the process"
 *   Divider line decoration
 *   Progress bar decoration
 *   Quote icon (/images/who-we-serve/icon-quote.svg)
 *   "A TYPICAL TIMELINE FOR" prefix text
 *
 * Fields sourced from SANITY (via `customerTypes` prop — array of customerType docs):
 *   timelineImageUrl, quoteText, quoteName, quoteRole
 *   Merged by `segment` onto hardcoded tab label, icon, and order.
 */

"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { createDownwardPinScrollTrigger } from "@/lib/downward-pin-scroll";

import styles from "./who-we-serve.module.css";

const SCROLL_DISTANCE_PER_TYPE_DESKTOP = 100;
const SCROLL_DISTANCE_PER_TYPE_MOBILE = 75;

function getProgressForIndex(index, typeCount) {
  if (typeCount <= 1) {
    return 1;
  }

  return index / (typeCount - 1);
}

const FALLBACK_CUSTOMER_TYPES = [
  {
    _id: "ecommerce",
    label: "Ecommerce",
    iconSrc: "/images/who-we-serve/icon-ecommerce.svg",
    timelineLabel: "ECOMMERCE BRANDS",
    timelineRows: ["Discovery", "Brand", "Packaging & Print", "Website", "Launch"],
    timelineSteps: [
      // Step positions are percentages of the track width (0–100)
      { rowIndex: 0, label: "Category, Consumer & Comp Audit", startPercent: 15.7, widthPercent: 21.2 },
      { rowIndex: 1, label: "Identity, Packaging, Voice",       startPercent: 37.0, widthPercent: 21.2 },
      { rowIndex: 2, label: "Dielines, Retail Ready",           startPercent: 51.1, widthPercent: 21.1 },
      { rowIndex: 3, label: "DTC + 3PL",                        startPercent: 48.3, widthPercent: 31.1 },
      { rowIndex: 4, label: "Paid Media",                       startPercent: 68.8, widthPercent: 23.0 },
    ],
    quoteText:
      "The Wisper team is the best and were so easy to work with. So dependable and all deliverables were so high quality.",
    quoteName: "Jimmy Sun",
    quoteRole: "CEO OF SHIPNOMAD",
  },
  {
    _id: "content-creators",
    label: "Content Creators",
    iconSrc: "/images/who-we-serve/icon-creators.svg",
    timelineLabel: "CONTENT CREATORS",
    timelineRows: ["Discovery", "Brand", "Content Strategy", "Launch", "Growth"],
    timelineSteps: [],
    quoteText: "Quote coming soon.",
    quoteName: "Name",
    quoteRole: "ROLE / COMPANY",
  },
  {
    _id: "startups",
    label: "Startups",
    iconSrc: "/images/who-we-serve/icon-startups.svg",
    timelineLabel: "STARTUPS",
    timelineRows: ["Discovery", "Brand", "Website", "Launch", "Scale"],
    timelineSteps: [],
    quoteText: "Quote coming soon.",
    quoteName: "Name",
    quoteRole: "ROLE / COMPANY",
  },
];

function mergeCustomerTypes(sanityDocs) {
  if (!sanityDocs?.length) {
    return FALLBACK_CUSTOMER_TYPES;
  }

  const bySegment = new Map(sanityDocs.map((doc) => [doc.segment, doc]));

  return FALLBACK_CUSTOMER_TYPES.map((fallback) => {
    const doc = bySegment.get(fallback._id);
    if (!doc) {
      return fallback;
    }

    return {
      ...fallback,
      timelineImageUrl: doc.timelineImageUrl ?? fallback.timelineImageUrl,
      quoteText: doc.quoteText ?? fallback.quoteText,
      quoteName: doc.quoteName ?? fallback.quoteName,
      quoteRole: doc.quoteRole ?? fallback.quoteRole,
    };
  });
}

export default function WhoWeServe({ customerTypes: customerTypesProp }) {
  const customerTypes = mergeCustomerTypes(customerTypesProp);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeCustomerType = customerTypes[activeIndex];
  const isStartupActive = activeCustomerType?._id === "startups";
  const sectionRef = useRef(null);
  const progressFillRef = useRef(null);
  const pinContentRef = useRef(null);
  const activeIndexRef = useRef(0);
  const mmRef = useRef(null);

  /* Kill pin spacers before React's mutation phase so removeChild succeeds. */
  useLayoutEffect(() => {
    return () => {
      mmRef.current?.revert();
    };
  }, []);

  // Keep ref in sync with state so the GSAP callback never closes over a stale value.
  useLayoutEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Scroll hack: pin section, traverse customer types, drive progress bar.
  // useEffect (not useLayoutEffect) so GSAP measures the section after paint,
  // matching the same pattern used by the Partners section.
  useEffect(() => {
    const section = sectionRef.current;
    const progressFill = progressFillRef.current;
    const pinContent = pinContentRef.current;
    const typeCount = customerTypes.length;

    if (!section || !progressFill || !pinContent || typeCount === 0) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set(progressFill, { scaleX: 1, transformOrigin: "left center" });
      return undefined;
    }

    // Updates both the progress fill width and the active tab index.
    const syncState = (rawProgress) => {
      const progress = Math.min(1, Math.max(0, rawProgress));
      const nextIndex = Math.min(typeCount - 1, Math.floor(progress * typeCount));

      gsap.set(progressFill, { scaleX: progress, transformOrigin: "left center" });

      if (activeIndexRef.current !== nextIndex) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    };

    const resetState = () => {
      activeIndexRef.current = 0;
      setActiveIndex(0);
      gsap.set(progressFill, { scaleX: 0, transformOrigin: "left center" });
    };

    const animatePinEnter = (fromY = 20) => {
      gsap.fromTo(
        pinContent,
        { opacity: 0.85, y: fromY },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power1.out",
          overwrite: "auto",
        },
      );
    };

    const animatePinLeave = (toY = -20) => {
      gsap.to(pinContent, {
        opacity: 0.85,
        y: toY,
        duration: 0.3,
        ease: "power1.in",
        overwrite: "auto",
      });
    };

    gsap.set(pinContent, { opacity: 0.85, y: 20, willChange: "opacity, transform" });

    const mm = gsap.matchMedia();
    mmRef.current = mm;

    mm.add("(min-width: 768px)", () => {
      gsap.set(progressFill, { scaleX: 0, transformOrigin: "left center" });

      const st = createDownwardPinScrollTrigger({
        trigger: section,
        end: `+=${typeCount * SCROLL_DISTANCE_PER_TYPE_DESKTOP}%`,
        scrub: 1.5,
        anticipatePin: 1,
        allowReverse: true,
        onEnter: () => animatePinEnter(20),
        onLeave: () => animatePinLeave(-20),
        onEnterBack: () => animatePinEnter(-20),
        onLeaveBack: () => animatePinLeave(20),
        onProgress: (progress) => syncState(progress),
        onReset: resetState,
      });

      return () => st.kill(true);
    });

    mm.add("(max-width: 767px)", () => {
      gsap.set(progressFill, { scaleX: 0, transformOrigin: "left center" });

      const st = createDownwardPinScrollTrigger({
        trigger: section,
        end: `+=${typeCount * SCROLL_DISTANCE_PER_TYPE_MOBILE}%`,
        scrub: 1.5,
        anticipatePin: 1,
        allowReverse: true,
        onEnter: () => animatePinEnter(20),
        onLeave: () => animatePinLeave(-20),
        onEnterBack: () => animatePinEnter(-20),
        onLeaveBack: () => animatePinLeave(20),
        onProgress: (progress) => syncState(progress),
        onReset: resetState,
      });

      return () => st.kill(true);
    });

    // Recalculate pin positions after layout settles or viewport changes.
    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      gsap.killTweensOf(pinContent);
      gsap.set(pinContent, { clearProps: "opacity,transform,willChange" });
      mm.revert();
      mmRef.current = null;
    };
  }, [customerTypes.length]);

  const handleTabClick = (index) => {
    const progressFill = progressFillRef.current;
    const progress = getProgressForIndex(index, customerTypes.length);

    activeIndexRef.current = index;
    setActiveIndex(index);

    if (!progressFill) return;

    gsap.to(progressFill, {
      scaleX: progress,
      transformOrigin: "left center",
      duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.35,
      ease: "power2.out",
      overwrite: true,
    });
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Who we serve and how we serve them"
      data-nav-logo="light"
      data-node-id="822:3941"
    >
      <div className={styles.pinClip}>
        <div ref={pinContentRef} className={styles.inner}>

          {/* ── Section header ──────────────────────────────────────────── */}
          <div className={styles.header} data-node-id="822:3942">
            <p className={styles.subtitle} data-node-id="822:3943">
              <span aria-hidden="true">-</span>
              <span>WHO WE SERVE AND HOW WE SERVE THEM</span>
              <span aria-hidden="true">-</span>
            </p>

            <div className={styles.headline} data-node-id="822:3947">
              <p className={styles.headlineLine}>We Trust The Process</p>
            </div>
          </div>

          {/* ── Body ────────────────────────────────────────────────────── */}
          <div className={styles.body} data-node-id="822:3949">

            {/* Tab row */}
            <div
              className={styles.tabList}
              role="tablist"
              aria-label="Customer type"
              data-lenis-prevent
              data-node-id="822:3952"
            >
              {customerTypes.map((ct, i) => (
                <button
                  key={ct._id}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-controls={`wws-panel-${ct._id}`}
                  id={`wws-tab-${ct._id}`}
                  className={`${styles.tab} ${i === activeIndex ? styles.tabActive : styles.tabInactive}`}
                  onClick={() => handleTabClick(i)}
                  data-node-id={i === 0 ? "822:3953" : "822:3956"}
                >
                  {ct.iconSrc && (
                    <span className={styles.tabIcon} aria-hidden="true">
                      <TabIcon src={ct.iconSrc} />
                    </span>
                  )}
                  <span className={styles.tabLabel}>{ct.label}</span>
                </button>
              ))}
            </div>

            {/* Content panels — all rendered, CSS crossfades between them */}
            <div className={styles.panels}>
              {customerTypes.map((ct, i) => (
                <div
                  key={ct._id}
                  id={`wws-panel-${ct._id}`}
                  role="tabpanel"
                  aria-labelledby={`wws-tab-${ct._id}`}
                  aria-hidden={i !== activeIndex ? "true" : undefined}
                  className={`${styles.panel} ${i === activeIndex ? styles.panelActive : styles.panelHidden}`}
                  data-node-id="822:3964"
                >
                  <TimelineCard customerType={ct} />
                  <QuoteCard customerType={ct} />
                </div>
              ))}
            </div>

          </div>

          {/* ── Progress bar ────────────────────────────────────────────── */}
          <div
            className={`${styles.progressBar} ${isStartupActive ? styles.progressBarStartup : ""}`}
            aria-hidden="true"
            data-node-id="822:4047"
          >
            <div className={styles.progressTrack}>
              <div ref={progressFillRef} className={styles.progressFill} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function TabIcon({ src }) {
  if (src.startsWith("http")) {
    return (
      <Image
        src={src}
        alt=""
        width={28}
        height={26}
        className={styles.tabIconImage}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" width={28} height={26} className={styles.tabIconImage} />
  );
}

function TimelineCard({ customerType }) {
  const { timelineImageUrl, label } = customerType;

  if (!timelineImageUrl) {
    return null;
  }

  return (
    <div className={styles.timelineCol} data-node-id="822:3965">
      <div className={styles.timelineImageWrap} data-node-id="822:3968">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={timelineImageUrl}
          alt={`Timeline for ${label}`}
          className={styles.timelineImage}
        />
      </div>
    </div>
  );
}

function useFitQuoteTypography(cardRef, contentRef, quoteText, quoteName, quoteRole) {
  useLayoutEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;
    if (!card || !content) return undefined;

    const minScale = 0.55;
    const step = 0.03;

    const fit = () => {
      card.style.setProperty("--quote-font-scale", "1");

      let scale = 1;
      while (scale > minScale && content.scrollHeight > card.clientHeight + 1) {
        scale = Math.max(minScale, scale - step);
        card.style.setProperty("--quote-font-scale", String(scale));
      }
    };

    const scheduleFit = () => {
      requestAnimationFrame(fit);
    };

    scheduleFit();

    const resizeObserver = new ResizeObserver(scheduleFit);
    resizeObserver.observe(card);

    window.addEventListener("resize", scheduleFit);
    document.fonts?.ready?.then(scheduleFit);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleFit);
    };
  }, [cardRef, contentRef, quoteText, quoteName, quoteRole]);
}

function QuoteCard({ customerType }) {
  const { quoteText, quoteName, quoteRole } = customerType;
  const cardRef = useRef(null);
  const contentRef = useRef(null);

  useFitQuoteTypography(cardRef, contentRef, quoteText, quoteName, quoteRole);

  return (
    <div ref={cardRef} className={styles.quoteCard} data-node-id="822:4039">
      <div ref={contentRef} className={styles.quoteContent}>
        <div className={styles.quoteIcon} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/who-we-serve/icon-quote.svg"
            alt=""
            width={56}
            height={56}
          />
        </div>

        <div className={styles.quoteBody} data-node-id="822:4042">
          <p className={styles.quoteText} data-node-id="822:4043">
            {quoteText}
          </p>
          <div className={styles.quoteAttribution} data-node-id="822:4044">
            <p className={styles.quoteName} data-node-id="822:4045">{quoteName}</p>
            <p className={styles.quoteRole} data-node-id="822:4046">{quoteRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
