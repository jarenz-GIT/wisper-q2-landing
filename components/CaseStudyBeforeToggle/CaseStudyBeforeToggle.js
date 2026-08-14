"use client";

import styles from "./CaseStudyBeforeToggle.module.css";

export default function CaseStudyBeforeToggle({
  showBefore,
  onToggle,
  label = "See the before:",
}) {
  return (
    <div className={styles.beforeSwitch} data-name="Before Switch">
      <span className={styles.beforeLabel}>{label}</span>
      <button
        type="button"
        className={`${styles.toggle} ${showBefore ? styles.toggleOn : ""}`}
        onClick={onToggle}
        aria-pressed={showBefore}
        aria-label={
          showBefore
            ? "Showing before state — click to show after"
            : "Showing after state — click to show before"
        }
      >
        <span className={styles.toggleKnob} />
      </button>
    </div>
  );
}
