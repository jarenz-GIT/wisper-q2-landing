"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { site } from "@/lib/site";

import {
  IconEcommerce,
  IconFilm,
  IconNonprofits,
  IconTech,
} from "./ExperienceIcons";
import styles from "./ExperienceSection.module.css";

const ICONS = {
  tech: IconTech,
  nonprofits: IconNonprofits,
  ecommerce: IconEcommerce,
  film: IconFilm,
};

const ROTATE_MS = 6000;
const STACK_LINES = 6;

function countWrappedLines(element) {
  if (!element) return 0;
  const styles = window.getComputedStyle(element);
  const lineHeight = parseFloat(styles.lineHeight);
  const rowGap = parseFloat(styles.rowGap) || 0;
  const height = element.getBoundingClientRect().height;
  if (!lineHeight) return 0;
  return (height + rowGap) / (lineHeight + rowGap);
}

function StatementContent({ categories, activeId, onSelect, interactive }) {
  return (
    <>
      <span className={styles.fullLine}>{site.experience.lineOne}</span>
      <span>{site.experience.prefix}</span>
      {categories.map((category) => {
        const Icon = ICONS[category.id];
        const isActive = category.id === activeId;

        return (
          <span key={category.id} className={styles.tokenCluster}>
            {interactive ? (
              <button
                type="button"
                className={`${styles.token} ${isActive ? styles.tokenActive : ""}`}
                style={{ "--token-color": category.color }}
                aria-pressed={isActive}
                onClick={() => onSelect(category.id)}
              >
                <Icon className={styles.tokenIcon} />
                <span>{category.word}</span>
              </button>
            ) : (
              <span className={styles.token}>
                <Icon className={styles.tokenIcon} />
                <span>{category.word}</span>
              </span>
            )}
            {category.trailing ? (
              <span className={styles.tokenTrail}>{category.trailing}</span>
            ) : null}
          </span>
        );
      })}
    </>
  );
}

export default function ExperienceSection() {
  const categories = site.experience.categories;
  const [activeId, setActiveId] = useState(categories[0].id);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [stacked, setStacked] = useState(false);
  const sectionRef = useRef(null);
  const measureRef = useRef(null);

  const active = categories.find((item) => item.id === activeId) ?? categories[0];

  const select = useCallback((id) => {
    setActiveId(id);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const measure = measureRef.current;
    if (!section || !measure) return undefined;

    const update = () => {
      const lines = countWrappedLines(measure);
      setStacked(lines >= STACK_LINES - 0.05);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(section);
    observer.observe(measure);
    return () => observer.disconnect();
  }, []);

  const advance = useCallback(() => {
    setActiveId((current) => {
      const index = categories.findIndex((item) => item.id === current);
      return categories[(index + 1) % categories.length].id;
    });
  }, [categories]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`${styles.section} ${stacked ? styles.sectionStacked : ""}`}
      style={{ "--rotate-ms": `${ROTATE_MS}ms` }}
      aria-labelledby="experience-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 id="experience-heading" className={styles.srOnly}>
        Experience
      </h2>

      <p
        ref={measureRef}
        className={`${styles.statement} ${styles.measure}`}
        aria-hidden="true"
      >
        <StatementContent
          categories={categories}
          activeId={activeId}
          onSelect={select}
          interactive={false}
        />
      </p>

      <p className={styles.statement}>
        <StatementContent
          categories={categories}
          activeId={activeId}
          onSelect={select}
          interactive
        />
      </p>

      <article
        className={styles.card}
        style={{ "--accent": active.color }}
        aria-live="polite"
      >
        <div className={styles.cardMain}>
          {categories.map((category) => {
            const VariantIcon = ICONS[category.id];
            const isActive = category.id === activeId;

            return (
              <div
                key={category.id}
                className={`${styles.cardVariant} ${
                  isActive ? styles.cardVariantActive : ""
                }`}
                aria-hidden={!isActive}
              >
                <div className={styles.eyebrowRow}>
                  {VariantIcon ? (
                    <VariantIcon className={styles.cardIcon} />
                  ) : null}
                  <p className={styles.eyebrow}>{category.eyebrow}</p>
                </div>
                <p className={styles.body}>{category.body}</p>
              </div>
            );
          })}
        </div>
        <div className={styles.progress} aria-hidden="true">
          <span
            key={`${activeId}-${reduceMotion ? "static" : "play"}`}
            className={`${styles.progressFill} ${
              paused || reduceMotion ? styles.progressPaused : ""
            }`}
            onAnimationEnd={() => {
              if (reduceMotion || paused) return;
              advance();
            }}
          />
        </div>
      </article>
    </section>
  );
}
