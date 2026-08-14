"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";

import TypeformPopupButton from "@/components/TypeformPopupButton";
import blobStyles from "@/lib/orange-button-blob.module.css";

import styles from "./Partners.module.css";


const PARTNERS_CONTENT_Y_OFFSET = -200;
const PARTNERS_CONTENT_DURATION = 0.4;
const PARTNERS_CONTENT_EASE = "elastic.out(1, 0.8)";
const PARTNERS_DESKTOP_PIN_DISTANCE = "+=85%";
const PARTNERS_MOBILE_PIN_DISTANCE = "+=70%";
const PARTNERS_PIN_SCRUB = 1.5;
const PARTNERS_PIN_CUE_DURATION = 0.3;
const PARTNERS_PIN_CUE_EASE = "power2.out";

const PARTNER_SLOTS = [
  {
    id: "partner-1",
    nodeId: "815:2003",
    borderClassName: styles.cardYellow,
    imageSrc: "/images/partners/unusual-group-logo.png",
    imageAlt: "Unusual Group",
  },
  {
    id: "partner-2",
    nodeId: "815:2005",
    borderClassName: styles.cardOrange,
    imageSrc: "/images/partners/shipnomad-logo.svg",
    imageAlt: "ShipNomad",
  },
  {
    id: "partner-3",
    nodeId: "815:2007",
    borderClassName: styles.cardBlue,
    imageSrc: "/images/partners/solara-logo.avif",
    imageAlt: "Solara",
  },
  {
    id: "partner-4",
    nodeId: "815:2012",
    borderClassName: styles.cardGreen,
    imageSrc: "/images/partners/aframe-logo.svg",
    imageAlt: "A-Frame Venture Studio",
  },
  {
    id: "partner-5",
    nodeId: "815:2014",
    borderClassName: styles.cardCotton,
    imageSrc: "/images/partners/ucsd-health-logo.png",
    imageAlt: "UC San Diego Health",
  },
  {
    id: "partner-6",
    nodeId: "815:2034",
    borderClassName: styles.cardPink,
    imageSrc: "/images/partners/wiles-logo.png",
    imageAlt: "Wiles",
  },
];

