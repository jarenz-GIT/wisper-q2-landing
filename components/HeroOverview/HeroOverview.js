/**
 * HeroOverview — Case study detail hero (Figma 790:2866, Wisper Refresh 2026)
 *
 * Sanity: clientName, description, heroImage, heroTagline, services (tag pills)
 */

import Image from "next/image";

import styles from "./HeroOverview.module.css";

const TAG_VARIANTS = ["tagBlue", "tagOrange", "tagGreen", "tagPurple"];

export default function HeroOverview({ caseStudy }) {
  if (!caseStudy) return null;

  const {
    clientName,
    description,
    heroImageUrl,
    heroTagline,
    serviceTags = [],
  } = caseStudy;

  return (
    <section
      className={styles.section}
      aria-label={`${clientName} overview`}
      data-nav-logo="navy"
      data-node-id="790:2866"
    >
      <div className={styles.inner}>
        <header className={styles.heading} data-node-id="790:2867">
          <h1 className={styles.projectName} data-node-id="790:2868">
            {clientName}
          </h1>

          {description ? (
            <p className={styles.description} data-node-id="790:2869">
              {description}
            </p>
          ) : null}
        </header>

        {heroImageUrl ? (
          <div className={styles.heroVisual} data-node-id="790:2870">
            <div className={styles.heroImageWrap} data-node-id="790:2871">
              <Image
                src={heroImageUrl}
                alt={caseStudy.heroImage?.alt ?? `${clientName} hero`}
                fill
                className={styles.heroImage}
                sizes="(max-width: 767px) 100vw, calc(100vw - 20px)"
                priority
              />
            </div>

            <div className={styles.heroOverlay} data-node-id="790:2872">
              {serviceTags.length > 0 ? (
                <div className={styles.tagRow} data-node-id="790:2873">
                  {serviceTags.map((tag, index) => (
                    <span
                      key={tag}
                      className={`${styles.tag} ${styles[TAG_VARIANTS[index % TAG_VARIANTS.length]]}`}
                    >
                      <span className={styles.tagDot} aria-hidden="true" />
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className={styles.overlayTitle} data-node-id="790:2880">
                <p className={styles.overlayName} data-node-id="790:2881">
                  {clientName}
                </p>
                {heroTagline ? (
                  <p className={styles.overlayTagline} data-node-id="790:2882">
                    {heroTagline}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
