"use client";

import { useCallback, useEffect, useState } from "react";

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
        <span className={styles.fullLine}>{site.experience.lineOne}</span>
        <span>{site.experience.prefix}</span>
        {categories.map((category) => {
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
        <p className={styles.body}>{active.body}</p>
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
