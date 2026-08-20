"use client";

import { useEffect, useRef, useState } from "react";

import { site } from "@/lib/site";

import styles from "./LandingPage.module.css";

export default function HeroReel() {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      setReady(true);
    }
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

  const markReady = () => setReady(true);

  return (
    <section className={styles.heroReel} aria-label="Showreel">
      {ready ? null : (
        <div className={styles.overlayLoader} aria-hidden="true">
          <div className={styles.overlayLoaderBar} />
        </div>
      )}
      <video
        ref={videoRef}
        className={styles.heroReelVideo}
        src={site.hero.reelSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={markReady}
        onPlaying={markReady}
        onError={markReady}
      />
      <div className={styles.heroReelShade} aria-hidden="true" />
      <div className={styles.heroReelMeta}>
        <p className={styles.heroReelLabel}>{site.hero.reelLabel}</p>
        <p className={styles.heroReelLabelDesktop}>{site.hero.reelCities}</p>
        <p className={styles.heroReelLabelDesktop}>{site.hero.reelWorldwide}</p>
      </div>
    </section>
  );
}
