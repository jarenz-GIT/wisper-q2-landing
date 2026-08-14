"use client";

import { useCallback, useEffect, useState } from "react";

import { site } from "@/lib/site";

import {
  IconEcommerceBag,
  IconFilmClapper,
  IconNonprofitGlobe,
  IconTechDiamond,
} from "./ExperienceIcons";
import styles from "./ExperienceSection.module.css";

const ICONS = {
  tech: IconTechDiamond,
  nonprofits: IconNonprofitGlobe,
  ecommerce: IconEcommerceBag,
  film: IconFilmClapper,
};

const ROTATE_MS = 6000;

export default function ExperienceSection() {
  const categories = site.experience.categories;
  const [activeId, setActiveId] = useState(categories[0].id);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

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

  const advance = useCallback(() => {
    setActiveId((current) => {
      const index = categories.findIndex((item) => item.id === current);
      return categories[(index + 1) % categories.length].id;
    });
  }, [categories]);

  const parts = site.experience.statement.split(
    /(tech startups|nonprofits|ecommerce|film)/g,
  );

  return (
    <section
      id="experience"
      className={styles.section}
      style={{ "--rotate-ms": `${ROTATE_MS}ms` }}
      aria-labelledby="experience-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 id="experience-heading" className={styles.srOnly}>
        Experience
      </h2>

      <p className={styles.statement}>
        {parts.map((part, index) => {
          const category = categories.find((item) => item.label === part);
          if (!category) {
            return <span key={`${part}-${index}`}>{part}</span>;
          }

          const Icon = ICONS[category.id];
          const isActive = category.id === activeId;

          return (
            <button
              key={category.id}
              type="button"
              className={`${styles.token} ${isActive ? styles.tokenActive : ""}`}
              style={{ "--token-color": category.color }}
              aria-pressed={isActive}
              onClick={() => select(category.id)}
            >
              <Icon className={styles.tokenIcon} />
              <span>{category.label}</span>
            </button>
          );
        })}
      </p>

      <article
        className={styles.card}
        style={{ "--accent": active.color }}
        aria-live="polite"
      >
        <p className={styles.eyebrow}>{active.eyebrow}</p>
        <p className={styles.body}>
          {active.bodyParts.map((chunk, index) =>
            chunk.em ? (
              <em key={index}>{chunk.text}</em>
            ) : (
              <span key={index}>{chunk.text}</span>
            ),
          )}
        </p>
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
