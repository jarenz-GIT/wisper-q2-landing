/**
 * BeforeAfter — Work section with before toggle (Figma 790:2937)
 *
 * Sanity: beforeImage, afterImage
 */

"use client";

import { useState } from "react";
import Image from "next/image";

import CaseStudyBeforeToggle from "@/components/CaseStudyBeforeToggle";

import styles from "./BeforeAfter.module.css";

export default function BeforeAfter({ caseStudy }) {
  const [showBefore, setShowBefore] = useState(false);

  if (!caseStudy) return null;

  const { clientName, beforeImageUrl, afterImageUrl } = caseStudy;
  const activeSrc = showBefore ? beforeImageUrl : afterImageUrl;
  const activeAlt = showBefore
    ? caseStudy.beforeImage?.alt ?? `${clientName} before`
    : caseStudy.afterImage?.alt ?? `${clientName} after`;

  if (!activeSrc && !beforeImageUrl && !afterImageUrl) return null;

  return (
    <section
      className={styles.section}
      aria-label="Project work"
      data-nav-logo="navy"
      data-node-id="790:2937"
    >
      <div className={styles.inner}>
        <div className={styles.titleRow} data-node-id="790:2938">
          <h2 className={styles.headline} data-node-id="790:2939">
            <span className={styles.headlineLine}>Work, done the </span>
            <span className={styles.headlineLine}>Wisper Way (WWW)</span>
          </h2>

          {beforeImageUrl ? (
            <CaseStudyBeforeToggle
              showBefore={showBefore}
              onToggle={() => setShowBefore((current) => !current)}
            />
          ) : null}
        </div>

        <div className={styles.mediaWrap} data-node-id="790:2943">
          {activeSrc ? (
            <Image
              key={activeSrc}
              src={activeSrc}
              alt={activeAlt}
              fill
              className={styles.mediaImage}
              sizes="(max-width: 767px) 100vw, calc(100vw - 20px)"
            />
          ) : (
            <div className={styles.placeholder} aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  );
}
