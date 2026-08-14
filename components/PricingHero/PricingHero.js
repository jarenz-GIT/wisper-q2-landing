/**
 * PricingHero — Figma frame 883:2252 "Services Hero" (Wisper Refresh 2026)
 *
 * Package cards from Sanity (`pricingPackage` documents).
 */

"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import TypeformPopupButton from "@/components/TypeformPopupButton";
import {
  getPackageNamesForMatching,
  renderBulletTextWithPackageNames,
} from "@/lib/format-pricing-bullet-text";
import { FLIP_IN_STAGGER, runFlipInY, setFlipInVisible } from "@/lib/gsap-flip-in";
import { isReady } from "@/lib/loading-ready";
import blobStyles from "@/lib/orange-button-blob.module.css";

import styles from "./PricingHero.module.css";

const AVATAR_FALLBACK_SRC = "/images/pricing/avatar.png";

const FEATURE_ICONS = {
  check: { src: "/images/pricing/check.svg", width: 8, height: 9 },
  plus: { src: "/images/pricing/plus.svg", width: 8, height: 9 },
  minus: { src: "/images/pricing/ex.svg", width: 8, height: 1 },
};

const CARD_TILT_DEGREES = 6;

function shouldTiltCard(event) {
  return (
    event.pointerType !== "touch" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function handleCardPointerMove(event) {
  if (!shouldTiltCard(event)) return;

  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
  const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

  card.style.setProperty("--card-tilt-x", `${(-y * CARD_TILT_DEGREES).toFixed(2)}deg`);
  card.style.setProperty("--card-tilt-y", `${(x * CARD_TILT_DEGREES).toFixed(2)}deg`);
  card.style.setProperty("--card-lift", "-2px");
}

function resetCardTilt(event) {
  const card = event.currentTarget;

  card.style.setProperty("--card-tilt-x", "0deg");
  card.style.setProperty("--card-tilt-y", "0deg");
  card.style.setProperty("--card-lift", "0px");
}

function PricingCard({ pkg, packageNames }) {
  const avatarSrc = pkg.iconUrl ?? AVATAR_FALLBACK_SRC;
  const useSanityIcon = Boolean(pkg.iconUrl);

  return (
    <div
      className={`${styles.card} ${pkg.recommended ? styles.cardRecommended : ""}`}
      data-node-id={`pkg-${pkg.id}`}
      onPointerMove={handleCardPointerMove}
      onPointerLeave={resetCardTilt}
      onPointerCancel={resetCardTilt}
    >
      <div className={styles.cardFlipper}>
        <div className={styles.cardBack} aria-hidden="true" />

        <div className={styles.cardFront}>
          {pkg.recommended && (
            <div className={styles.recommendedTag} aria-label="Recommended">
              Recommended ✦
            </div>
          )}

          <div className={styles.cardTop}>
            <div className={styles.cardHeading}>
              <div className={styles.cardAvatar} aria-hidden="true">
                {useSanityIcon ? (
                  <Image
                    src={avatarSrc}
                    alt=""
                    fill
                    className={styles.cardAvatarImage}
                    sizes="50px"
                  />
                ) : (
                  <Image
                    src={AVATAR_FALLBACK_SRC}
                    alt=""
                    fill
                    className={styles.cardAvatarImage}
                    sizes="50px"
                  />
                )}
              </div>
              <p className={styles.cardName}>{pkg.name}</p>
              <div className={styles.cardPriceBlock}>
                <p className={styles.cardPrice}>{pkg.price}</p>
                <p className={styles.cardBilling}>{pkg.billing}</p>
              </div>
            </div>

            <ul className={styles.featureList}>
              {pkg.features.map((feat) => {
                const icon = FEATURE_ICONS[feat.icon] ?? FEATURE_ICONS.check;

                return (
                  <li
                    key={feat.key ?? feat.text}
                    className={`${styles.featureItem} ${feat.included ? styles.featureIncluded : styles.featureExcluded}`}
                  >
                    <span className={styles.featureIcon} aria-hidden="true">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={icon.src}
                        alt=""
                        width={icon.width}
                        height={icon.height}
                      />
                    </span>
                    <span className={styles.featureText}>
                      {renderBulletTextWithPackageNames(feat.text, packageNames)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <TypeformPopupButton
            className={`${styles.cardCta} ${pkg.recommended ? styles.cardCtaRecommended : ""} ${pkg.recommended ? blobStyles.blobBtn : ""}`}
          >
            <span className={styles.cardCtaLabel}>
              Start with <em>{pkg.name}</em>
            </span>
            <span className={styles.cardCtaArrow} aria-hidden="true" />
          </TypeformPopupButton>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

/**
 * @param {{
 *   packages?: Array<{
 *     id: string;
 *     name: string;
 *     price: string;
 *     billing: string;
 *     recommended: boolean;
 *     iconUrl: string | null;
 *     features: Array<{ key?: string; included: boolean; icon: string; text: string }>;
 *   }>;
 *   metaLabel?: string | null;
 * }} props
 */
export default function PricingHero({ packages = [], metaLabel }) {
  const sectionRef = useRef(null);
  const packagesRef = useRef(null);
  const cardGridRef = useRef(null);
  const resolvedMetaLabel = metaLabel ?? "Packages coming soon";
  const packageNames = getPackageNamesForMatching(packages);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const packagesLayer = packagesRef.current;
    const cardGrid = cardGridRef.current;
    if (!section || !packagesLayer || !cardGrid) return;

    const flippers = gsap.utils.toArray(`.${styles.cardFlipper}`, cardGrid);
    if (!flippers.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      flippers.forEach(setFlipInVisible);
      return;
    }

    flippers.forEach((flipper) =>
      gsap.set(flipper, {
        rotationY: 180,
        transformPerspective: 1000,
      }),
    );

    let scrollTrigger;
    let flipAnimations = [];
    let ctx;

    const setupScrollTrigger = () => {
      ctx = gsap.context(() => {
        scrollTrigger = ScrollTrigger.create({
          trigger: packagesLayer,
          start: "top 85%",
          once: true,
          onEnter: () => {
            flipAnimations = flippers.map((flipper, index) =>
              runFlipInY(flipper, { delay: index * FLIP_IN_STAGGER }),
            );
          },
        });
      }, section);

      ScrollTrigger.refresh();
    };

    if (isReady()) {
      setupScrollTrigger();
    } else {
      window.addEventListener("wisper:ready", setupScrollTrigger, { once: true });
    }

    return () => {
      window.removeEventListener("wisper:ready", setupScrollTrigger);
      scrollTrigger?.kill();
      flipAnimations.forEach((animation) => animation.kill());
      ctx?.revert();
    };
  }, [packages.length]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Pricing packages"
      data-nav-logo="navy"
      data-node-id="883:2252"
    >
      <div className={styles.selector} data-node-id="883:1853">
        <h1 className={styles.headline}>Pick Your Lane.</h1>

        <p className={styles.subtitle}>
          Each package is named for a founder we&rsquo;ve actually built with
          &mdash; because this work has <em>always</em> been personal. Four
          tiers, one long conversation. We&rsquo;ll meet you where you are.
        </p>
      </div>

      <div ref={packagesRef} className={styles.packages} data-node-id="883:1873">
        <div className={styles.grid} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/pricing/gridlines.svg" alt="" className={styles.gridImg} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/pricing/gridlines-alt.svg" alt="" className={styles.gridImg} />
        </div>

        <div className={styles.metaStrip} data-node-id="883:1915">
          <p className={styles.metaLabel}>{resolvedMetaLabel}</p>
        </div>

        <div ref={cardGridRef} className={styles.cardGrid}>
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <PricingCard
                key={pkg.id}
                pkg={pkg}
                packageNames={packageNames}
              />
            ))
          ) : (
            <p className={styles.emptyPackages}>
              Pricing packages will appear here once published in Sanity.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
