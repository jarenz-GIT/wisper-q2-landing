"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { site } from "@/lib/site";

import { IconLock } from "./icons";
import styles from "./LandingPage.module.css";

function VideoOverlay({ item, onClose }) {
  const closeDesktopRef = useRef(null);
  const closeMobileRef = useRef(null);
  const titleId = useId();
  const [frameLoaded, setFrameLoaded] = useState(false);
  const roles = item.roles ?? [];

  useEffect(() => {
    setFrameLoaded(false);
  }, [item?.embedUrl]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    (mobile ? closeMobileRef : closeDesktopRef).current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  if (!item?.embedUrl) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.overlayStack}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={styles.overlayDialog}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <button
            ref={closeDesktopRef}
            type="button"
            className={styles.overlayClose}
            onClick={onClose}
          >
            CLOSE
          </button>
          <div className={styles.overlayBody}>
            <div className={styles.overlayFrame}>
              {frameLoaded ? null : (
                <div className={styles.overlayLoader} aria-hidden="true">
                  <div className={styles.overlayLoaderBar} />
                </div>
              )}
              <iframe
                key={item.embedUrl}
                src={item.embedUrl}
                title={item.title}
                allow="encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
                onLoad={() => setFrameLoaded(true)}
              />
            </div>
            <div className={styles.overlayMeta}>
              <h3 id={titleId} className={styles.overlayTitle}>
                {item.title}
              </h3>
              {roles.length ? (
                <p className={styles.overlayDirector}>
                  <span className={styles.overlayRolesDesktop}>
                    [{roles.join(", ")}]
                  </span>
                  <span className={styles.overlayRolesMobile}>
                    {roles.map((role) => (
                      <span key={role} className={styles.overlayRole}>
                        [{role}]
                      </span>
                    ))}
                  </span>
                </p>
              ) : null}
              {item.description ? (
                <p className={styles.overlayDescription}>{item.description}</p>
              ) : null}
            </div>
          </div>
        </div>
        <button
          ref={closeMobileRef}
          type="button"
          className={styles.overlayCloseMobile}
          onClick={onClose}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}

const MOBILE_QUERY = "(max-width: 767px)";
const SNAP_DURATION_MS = 420;
const SWIPE_DISTANCE_RATIO = 0.18;
const SWIPE_VELOCITY = 0.35;

function isMobileCarousel() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function cardScrollLeft(scroller, card) {
  return (
    scroller.scrollLeft +
    (card.getBoundingClientRect().left - scroller.getBoundingClientRect().left)
  );
}

