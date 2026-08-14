"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { isReady } from "@/lib/loading-ready";

import styles from "./Hero.module.css";

const REVIEW_STAR_SRC = "/images/hero/review-star.svg";
const GOOGLE_G_SRC = "/images/hero/google-g-figma.png";
const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=Wisper+Studios";
const INSTAGRAM_ICON_SRC = "/images/hero/instagram-figma.png";
const INSTAGRAM_URL = "https://www.instagram.com/wisperstudios";
const SERVICE_SLASH_SRC = "/images/hero/service-slash.svg";

function isMotionReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Cursor-following meta popup with GSAP enter/exit (reviews, services, location).
 */
function HeroMetaPopup({ show, x, y, children }) {
  const [mounted, setMounted] = useState(false);
  const innerRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    if (show) setMounted(true);
  }, [show]);

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el || !mounted || !show) return;

    tweenRef.current?.kill();

    if (isMotionReduced()) {
      gsap.set(el, { scale: 1, opacity: 1 });
      return;
    }

    gsap.set(el, { scale: 0, opacity: 0 });
    const tl = gsap.timeline();
    tl.to(el, { opacity: 1, duration: 0.15, ease: "none" }, 0);
    tl.to(
      el,
      { scale: 1.05, duration: 0.4, ease: "elastic.out(1, 0.5)" },
      0,
    );
    tl.to(el, { scale: 1, duration: 0.1, ease: "power2.out" });
    tweenRef.current = tl;

    return () => tweenRef.current?.kill();
  }, [show, mounted]);

  useLayoutEffect(() => {
    if (show || !mounted) return;

    const el = innerRef.current;
    tweenRef.current?.kill();

    if (!el || isMotionReduced()) {
      setMounted(false);
      return;
    }

    tweenRef.current = gsap.to(el, {
      scale: 0,
      opacity: 0,
      duration: 0.12,
      ease: "power2.in",
      onComplete: () => {
        tweenRef.current = null;
        setMounted(false);
      },
    });

    return () => tweenRef.current?.kill();
  }, [show, mounted]);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={styles.heroMetaPopup}
      style={{ left: x, top: y }}
      aria-hidden
    >
      <div ref={innerRef} className={styles.heroMetaPopupInner}>
        {children}
      </div>
    </div>,
    document.body,
  );
}

const SERVICE_HOVER_CARDS = {
  brand: {
    label: "Branding",
    pillClassName: "serviceHoverPillBrand",
    nodeId: "852:542",
  },
  web: {
    label: "Websites",
    pillClassName: "serviceHoverPillWeb",
    nodeId: "852:548",
  },
  media: {
    label: "Media",
    pillClassName: "serviceHoverPillMedia",
    nodeId: "852:552",
  },
};
const STAR_SPIN_DURATION = 0.55;
const STAR_SPIN_ACCEL = 0.28;
const STAR_SPIN_DECEL = 0.85;
const STAR_SPIN_RESET = 0.45;
const HERO_VIDEO_SRC = "/images/hero/wisper-hero-background.mov";

export default function Hero() {
  return (
    <section
      className={styles.heroSection}
      aria-label="Hero"
    >
      <div className={styles.heroInner}>
        <HeroCard />
      </div>
    </section>
  );
}

function HeroCard() {
  const videoRef = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    const el = highlightRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPlayback = () => {
      const video = videoRef.current;
      if (!video) return;

      if (media.matches) {
        video.pause();
        return;
      }

      video.play().catch(() => {});
    };

    syncPlayback();
    media.addEventListener("change", syncPlayback);
    return () => media.removeEventListener("change", syncPlayback);
  }, []);

  return (
    <article
      className={styles.heroCard}
      data-nav-logo="light"
      data-node-id="804:3075"
    >
      <div className={styles.heroMediaWrap} aria-hidden>
        <video
          ref={videoRef}
          className={styles.heroVideo}
          src={HERO_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className={styles.heroMediaOverlay} />
      </div>

      <div className={styles.navSpacer} aria-hidden />

      <div className={styles.heroStack}>
        <div className={styles.headline} data-node-id="804:3078">
          <p className={styles.headlineLine} data-node-id="804:3079">
            Branding that meets you
          </p>
          <p className={styles.headlineLine}>where you are, and built for</p>
          <p className={styles.headlineSerif} data-node-id="807:3375">
            <span className={styles.headlineSerifText}>
              where you’re meant to be.
            </span>
            <span
              ref={highlightRef}
              className={styles.headlineSerifHighlight}
              aria-hidden
            />
          </p>
        </div>
      </div>

      <div className={styles.heroMeta} data-node-id="804:3092">
        <HeroReviews />
        <HeroServices />
        <HeroLocation />
      </div>
    </article>
  );
}

