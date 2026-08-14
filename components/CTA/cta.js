/**
 * CTA — Figma frame 838:609 "CTA Section" (Wisper Refresh 2026)
 *
 * Static UI:
 *   Ivory section wrapper
 *   Full-width card with background photo + dark overlay
 *   Serif italic headline, sans body copy, orange CTA button
 */

"use client";

import Image from "next/image";

import TypeformPopupButton from "@/components/TypeformPopupButton";
import blobStyles from "@/lib/orange-button-blob.module.css";

import styles from "./cta.module.css";

const BG_SRC = "/images/cta/cta-background-image.png";
const CTA_ARROW_SRC = "/images/hero/cta-arrow.svg";

export default function CTA() {
  return (
    <section
      className={styles.section}
      aria-label="Call to action"
      data-nav-logo="navy"
      data-node-id="838:609"
    >
      <div className={styles.inner}>
        <div className={styles.card} data-nav-logo="light" data-node-id="838:610">
          <div className={styles.media} aria-hidden="true" data-node-id="838:611">
            <Image
              src={BG_SRC}
              alt=""
              fill
              className={styles.mediaImage}
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 90vw, 1178px"
            />
            <div className={styles.mediaOverlay} />
          </div>

          <div className={styles.content} data-node-id="838:612">
            <div className={styles.text} data-node-id="838:613">
              <h2 className={styles.headline} data-node-id="838:614">
                Let&apos;s Connect and
                <br />
                Cut To The Chase.
              </h2>
              <p className={styles.body} data-node-id="838:615">
                Book a chat with us, and we&apos;ll guide you through how to scale while staying
                true to your values.
              </p>
            </div>

            <TypeformPopupButton
              className={`${styles.cta} ${blobStyles.blobBtn}`}
              data-node-id="838:616"
            >
              <span className={styles.ctaLabel} data-node-id="838:617">
                I&apos;M READY
              </span>
              <Image
                src={CTA_ARROW_SRC}
                alt=""
                width={9}
                height={9}
                className={styles.ctaArrow}
                aria-hidden
              />
            </TypeformPopupButton>
          </div>
        </div>
      </div>
    </section>
  );
}
