/**
 * Moodboard — Case study moodboard with before toggle (Figma 790:2955 / 790:2968)
 *
 * Sanity: moodboard[], beforeImage, showMoodboard
 */

"use client";

import { useState } from "react";
import Image from "next/image";

import CaseStudyBeforeToggle from "@/components/CaseStudyBeforeToggle";

import styles from "./Moodboard.module.css";

export default function Moodboard({ caseStudy }) {
  const [showBefore, setShowBefore] = useState(false);

  if (!caseStudy?.showMoodboard) return null;

  const { clientName, moodboardImages = [], beforeImageUrl } = caseStudy;
  const hasMoodboard = moodboardImages.length > 0;
  const hasBefore = Boolean(beforeImageUrl);

  if (!hasMoodboard && !hasBefore) return null;

  const showBeforeView = showBefore && hasBefore;

  return (
    <section
      className={styles.section}
      aria-label="Moodboard"
      data-nav-logo="navy"
      data-node-id="790:2955"
    >
      <div className={styles.headerWrap}>
        <div className={styles.titleRow} data-node-id="790:2956">
          <h2 className={styles.headline} data-node-id="790:2957">
            The Moodboard
          </h2>

          {hasBefore && hasMoodboard ? (
            <CaseStudyBeforeToggle
              showBefore={showBefore}
              onToggle={() => setShowBefore((current) => !current)}
            />
          ) : null}
        </div>
      </div>

      <div className={styles.stage} data-node-id="790:2968">
        <div className={styles.gridBg} aria-hidden="true">
          <Image
            src="/images/case-studies/detail/moodboard-grid.png"
            alt=""
            fill
            className={styles.gridImage}
            sizes="calc(100vw - 20px)"
          />
        </div>

        <div className={styles.stageInner}>
          {showBeforeView ? (
            <div className={styles.beforePanel}>
              <Image
                src={beforeImageUrl}
                alt={caseStudy.beforeImage?.alt ?? `${clientName} moodboard before`}
                fill
                className={styles.beforeImage}
                sizes="(max-width: 767px) 100vw, 900px"
              />
            </div>
          ) : (
            <ul className={styles.collage}>
              {moodboardImages.map((image, index) => (
                <li
                  key={`${image.url}-${index}`}
                  className={styles.collageItem}
                  style={{ "--collage-index": index }}
                >
                  <div className={styles.collageMedia}>
                    <Image
                      src={image.url}
                      alt={image.alt ?? `${clientName} moodboard ${index + 1}`}
                      fill
                      className={styles.collageImage}
                      sizes="(max-width: 767px) 80vw, 320px"
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