export default function FeaturedLaunches() {
  const scrollerRef = useRef(null);
  const thumbRef = useRef(null);
  const progressRef = useRef(null);
  const indexRef = useRef(0);
  const wheelLockRef = useRef(false);
  const pointerRef = useRef({
    active: false,
    startX: 0,
    startLeft: 0,
    startTime: 0,
    moved: false,
  });
  const [activeSlug, setActiveSlug] = useState(null);
  const activeItem = site.featured.items.find((item) => item.slug === activeSlug);

  const openItem = useCallback((item) => {
    if (!item.embedUrl) return;
    if (pointerRef.current.moved) return;
    setActiveSlug(item.slug);
  }, []);

  const close = useCallback(() => setActiveSlug(null), []);

  const updateProgress = useCallback(() => {
    const scroller = scrollerRef.current;
    const thumb = thumbRef.current;
    const progress = progressRef.current;
    if (!scroller || !thumb) return;

    const max = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    const trackWidth = thumb.parentElement?.clientWidth ?? scroller.clientWidth;
    const thumbWidth =
      scroller.scrollWidth > 0
        ? Math.max(40, (scroller.clientWidth / scroller.scrollWidth) * trackWidth)
        : trackWidth;
    const left = max > 0 ? (scroller.scrollLeft / max) * (trackWidth - thumbWidth) : 0;

    thumb.style.width = `${thumbWidth}px`;
    thumb.style.transform = `translateX(${left}px)`;
    if (progress) {
      progress.setAttribute("aria-valuemax", String(Math.round(max)));
      progress.setAttribute("aria-valuenow", String(Math.round(scroller.scrollLeft)));
    }
  }, []);

  const snapTo = useCallback(
    (index, behavior = "smooth") => {
      const scroller = scrollerRef.current;
      if (!scroller || isMobileCarousel()) return;

      const cards = Array.from(scroller.children);
      if (!cards.length) return;

      const clamped = Math.max(0, Math.min(index, cards.length - 1));
      indexRef.current = clamped;
      const motion = prefersReducedMotion() ? "auto" : behavior;
      scroller.scrollTo({
        left: cardScrollLeft(scroller, cards[clamped]),
        behavior: motion,
      });
      window.requestAnimationFrame(updateProgress);
    },
    [updateProgress],
  );

  const nearestIndex = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return 0;

    const cards = Array.from(scroller.children);
    const left = scroller.scrollLeft;
    let best = 0;
    let bestDist = Infinity;

    cards.forEach((card, index) => {
      const dist = Math.abs(cardScrollLeft(scroller, card) - left);
      if (dist < bestDist) {
        bestDist = dist;
        best = index;
      }
    });

    return best;
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    let scrollEndTimer = 0;

    const lockToNearest = () => {
      if (pointerRef.current.active || isMobileCarousel()) return;
      snapTo(nearestIndex());
    };

    const onScroll = () => {
      updateProgress();
      window.clearTimeout(scrollEndTimer);
      if (pointerRef.current.active || wheelLockRef.current) return;
      scrollEndTimer = window.setTimeout(lockToNearest, 80);
    };

    const onWheel = (event) => {
      if (isMobileCarousel()) return;

      const dominantX = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      if (!dominantX && !event.shiftKey) return;

      const delta = event.shiftKey ? event.deltaY : event.deltaX;
      if (Math.abs(delta) < 6) return;

      event.preventDefault();
      if (wheelLockRef.current) return;

      wheelLockRef.current = true;
      snapTo(indexRef.current + (delta > 0 ? 1 : -1));
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, SNAP_DURATION_MS);
    };

    const onPointerDown = (event) => {
      if (isMobileCarousel() || event.pointerType === "mouse") return;
      if (event.target.closest(`.${styles.launchProgress}`)) return;

      scroller.setPointerCapture(event.pointerId);
      scroller.style.scrollSnapType = "none";
      pointerRef.current = {
        active: true,
        startX: event.clientX,
        startLeft: scroller.scrollLeft,
        startTime: performance.now(),
        moved: false,
      };
    };

    const onPointerMove = (event) => {
      const pointer = pointerRef.current;
      if (!pointer.active) return;
      const dx = event.clientX - pointer.startX;
      if (Math.abs(dx) > 8) pointer.moved = true;
      scroller.scrollLeft = pointer.startLeft - dx;
    };

    const onPointerUp = (event) => {
      const pointer = pointerRef.current;
      if (!pointer.active) return;
      pointer.active = false;
      scroller.style.scrollSnapType = "";

      const cards = Array.from(scroller.children);
      const cardWidth = cards[0]?.getBoundingClientRect().width ?? scroller.clientWidth;
      const dx = pointer.startX - event.clientX;
      const dt = Math.max(1, performance.now() - pointer.startTime);
      const velocity = dx / dt;
      const current = indexRef.current;

      let next = current;
      if (dx > cardWidth * SWIPE_DISTANCE_RATIO || velocity > SWIPE_VELOCITY) {
        next = current + 1;
      } else if (dx < -cardWidth * SWIPE_DISTANCE_RATIO || velocity < -SWIPE_VELOCITY) {
        next = current - 1;
      }

      snapTo(next);
      window.setTimeout(() => {
        pointerRef.current.moved = false;
      }, 40);
    };

    const onKeyDown = (event) => {
      if (isMobileCarousel()) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        snapTo(indexRef.current + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        snapTo(indexRef.current - 1);
      }
    };

    const onResize = () => {
      updateProgress();
      if (!isMobileCarousel()) snapTo(indexRef.current, "auto");
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("wheel", onWheel, { passive: false });
    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("pointermove", onPointerMove);
    scroller.addEventListener("pointerup", onPointerUp);
    scroller.addEventListener("pointercancel", onPointerUp);
    scroller.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    updateProgress();

    return () => {
      window.clearTimeout(scrollEndTimer);
      scroller.style.scrollSnapType = "";
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("pointermove", onPointerMove);
      scroller.removeEventListener("pointerup", onPointerUp);
      scroller.removeEventListener("pointercancel", onPointerUp);
      scroller.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [nearestIndex, snapTo, updateProgress]);

  const onProgressPointerDown = (event) => {
    const scroller = scrollerRef.current;
    const track = event.currentTarget;
    if (!scroller || isMobileCarousel()) return;

    event.stopPropagation();
    scroller.style.scrollSnapType = "none";

    const seek = (clientX) => {
      const rect = track.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const max = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
      scroller.scrollLeft = ratio * max;
      updateProgress();
    };

    seek(event.clientX);
    const pointerId = event.pointerId;
    track.setPointerCapture(pointerId);

    const onMove = (moveEvent) => seek(moveEvent.clientX);
    const onUp = () => {
      scroller.style.scrollSnapType = "";
      track.releasePointerCapture(pointerId);
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", onUp);
      snapTo(nearestIndex());
    };

    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", onUp);
  };

  return (
    <section
      id="featured"
      className={styles.featured}
      aria-labelledby="featured-heading"
    >
      <div className={styles.featuredHead}>
        <h2 id="featured-heading" className={styles.sectionTitle}>
          {site.featured.title}
        </h2>
        <a
          href={site.links.linkedinDm}
          className={styles.lockNote}
          target="_blank"
          rel="noreferrer"
        >
          <IconLock className={styles.lockIcon} />
          {site.featured.lockNote}
        </a>
      </div>

      <div className={styles.launchCarousel} data-lenis-prevent>
        <ul
          ref={scrollerRef}
          id="featured-launches"
          className={styles.launchScroller}
          tabIndex={0}
          aria-label="Featured launches"
        >
          {site.featured.items.map((item) => (
            <li key={item.slug} className={styles.launchCard}>
              {item.placeholder ? (
                <div className={styles.placeholderCard}>
                  <IconLock className={styles.lockIcon} />
                  <span>{item.title}</span>
                </div>
              ) : (
                <button
                  type="button"
                  className={styles.launchButton}
                  onClick={() => openItem(item)}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="432px"
                    className={styles.launchImage}
                  />
                  <span className={styles.srOnly}>Play {item.title}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
        <div
          ref={progressRef}
          className={styles.launchProgress}
          role="scrollbar"
          aria-controls="featured-launches"
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={0}
          aria-valuenow={0}
          aria-label="Featured launches position"
          onPointerDown={onProgressPointerDown}
        >
          <div className={styles.launchProgressTrack}>
            <div ref={thumbRef} className={styles.launchProgressThumb} />
          </div>
        </div>
      </div>

      {activeItem ? <VideoOverlay item={activeItem} onClose={close} /> : null}
    </section>
  );
}
