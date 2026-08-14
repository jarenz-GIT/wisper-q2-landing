/**
 * OurProcess — Figma frame 891:1888 "Process" (Wisper Refresh 2026)
 */

"use client";

import { useState } from "react";

import AnimatedCursor from "./AnimatedCursor";
import styles from "./OurProcess.module.css";
import { PROCESS_STEPS } from "./processSteps";
import { SketchpadContent } from "./Sketchpads";

export default function OurProcess() {
  const [activeId, setActiveId] = useState(1);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isCursorFollowing, setIsCursorFollowing] = useState(false);

  const updateCursorPosition = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <section
      className={styles.section}
      aria-label="Our process"
      data-nav-logo="navy"
      data-node-id="891:1888"
    >
      <div className={styles.inner}>
        <div className={styles.header} data-node-id="891:1889">
          <div className={styles.labelWrap} data-node-id="891:1998">
            <p className={styles.label}>
              OUR PROCESS
              <span className={styles.labelTick} aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/process/tick-mark.svg" alt="" width={3} height={18} />
              </span>
            </p>
            <div className={styles.labelDivider} aria-hidden="true" />
          </div>

          <h2 className={styles.headline} data-node-id="891:1894">
            A <em className={styles.headlineAccent}>process</em> with pages you can flip through.
          </h2>
        </div>

        <div className={styles.body} data-node-id="891:1895">
          <ol className={styles.stepList} role="tablist" aria-label="Process steps">
            {PROCESS_STEPS.map((step) => {
              const isActive = step.id === activeId;
              return (
                <li key={step.id} role="presentation">
                  <button
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`sketchpad-${step.id}`}
                    id={`step-tab-${step.id}`}
                    className={`${styles.stepRow} ${isActive ? styles.stepRowActive : ""}`}
                    onClick={() => setActiveId(step.id)}
                  >
                    <span className={styles.stepLeft}>
                      <span className={styles.stepNum}>{step.label}</span>
                      <span className={styles.stepName}>{step.name}</span>
                    </span>
                    <span className={styles.stepTime}>{step.time}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div
            className={`${styles.sketchpadWrap} ${styles.sketchpadWrapImage}`}
            id={`sketchpad-${activeId}`}
            role="tabpanel"
            aria-labelledby={`step-tab-${activeId}`}
            onMouseEnter={(event) => {
              setIsCursorFollowing(true);
              updateCursorPosition(event);
            }}
            onMouseMove={updateCursorPosition}
            onMouseLeave={() => setIsCursorFollowing(false)}
          >
            <div key={activeId} className={styles.sketchpadStage}>
              <SketchpadContent stepId={activeId} />
            </div>
            <AnimatedCursor
              stepId={activeId}
              isFollowing={isCursorFollowing}
              cursorPosition={cursorPosition}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