export default function Partners() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const raceRef = useRef(null);
  const worldBarRef = useRef(null);
  const youUsBarRef = useRef(null);
  const mmRef = useRef(null);

  useLayoutEffect(() => {
    return () => {
      mmRef.current?.revert();
    };
  }, []);

  /* ─── GSAP race scroll-hack ─────────────────────────────────────────── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const worldBar = worldBarRef.current;
    const youUsBar = youUsBarRef.current;

    if (!section || !worldBar || !youUsBar) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set(worldBar, { width: "50%" });
      gsap.set(youUsBar, { width: "100%" });
      return;
    }

    // Start both bars with enough width that the label is always readable.
    gsap.set(worldBar, { width: "22%" });
    gsap.set(youUsBar, { width: "16%" });

    const mm = gsap.matchMedia();
    mmRef.current = mm;

    const animatePinIn = () => {
      gsap.killTweensOf(section, "opacity,scale");
      gsap.timeline().fromTo(
        section,
        { opacity: 0.8, scale: 0.98, transformOrigin: "center center" },
        {
          opacity: 1,
          scale: 1,
          duration: PARTNERS_PIN_CUE_DURATION,
          ease: PARTNERS_PIN_CUE_EASE,
          overwrite: "auto",
        }
      );
    };

    const animatePinOut = () => {
      gsap.killTweensOf(section, "opacity,scale");
      gsap.timeline().to(section, {
        opacity: 0.8,
        scale: 0.98,
        duration: PARTNERS_PIN_CUE_DURATION,
        ease: PARTNERS_PIN_CUE_EASE,
        overwrite: "auto",
      });
    };

    const resetPinCue = () => {
      gsap.killTweensOf(section, "opacity,scale");
      gsap.set(section, { opacity: 1, scale: 1 });
    };

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: PARTNERS_DESKTOP_PIN_DISTANCE,
          pin: true,
          pinSpacing: true,
          scrub: PARTNERS_PIN_SCRUB,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: animatePinIn,
          onEnterBack: animatePinIn,
          onLeave: animatePinOut,
          onLeaveBack: animatePinOut,
        },
      });

      // The world stops halfway while YOU+US keeps moving to the finish.
      tl.to(worldBar, { width: "50%", duration: 0.32, ease: "power2.out" }, 0);
      tl.to(youUsBar, { width: "100%", duration: 1, ease: "power2.out" }, 0.08);

      return () => {
        tl.scrollTrigger?.kill(true);
        resetPinCue();
      };
    });

    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: PARTNERS_MOBILE_PIN_DISTANCE,
          pin: true,
          pinSpacing: true,
          scrub: PARTNERS_PIN_SCRUB,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: animatePinIn,
          onEnterBack: animatePinIn,
          onLeave: animatePinOut,
          onLeaveBack: animatePinOut,
        },
      });

      gsap.set(worldBar, { width: "26%" });
      gsap.set(youUsBar, { width: "20%" });

      tl.to(worldBar, { width: "50%", duration: 0.34, ease: "power2.out" }, 0);
      tl.to(youUsBar, { width: "100%", duration: 1, ease: "power2.out" }, 0.08);

      return () => {
        tl.scrollTrigger?.kill(true);
        resetPinCue();
      };
    });

    return () => {
      mm.revert();
      resetPinCue();
      mmRef.current = null;
    };
  }, []);

  /* ─── GSAP enter animation ──────────────────────────────────────────── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set(content, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top center",
          toggleActions: "play reverse play reverse",
        },
      }).fromTo(
        content,
        { opacity: 0, y: PARTNERS_CONTENT_Y_OFFSET },
        {
          opacity: 1,
          y: 0,
          duration: PARTNERS_CONTENT_DURATION,
          ease: PARTNERS_CONTENT_EASE,
          overwrite: true,
        }
      );
    }, section);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className={styles.pinWrapper}>
      <section
        ref={sectionRef}
        className={styles.section}
        aria-label="Partners and positioning"
        data-nav-logo="navy"
        data-node-id="815:1990"
      >
        <div className={styles.grid} aria-hidden="true" />

        <div className={styles.inner}>
          <div ref={contentRef} className={styles.contentGroup}>
            <header className={styles.header} data-node-id="815:1991">
              <p className={styles.subtitle} data-node-id="815:1992">
                <span aria-hidden="true">-</span>
                <span>OUR PARTNERS</span>
                <span aria-hidden="true">-</span>
              </p>

              <div className={styles.headline} data-node-id="815:1996">
                <p className={styles.headlineLine}>The world moves fast.</p>
                <p className={styles.headlineLine}>
                  We help you Move{" "}
                  <span className={styles.headlineSerif}>Faster</span>.
                </p>
              </div>

              <p className={styles.body} data-node-id="815:1997">
                We&apos;ve partnered with brands across industries to innovate,
                convert, and create. Lean team, expansive network.
              </p>

              <TypeformPopupButton
                className={`${styles.cta} ${blobStyles.blobBtn}`}
                data-node-id="815:1998"
              >
                <span className={styles.ctaLabel}>Let&apos;s Get To Work</span>
                <CtaArrowIcon />
              </TypeformPopupButton>
            </header>

            <div
              className={styles.logoGrid}
              aria-label="Partner logos"
              data-node-id="815:2001"
            >
              <ul className={styles.logoRow} data-node-id="815:2002">
                {PARTNER_SLOTS.slice(0, 3).map((slot) => (
                  <li key={slot.id}>
                    <PartnerCard slot={slot} />
                  </li>
                ))}
              </ul>
              <ul className={`${styles.logoRow} ${styles.logoRowBottom}`} data-node-id="815:2011">
                {PARTNER_SLOTS.slice(3).map((slot) => (
                  <li key={slot.id}>
                    <PartnerCard slot={slot} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            ref={raceRef}
            className={styles.race}
            aria-label="Positioning comparison"
            data-node-id="815:2036"
          >
            <div className={styles.raceTrack} role="progressbar" aria-label="The World" data-node-id="815:2037">
              <div ref={worldBarRef} className={`${styles.raceBarFill} ${styles.fillWorld}`} />
              <span className={styles.raceBarLabel}>THE WORLD</span>
            </div>
            <div className={styles.raceTrack} role="progressbar" aria-label="You and Us" data-node-id="815:2039">
              <div ref={youUsBarRef} className={`${styles.raceBarFill} ${styles.fillYouUs}`} />
              <span className={styles.raceBarLabel}>YOU + US</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PartnerCard({ slot }) {
  return (
    <article
      className={`${styles.logoCard} ${slot.borderClassName ?? ""}`}
      data-node-id={slot.nodeId}
    >
      <div className={styles.logoImageWrap}>
        <Image
          src={slot.imageSrc}
          alt={slot.imageAlt}
          fill
          className={styles.logoImage}
          sizes="132px"
        />
      </div>
    </article>
  );
}

function CtaArrowIcon() {
  return (
    <svg
      className={styles.ctaArrow}
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8.25026 1.50256C8.05141 1.50256 7.86071 1.58155 7.72011 1.72215C7.5795 1.86276 7.50051 2.05346 7.50051 2.2523V6.44337L1.28513 0.220494C1.14395 0.079314 0.95247 0 0.752812 0C0.553154 0 0.361673 0.079314 0.220494 0.220494C0.079314 0.361673 0 0.553154 0 0.752812C0 0.95247 0.079314 1.14395 0.220494 1.28513L6.44337 7.50051H2.2523C2.05346 7.50051 1.86276 7.5795 1.72215 7.72011C1.58155 7.86071 1.50256 8.05141 1.50256 8.25026C1.50256 8.4491 1.58155 8.6398 1.72215 8.78041C1.86276 8.92101 2.05346 9 2.2523 9H8.25026C8.4491 9 8.6398 8.92101 8.78041 8.78041C8.92101 8.6398 9 8.4491 9 8.25026V2.2523C9 2.05346 8.92101 1.86276 8.78041 1.72215C8.6398 1.58155 8.4491 1.50256 8.25026 1.50256Z"
        fill="currentColor"
      />
    </svg>
  );
}