function HeroReviews() {
  const reviewsRowRef = useRef(null);
  const starRefs = useRef([]);
  const starSpinTweensRef = useRef([]);
  const starResetTweensRef = useRef([]);
  const starDecelTweensRef = useRef([]);
  const [searchPopup, setSearchPopup] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  const isMotionReduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const killStarResetTween = (index) => {
    starResetTweensRef.current[index]?.kill();
    starResetTweensRef.current[index] = null;
  };

  const killStarDecelTween = (index) => {
    starDecelTweensRef.current[index]?.kill();
    starDecelTweensRef.current[index] = null;
  };

  const killStarSpinTween = (index) => {
    starSpinTweensRef.current[index]?.kill();
    starSpinTweensRef.current[index] = null;
  };

  const createStarSpinTween = (index) => {
    if (isMotionReduced()) return null;

    const star = starRefs.current[index];
    if (!star) return null;

    const existingTween = starSpinTweensRef.current[index];
    if (existingTween && !existingTween.killed) {
      return existingTween;
    }

    killStarSpinTween(index);

    const spinTween = gsap.to(star, {
      rotation: "+=360",
      duration: STAR_SPIN_DURATION,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
      paused: true,
    });

    spinTween.timeScale(0);
    starSpinTweensRef.current[index] = spinTween;
    return spinTween;
  };

  const resetStarToDefault = (index) => {
    const star = starRefs.current[index];
    if (!star) return;

    killStarResetTween(index);
    killStarDecelTween(index);
    killStarSpinTween(index);

    const rotation = gsap.getProperty(star, "rotation") || 0;
    const normalized = ((rotation % 360) + 360) % 360;

    if (normalized === 0) {
      gsap.set(star, { rotation: 0 });
      return;
    }

    const delta = normalized > 180 ? 360 - normalized : -normalized;

    starResetTweensRef.current[index] = gsap.to(star, {
      rotation: rotation + delta,
      duration: STAR_SPIN_RESET,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(star, { rotation: 0 });
        starResetTweensRef.current[index] = null;
      },
    });
  };

  useLayoutEffect(() => {
    return () => {
      starSpinTweensRef.current.forEach((tween) => tween?.kill());
      starResetTweensRef.current.forEach((tween) => tween?.kill());
      starDecelTweensRef.current.forEach((tween) => tween?.kill());
      starSpinTweensRef.current = [];
      starResetTweensRef.current = [];
      starDecelTweensRef.current = [];
    };
  }, []);

  useLayoutEffect(() => {
    const row = reviewsRowRef.current;
    const container = row?.parentElement;
    if (!row || !container) return;

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const BASE_FONT_SIZE = 14;
    const BASE_STAR_SIZE = 15;
    const MIN_FONT_SIZE = 8;

    const clearReviewScale = () => {
      row.style.removeProperty("--hero-review-font-size");
      row.style.removeProperty("--hero-star-size");
    };

    const scaleRowToFit = () => {
      if (!mobileQuery.matches) {
        clearReviewScale();
        return;
      }

      row.style.setProperty("--hero-review-font-size", `${BASE_FONT_SIZE}px`);
      row.style.setProperty("--hero-star-size", `${BASE_STAR_SIZE}px`);

      const styles = window.getComputedStyle(container);
      const paddingInline =
        parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
      const available = container.clientWidth - paddingInline;
      let natural = row.scrollWidth;

      if (natural > available && available > 0) {
        const ratio = available / natural;
        const fontSize = Math.max(MIN_FONT_SIZE, BASE_FONT_SIZE * ratio);
        const starSize = Math.max(MIN_FONT_SIZE, BASE_STAR_SIZE * ratio);
        row.style.setProperty("--hero-review-font-size", `${fontSize}px`);
        row.style.setProperty("--hero-star-size", `${starSize}px`);

        natural = row.scrollWidth;
        if (natural > available) {
          const secondRatio = available / natural;
          const adjustedFont = Math.max(
            MIN_FONT_SIZE,
            fontSize * secondRatio,
          );
          const adjustedStar = Math.max(MIN_FONT_SIZE, starSize * secondRatio);
          row.style.setProperty("--hero-review-font-size", `${adjustedFont}px`);
          row.style.setProperty("--hero-star-size", `${adjustedStar}px`);
        }
      }
    };

    scaleRowToFit();

    const resizeObserver = new ResizeObserver(scaleRowToFit);
    resizeObserver.observe(container);
    resizeObserver.observe(row);
    mobileQuery.addEventListener("change", scaleRowToFit);
    window.addEventListener("resize", scaleRowToFit);

    return () => {
      resizeObserver.disconnect();
      mobileQuery.removeEventListener("change", scaleRowToFit);
      window.removeEventListener("resize", scaleRowToFit);
      clearReviewScale();
    };
  }, []);

  const accelerateStar = (index) => {
    if (isMotionReduced()) return;

    const star = starRefs.current[index];
    if (!star) return;

    killStarResetTween(index);
    killStarDecelTween(index);

    const spinTween = createStarSpinTween(index);
    if (!spinTween) return;

    spinTween.play();
    gsap.to(spinTween, {
      timeScale: 1,
      duration: STAR_SPIN_ACCEL,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const decelerateStar = (index) => {
    const star = starRefs.current[index];
    const spinTween = starSpinTweensRef.current[index];
    if (!star) return;

    killStarDecelTween(index);
    killStarResetTween(index);

    if (!spinTween || spinTween.killed) {
      resetStarToDefault(index);
      return;
    }

    starDecelTweensRef.current[index] = gsap.to(spinTween, {
      timeScale: 0,
      duration: STAR_SPIN_DECEL,
      ease: "power2.out",
      overwrite: true,
      onComplete: () => {
        starDecelTweensRef.current[index] = null;
        spinTween.pause();
        resetStarToDefault(index);
      },
    });
  };

  const showSearchPopup = () => {
    setSearchPopup((current) => ({ ...current, visible: true }));
  };

  const hideSearchPopup = () => {
    setSearchPopup((current) => ({ ...current, visible: false }));
  };

  const moveSearchPopup = (event) => {
    setSearchPopup({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div className={styles.heroReviews}>
      <div ref={reviewsRowRef} className={styles.heroReviewsRow}>
        <div className={styles.heroStarsWrap}>
          <div className={styles.heroStars} aria-hidden>
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                ref={(element) => {
                  starRefs.current[index] = element;
                }}
                className={styles.heroStarWrap}
                onMouseEnter={() => accelerateStar(index)}
                onMouseLeave={() => decelerateStar(index)}
              >
                <Image
                  src={REVIEW_STAR_SRC}
                  alt=""
                  width={15}
                  height={15}
                  className={styles.heroStar}
                />
              </span>
            ))}
          </div>
        </div>

        <p className={styles.heroReviewsText}>
          <span>(5.0) via </span>
          <a
            href={GOOGLE_REVIEWS_URL}
            className={styles.heroReviewsLink}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={showSearchPopup}
            onMouseLeave={hideSearchPopup}
            onMouseMove={moveSearchPopup}
            onFocus={showSearchPopup}
            onBlur={hideSearchPopup}
          >
            GOOGLE REVIEWS
          </a>
        </p>
      </div>

      <HeroMetaPopup
        show={searchPopup.visible}
        x={searchPopup.x}
        y={searchPopup.y}
      >
        <div className={styles.googleSearchPill} data-node-id="852:532">
          <Image
            src={GOOGLE_G_SRC}
            alt=""
            width={25}
            height={26}
            className={styles.googleSearchIcon}
          />
          <span className={styles.googleSearchQuery} data-node-id="852:527">
            &ldquo;Wisper Studios&rdquo;
          </span>
        </div>
      </HeroMetaPopup>
    </div>
  );
}

function ServiceHoverPill({ cardKey }) {
  const card = SERVICE_HOVER_CARDS[cardKey];

  return (
    <div
      className={`${styles.serviceHoverPill} ${styles[card.pillClassName]}`}
      data-node-id={card.nodeId}
    >
      <span className={styles.serviceHoverLabel}>{card.label}</span>
      <span className={styles.serviceHoverSlash} aria-hidden>
        <Image
          src={SERVICE_SLASH_SRC}
          alt=""
          width={4}
          height={26}
          className={styles.serviceHoverSlashIcon}
        />
      </span>
    </div>
  );
}

function HeroServices() {
  const [servicePopup, setServicePopup] = useState({
    visible: false,
    x: 0,
    y: 0,
    cardKey: null,
  });

  const showServicePopup = (cardKey) => () => {
    setServicePopup((current) => ({ ...current, visible: true, cardKey }));
  };

  const hideServicePopup = () => {
    setServicePopup((current) => ({ ...current, visible: false }));
  };

  const moveServicePopup = (cardKey) => (event) => {
    setServicePopup({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      cardKey,
    });
  };

  const bindServiceHover = (cardKey) => ({
    onMouseEnter: showServicePopup(cardKey),
    onMouseLeave: hideServicePopup,
    onMouseMove: moveServicePopup(cardKey),
    onFocus: showServicePopup(cardKey),
    onBlur: hideServicePopup,
  });

  return (
    <>
      <p className={styles.heroMetaCenter}>
        <Link
          href="/pricing"
          className={styles.heroMetaServiceWord}
          {...bindServiceHover("brand")}
        >
          Brand
        </Link>
        {", "}
        <Link
          href="/pricing"
          className={styles.heroMetaServiceWord}
          {...bindServiceHover("web")}
        >
          Web
        </Link>
        {", "}
        <Link
          href="/pricing"
          className={styles.heroMetaServiceWord}
          {...bindServiceHover("media")}
        >
          Media
        </Link>
      </p>

      <HeroMetaPopup
        show={servicePopup.visible}
        x={servicePopup.x}
        y={servicePopup.y}
      >
        {servicePopup.cardKey ? (
          <ServiceHoverPill cardKey={servicePopup.cardKey} />
        ) : null}
      </HeroMetaPopup>
    </>
  );
}

function HeroLocation() {
  const [instagramPopup, setInstagramPopup] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  const showInstagramPopup = () => {
    setInstagramPopup((current) => ({ ...current, visible: true }));
  };

  const hideInstagramPopup = () => {
    setInstagramPopup((current) => ({ ...current, visible: false }));
  };

  const moveInstagramPopup = (event) => {
    setInstagramPopup({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <>
      <div className={styles.heroMetaRight}>
        <a
          href={INSTAGRAM_URL}
          className={`${styles.heroMetaLink} ${styles.heroMetaLocationLink}`}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={showInstagramPopup}
          onMouseLeave={hideInstagramPopup}
          onMouseMove={moveInstagramPopup}
          onFocus={showInstagramPopup}
          onBlur={hideInstagramPopup}
        >
          Based in San Diego
        </a>
        <a
          href={INSTAGRAM_URL}
          className={styles.heroMetaInstagramLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Wisper Studios on Instagram"
          onMouseEnter={showInstagramPopup}
          onMouseLeave={hideInstagramPopup}
          onMouseMove={moveInstagramPopup}
          onFocus={showInstagramPopup}
          onBlur={hideInstagramPopup}
        >
          <span className={styles.heroMetaInstagramIcon} aria-hidden />
        </a>
      </div>

      <HeroMetaPopup
        show={instagramPopup.visible}
        x={instagramPopup.x}
        y={instagramPopup.y}
      >
        <div className={styles.instagramHoverPill} data-node-id="852:533">
          <Image
            src={INSTAGRAM_ICON_SRC}
            alt=""
            width={25}
            height={25}
            className={styles.instagramHoverIcon}
          />
          <span className={styles.instagramHoverHandle} data-node-id="852:536">
            @wisperstudios
          </span>
        </div>
      </HeroMetaPopup>
    </>
  );
}
