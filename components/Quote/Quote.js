/**
 * Quote — Case study founder quote (Figma 790:2951)
 *
 * Sanity: quote { text, name, role }, showQuote
 */

import styles from "./Quote.module.css";

export default function Quote({ caseStudy }) {
  if (!caseStudy?.showQuote || !caseStudy.quoteText) return null;

  const { quoteText } = caseStudy;

  return (
    <section
      className={styles.section}
      aria-label="Client quote"
      data-nav-logo="navy"
      data-node-id="790:2951"
    >
      <div className={styles.inner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/case-studies/detail/icon-quote.svg"
          alt=""
          width={71}
          height={71}
          className={styles.quoteIcon}
          aria-hidden="true"
          data-node-id="790:2952"
        />

        <blockquote className={styles.quoteBlock}>
          <p className={styles.quoteText} data-node-id="790:2954">
            {quoteText}
          </p>
        </blockquote>
      </div>
    </section>
  );
}
