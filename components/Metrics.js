"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { isReady } from "@/lib/loading-ready";

import styles from "./Metrics.module.css";

const METRICS = [
  {
    value: "20",
    label: (
      <>
        Founders We&rsquo;ve
        <br />
        Built With
      </>
    ),
  },
  {
    value: "10M",
    label: "Total Following from our clients",
    labelClassName: styles.labelMid,
  },
  {
    value: "4-8",
    label: "Weeks Until Launch For Websites",
    labelClassName: styles.labelWide,
  },
];

const METRICS_DESKTOP_BASE_HEIGHT = "20vh";
const METRICS_MOBILE_BASE_HEIGHT = "288px";
const METRICS_DESKTOP_EXPANDED_HEIGHT = "280px";
const METRICS_MOBILE_EXPANDED_HEIGHT = "360px";
const METRICS_MOBILE_QUERY = "(max-width: 767px)";
const METRICS_DESKTOP_QUERY = "(min-width: 768px)";
const DIGITS = Array.from({ length: 10 }, (_, index) => String(index));
const DIGIT_REEL_LOOPS = 2;
const METRIC_DIGIT_DELAY_AFTER_READY = 0.45;
const METRIC_DIGIT_DELAY_ON_VIEW = 0.12;

function buildDigitReel(finalDigit, loops) {
  const finalDigitIndex = Number(finalDigit);
  const reel = [];

  for (let loop = 0; loop < loops; loop += 1) {
    reel.push(...DIGITS);
  }

  reel.push(...DIGITS.slice(0, finalDigitIndex + 1));

  return reel;
}

function MetricValue({ value }) {
  return (
    <dt className={styles.value} aria-label={value}>
      {Array.from(value).map((char, index) => {
        const isDigit = /\d/.test(char);
        const digitReel = isDigit
          ? buildDigitReel(char, DIGIT_REEL_LOOPS + index)
          : [];

        return (
          <span
            key={`${char}-${index}`}
            className={isDigit ? styles.valueDigit : styles.valueStatic}
            aria-hidden="true"
          >
            {isDigit ? (
              <span
                className={styles.valueDigitTrack}
                data-slot-end={digitReel.length - 1}
              >
                {digitReel.map((digit, reelIndex) => (
                  <span
                    className={styles.valueDigitCell}
                    key={`${char}-${index}-${reelIndex}`}
                  >
                    {digit}
                  </span>
                ))}
              </span>
            ) : (
              char
            )}
          </span>
        );
      })}
    </dt>
  );
}

export default function Metrics() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const digitTracks = gsap.utils.toArray(`.${styles.valueDigitTrack}`, section);
    const setTrackIndex = (track, slotIndex) => {
      track.style.setProperty("--slot-index", slotIndex);
    };
    const setDigitsToFinal = () => {
      digitTracks.forEach((track) => {
        setTrackIndex(track, Number(track.dataset.slotEnd ?? 0));
      });
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDigitsToFinal();
      gsap.set(section, {
        height: window.matchMedia(METRICS_MOBILE_QUERY).matches
          ? METRICS_MOBILE_EXPANDED_HEIGHT
          : METRICS_DESKTOP_EXPANDED_HEIGHT,
      });
      return;
    }

    const mm = gsap.matchMedia();
    const digitTweens = [];
    let hasAnimatedDigits = false;
    let digitObserver;
    let isMetricsVisible = false;
    let delayedDigitStartId;
    let isWaitingForReady = false;

    digitTracks.forEach((track) => {
      setTrackIndex(track, 0);
    });

    const animateMetricDigits = () => {
      if (hasAnimatedDigits) return;
      hasAnimatedDigits = true;

      digitTracks.forEach((track, index) => {
        const slotEnd = Number(track.dataset.slotEnd ?? 0);
        const slot = { index: 0 };

        const tween = gsap.to(slot, {
          index: slotEnd,
          duration: 0.95 + index * 0.08,
          delay: index * 0.06,
          ease: "power4.out",
          onUpdate: () => {
            setTrackIndex(track, slot.index);
          },
          onComplete: () => {
            setTrackIndex(track, slotEnd);
          },
        });

        digitTweens.push(tween);
      });
    };

    const queueMetricDigits = (delay) => {
      if (hasAnimatedDigits || delayedDigitStartId || !isMetricsVisible) return;

      delayedDigitStartId = window.setTimeout(() => {
        delayedDigitStartId = undefined;

        if (!isMetricsVisible) return;
        animateMetricDigits();
      }, delay * 1000);
    };

    const handleSiteReady = () => {
      isWaitingForReady = false;
      queueMetricDigits(METRIC_DIGIT_DELAY_AFTER_READY);
    };

    const maybeQueueMetricDigits = () => {
      if (!isMetricsVisible || hasAnimatedDigits) return;

      if (isReady()) {
        queueMetricDigits(METRIC_DIGIT_DELAY_ON_VIEW);
        return;
      }

      if (isWaitingForReady) return;
      isWaitingForReady = true;
      window.addEventListener("wisper:ready", handleSiteReady, { once: true });
    };

    const createHeightScrub = (baseHeight, expandedHeight) => {
      gsap.fromTo(
        section,
        { height: baseHeight },
        {
          height: expandedHeight,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    };

    const ctx = gsap.context(() => {
      mm.add(METRICS_MOBILE_QUERY, () => {
        createHeightScrub(
          METRICS_MOBILE_BASE_HEIGHT,
          METRICS_MOBILE_EXPANDED_HEIGHT,
        );
      });

      mm.add(METRICS_DESKTOP_QUERY, () => {
        createHeightScrub(
          METRICS_DESKTOP_BASE_HEIGHT,
          METRICS_DESKTOP_EXPANDED_HEIGHT,
        );
      });
    }, section);

    digitObserver = new IntersectionObserver(
      ([entry]) => {
        isMetricsVisible = entry.isIntersecting;

        if (entry.isIntersecting) {
          maybeQueueMetricDigits();
        }
      },
      { threshold: 0.35 },
    );
    digitObserver.observe(section);

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("wisper:ready", handleSiteReady);
      if (delayedDigitStartId) {
        window.clearTimeout(delayedDigitStartId);
      }
      digitObserver?.disconnect();
      digitTweens.forEach((tween) => tween.kill());
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Metrics"
      data-nav-logo="navy"
    >
      <div className={styles.inner}>
        <dl className={styles.list}>
          {METRICS.map((metric) => (
            <div className={styles.item} key={metric.value}>
              <MetricValue value={metric.value} />
              <dd className={`${styles.label} ${metric.labelClassName ?? ""}`}>
                {metric.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
