/**
 * BuildingInProgress — Figma 907:538 (Wisper Refresh 2026)
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import blobStyles from "@/lib/orange-button-blob.module.css";

import styles from "./BuildingInProgress.module.css";

const VIDEO_SRC = "/images/work/fieldsvideo.mov";
const CTA_ARROW_SRC = "/images/hero/cta-arrow.svg";
const DEFAULT_STATUS_TEXT = "Page build in progress...";

export default function BuildingInProgress({ statusText = DEFAULT_STATUS_TEXT }) {
  const videoRef = useRef(null);

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
    <section
      className={styles.section}
      aria-label="Building in progress"
      data-nav-logo="light"
      data-node-id="907:538"
    >
      <div className={styles.media} aria-hidden="true">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          className={styles.video}
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.center}>
        <Link
          href="/"
          className={`${styles.homeBtn} ${blobStyles.blobBtn}`}
          data-node-id="907:582"
        >
          <span className={styles.homeBtnIcon} aria-hidden="true">
            <Image
              src={CTA_ARROW_SRC}
              alt=""
              width={9}
              height={9}
              className={styles.homeBtnIconImage}
            />
          </span>
          <span className={styles.homeBtnLabel}>Go Home</span>
        </Link>
      </div>

      <p className={styles.status} data-node-id="907:577">
        {statusText}
      </p>
    </section>
  );
}
