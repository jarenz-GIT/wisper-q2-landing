/**
 * Footer — Figma frame 838:623 (Wisper Refresh 2026)
 *
 * Static UI:
 *   Large wordmark, studio blurb, San Diego clock label
 *   Orange back-to-top control, 2×2 nav grid, legal strip
 *
 * Live behavior:
 *   Clock updates every second in America/Los_Angeles (Pacific Time)
 *   Back-to-top uses GSAP ScrollToPlugin with reduced-motion fallback
 */

"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import TypeformPopupButton from "@/components/TypeformPopupButton";
import { getLenis } from "@/lib/smooth-scroll";

import styles from "./footer.module.css";

const WORDMARK_SRC = "/images/footer/wisper-studios-wordmark.svg";
const BACK_TO_TOP_ARROW_SRC = "/images/footer/back-to-top-arrow.svg";
const PACIFIC_TIMEZONE = "America/Los_Angeles";
const NAV_LINKS = [
  {
    id: "pricing",
    label: "Pricing",
    href: "/pricing",
    kind: "link",
    nodeId: "838:637",
    capitalize: true,
    hoverClassName: "navCellPricing",
  },
  {
    id: "book-a-chat",
    label: "Book a Chat",
    kind: "contact",
    nodeId: "838:639",
    hoverClassName: "navCellBookChat",
  },
  {
    id: "past-work",
    label: "Past Work",
    href: "/work",
    kind: "link",
    nodeId: "838:641",
    capitalize: true,
    hoverClassName: "navCellPastWork",
  },
  {
    id: "email",
    label: "Email",
    kind: "static",
    nodeId: "838:643",
    capitalize: true,
    hoverClassName: "navCellEmail",
  },
];

function getPacificTimeString(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: PACIFIC_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const read = (type) => parts.find((part) => part.type === type)?.value ?? "00";

  return `${read("hour")}:${read("minute")}:${read("second")}`;
}

export default function Footer() {
  const [time, setTime] = useState("--:--:--");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTime(getPacificTimeString());

    const intervalId = window.setInterval(() => {
      setTime(getPacificTimeString());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleBackToTop = useCallback(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
      return;
    }

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
      return;
    }

    gsap.registerPlugin(ScrollToPlugin);
    gsap.to(window, {
      duration: 1.4,
      scrollTo: { y: 0 },
      ease: "power3.inOut",
    });
  }, []);

  return (
    <footer className={styles.footer} data-nav-logo="navy" data-node-id="838:623">
      <div className={styles.inner}>
        <div className={styles.top} data-node-id="838:624">
          <div className={styles.wordmark} data-node-id="838:625">
            <Link href="/" className={styles.wordmarkLink} data-node-id="838:626">
              <Image
                src={WORDMARK_SRC}
                alt="wisper studios"
                width={148}
                height={27}
                className={styles.wordmarkImage}
              />
            </Link>
          </div>

          <div className={styles.meta} data-node-id="838:628">
            <p className={styles.blurb} data-node-id="838:629">
              Wisper Studios is a{" "}
              <span className={styles.blurbEmphasis}>relationship-first branding studio</span>{" "}
              focused on growing brands that inspire others.
            </p>

            <div className={styles.clockBlock} data-node-id="838:630">
              <p className={styles.clockLabel} data-node-id="838:631">
                WE&apos;RE BASED IN SAN DIEGO (PST)
              </p>
              <p
                className={styles.clockValue}
                aria-live="polite"
                aria-atomic="true"
                data-node-id="838:632"
              >
                {isMounted ? time : "--:--:--"}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.navSection} data-node-id="838:633">
          <button
            type="button"
            className={styles.backToTop}
            onClick={handleBackToTop}
            aria-label="Back to top"
            data-node-id="838:634"
          >
            <Image
              src={BACK_TO_TOP_ARROW_SRC}
              alt=""
              width={40}
              height={40}
              className={styles.backToTopIcon}
              aria-hidden
              data-node-id="838:635"
            />
          </button>

          <div className={styles.navGrid} data-node-id="838:636">
            {NAV_LINKS.map((link) => {
              const cellClassName = [
                styles.navCell,
                link.capitalize ? styles.navCellCapitalized : "",
                link.hoverClassName ? styles[link.hoverClassName] : "",
              ]
                .filter(Boolean)
                .join(" ");

              if (link.kind === "static") {
                return (
                  <span
                    key={link.id}
                    className={cellClassName}
                    data-node-id={link.nodeId}
                  >
                    {link.label}
                  </span>
                );
              }

              if (link.kind === "contact") {
                return (
                  <TypeformPopupButton
                    key={link.id}
                    className={cellClassName}
                    data-node-id={link.nodeId}
                  >
                    {link.label}
                  </TypeformPopupButton>
                );
              }

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={cellClassName}
                  data-node-id={link.nodeId}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className={styles.legal} data-node-id="838:645">
          <div className={styles.legalRow} data-node-id="838:646">
            <Link href="/terms" className={styles.legalLinkMuted} data-node-id="838:647">
              Terms &amp; Conditions
            </Link>
            <p className={styles.legalCenter} data-node-id="838:648">
              Wisper Studios © 2026
            </p>
            <p className={styles.legalRight} data-node-id="838:649">
              Website <span className={styles.legalAccent}>&amp;</span> Story by the Wisper Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
