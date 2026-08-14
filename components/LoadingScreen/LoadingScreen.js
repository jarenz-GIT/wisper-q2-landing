"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

import { signalReady } from "@/lib/loading-ready";

import styles from "./LoadingScreen.module.css";

const BLANK_HOLD_DURATION = 0.3;
const WORDMARK_ENTER_Y = 28;
const TAGLINE_ENTER_Y = -28;
const ENTER_DURATION = 0.7;
const READ_HOLD_DURATION = 0.3;
const SPLIT_DURATION = 0.7;
const SAFETY_TIMEOUT_MS = 6000;
const SPLIT_TEXT_OFFSET = "50vh";

export default function LoadingScreen() {
  const [isComplete, setIsComplete] = useState(false);
  const screenRef = useRef(null);
  const contentRef = useRef(null);
  const wordmarkRef = useRef(null);
  const taglineRef = useRef(null);
  const panelTopRef = useRef(null);
  const panelBottomRef = useRef(null);

  useEffect(() => {
    const screen = screenRef.current;
    const content = contentRef.current;
    const wordmark = wordmarkRef.current;
    const tagline = taglineRef.current;
    const panelTop = panelTopRef.current;
    const panelBottom = panelBottomRef.current;

    if (!screen || !content || !wordmark || !tagline || !panelTop || !panelBottom) {
      return undefined;
    }

    let isFinished = false;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const finish = () => {
      if (isFinished) return;
      isFinished = true;
      document.body.style.overflow = previousOverflow;
      signalReady();
      setIsComplete(true);
    };

    const safetyTimeoutId = window.setTimeout(finish, SAFETY_TIMEOUT_MS);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      window.clearTimeout(safetyTimeoutId);
      finish(); // also calls signalReady()
      return undefined;
    }

    gsap.set(wordmark, { autoAlpha: 0, y: WORDMARK_ENTER_Y });
    gsap.set(tagline, { autoAlpha: 0, y: TAGLINE_ENTER_Y });
    gsap.set(panelTop, { yPercent: 0 });
    gsap.set(panelBottom, { yPercent: 0 });

    const timeline = gsap.timeline({
      onComplete: () => {
        window.clearTimeout(safetyTimeoutId);
        finish();
      },
    });

    timeline
      .to({}, { duration: BLANK_HOLD_DURATION })
      .to(wordmark, {
        autoAlpha: 1,
        y: 0,
        duration: ENTER_DURATION,
        ease: "power3.out",
      })
      .to(
        tagline,
        {
          autoAlpha: 1,
          y: 0,
          duration: ENTER_DURATION,
          ease: "power3.out",
        },
        "<",
      )
      .to({}, { duration: READ_HOLD_DURATION })
      .to(
        panelTop,
        {
          yPercent: -100,
          duration: SPLIT_DURATION,
          ease: "power3.inOut",
        },
        "split",
      )
      .to(
        panelBottom,
        {
          yPercent: 100,
          duration: SPLIT_DURATION,
          ease: "power3.inOut",
        },
        "<",
      )
      .to(
        wordmark,
        {
          y: `-${SPLIT_TEXT_OFFSET}`,
          duration: SPLIT_DURATION,
          ease: "power3.inOut",
        },
        "split",
      )
      .to(
        tagline,
        {
          y: SPLIT_TEXT_OFFSET,
          duration: SPLIT_DURATION,
          ease: "power3.inOut",
        },
        "split",
      );

    return () => {
      window.clearTimeout(safetyTimeoutId);
      timeline.kill();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (isComplete) {
    return null;
  }

  return (
    <div
      ref={screenRef}
      className={styles.screen}
      aria-hidden="true"
      data-node-id="872:1789"
    >
      <div ref={panelTopRef} className={styles.panelTop} />
      <div ref={panelBottomRef} className={styles.panelBottom} />

      <div ref={contentRef} className={styles.content}>
        <p ref={wordmarkRef} className={styles.wordmark} data-node-id="872:1793">
          Wisper Studios
        </p>
        <p ref={taglineRef} className={styles.tagline} data-node-id="872:1794">
          For Brands Built to{" "}
          <span className={styles.taglineSerif}>Mean Something</span>
        </p>
      </div>
    </div>
  );
}
