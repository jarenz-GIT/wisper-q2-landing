/**
 * FAQ — Figma frame 837:527 "FAQs" (Wisper Refresh 2026)
 *
 * Static UI:
 *   Section headline "Frequent Questions"
 *   Divider lines, numbered tags, plus/minus toggle icons
 *
 * Accordion behavior:
 *   One item open at a time; smooth height + opacity transitions.
 *
 * Content: `items` prop from Sanity (`faq` documents) via app/page.js.
 */

"use client";

import { useState } from "react";

import styles from "./faq.module.css";

function FaqDivider() {
  return (
    <div className={styles.divider} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/faq/divider.svg" alt="" width={1040} height={2} />
    </div>
  );
}

export default function FAQ({ items = [] }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null);

  function handleToggle(id) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section
      className={styles.section}
      aria-label="Frequently asked questions"
      data-nav-logo="navy"
      data-node-id="837:527"
    >
      <div className={styles.inner}>
        <header className={styles.header} data-node-id="837:528">
          <h2 className={styles.headline} data-node-id="837:533">
            Frequent Questions
          </h2>
        </header>

        <div className={styles.questions} data-node-id="837:534">
          <FaqDivider />

          <ul className={styles.list}>
            {items.map((item) => {
              const isOpen = openId === item.id;

              return (
                <li
                  key={item.id}
                  className={styles.group}
                  {...(item.nodeId ? { "data-node-id": item.nodeId } : {})}
                >
                  <div
                    className={`${styles.item} ${isOpen ? styles.itemOpen : styles.itemClosed}`}
                    {...(item.nodeId ? { "data-node-id": `${item.nodeId}-question` } : {})}
                  >
                    <h3 className={styles.term}>
                      <button
                        type="button"
                        className={styles.question}
                        aria-expanded={isOpen}
                        aria-controls={`${item.id}-panel`}
                        id={`${item.id}-trigger`}
                        onClick={() => handleToggle(item.id)}
                      >
                        <span className={styles.questionLead}>
                          <span
                            className={`${styles.tag} ${isOpen ? styles.tagFilled : styles.tagOutline}`}
                            aria-hidden="true"
                          >
                            {item.number}
                          </span>
                          <span className={styles.questionText}>{item.question}</span>
                        </span>

                        <span
                          className={`${styles.toggleIcon} ${isOpen ? styles.toggleIconMinus : styles.toggleIconPlus}`}
                          aria-hidden="true"
                        >
                          <span className={styles.toggleBarHorizontal} />
                          <span className={styles.toggleBarVertical} />
                        </span>
                      </button>
                    </h3>

                    <div
                      id={`${item.id}-panel`}
                      role="region"
                      aria-labelledby={`${item.id}-trigger`}
                      className={`${styles.answer} ${isOpen ? styles.answerOpen : ""}`}
                    >
                      <div className={styles.answerInner}>
                        <div className={styles.answerRow}>
                          <span className={styles.tagSpacer} aria-hidden="true">
                            {item.number}
                          </span>
                          <p className={styles.answerText}>{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <FaqDivider />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
