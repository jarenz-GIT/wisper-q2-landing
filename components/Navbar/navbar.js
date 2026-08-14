"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import TypeformPopupButton from "@/components/TypeformPopupButton";
import { springOut } from "@/lib/gsap-spring";
import { shouldUseNavyLogoAtPoint } from "@/lib/nav-logo-contrast";
import blobStyles from "@/lib/orange-button-blob.module.css";

import styles from "./navbar.module.css";

const CTA_ARROW_SRC = "/images/hero/cta-arrow.svg";
const WORDMARK_LIGHT_SRC = "/images/brand/wisper-studios-wordmark.svg";
const WORDMARK_NAVY_SRC = "/images/brand/wisper-studios-wordmark-navy.svg";
const MOBILE_WORDMARK_SRC = "/images/nav/wisper-mobile-wordmark.png";
const MOBILE_WORDMARK_NAVY_SRC = "/images/nav/wisper-mobile-wordmark-navy.png";
const MOBILE_MENU_SRC = "/images/nav/burger-menu.svg";

const SCROLL_THRESHOLD = 8;
const ROUTE_CONTRAST_SYNC_DELAYS = [80, 180, 360];
const MOBILE_MENU_DURATION = 0.4;
const MOBILE_MENU_BOUNCE = 0.3;

export default function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [useNavyLogo, setUseNavyLogo] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shellRef = useRef(null);
  const logoLinkRef = useRef(null);
  const mobileLogoLinkRef = useRef(null);
  const mobileMenuPanelRef = useRef(null);
  const mobileMenuTweenRef = useRef(null);
  const mobileMenuCloseLineRefs = useRef([]);
  const mobileMenuCloseIconTweenRef = useRef(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const reducedMotion = useRef(false);

  const updateLogoContrast = useCallback(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const logoLink = isMobile
      ? mobileLogoLinkRef.current
      : logoLinkRef.current;

    if (!logoLink) return;

    const rect = logoLink.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const shouldUseNavy = shouldUseNavyLogoAtPoint(x, y, shellRef.current);

    setUseNavyLogo((current) =>
      current === shouldUseNavy ? current : shouldUseNavy,
    );
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = motionQuery.matches;

    const syncMotionPreference = (event) => {
      reducedMotion.current = event.matches;
      if (event.matches) {
        setHidden(false);
      }
    };

    motionQuery.addEventListener("change", syncMotionPreference);

    const update = () => {
      const currentScrollY = window.scrollY;

      if (reducedMotion.current || currentScrollY <= SCROLL_THRESHOLD) {
        setHidden(false);
      } else if (
        currentScrollY > lastScrollY.current &&
        currentScrollY > SCROLL_THRESHOLD
      ) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
      updateLogoContrast();
      ticking.current = false;
    };

    let scrollEndTimeoutId = 0;

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(update);
      }

      window.clearTimeout(scrollEndTimeoutId);
      scrollEndTimeoutId = window.setTimeout(updateLogoContrast, 120);
    };

    const onScrollEnd = () => {
      window.clearTimeout(scrollEndTimeoutId);
      updateLogoContrast();
    };

    const onResize = () => {
      updateLogoContrast();
    };

    lastScrollY.current = window.scrollY;
    updateLogoContrast();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(scrollEndTimeoutId);
      motionQuery.removeEventListener("change", syncMotionPreference);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", onResize);
    };
  }, [updateLogoContrast]);

  useEffect(() => {
    const syncNow = () => {
      lastScrollY.current = window.scrollY;
      setHidden(false);
      updateLogoContrast();
    };

    syncNow();

    let rafId = window.requestAnimationFrame(() => {
      syncNow();
      rafId = window.requestAnimationFrame(syncNow);
    });

    const timeoutIds = ROUTE_CONTRAST_SYNC_DELAYS.map((delay) =>
      window.setTimeout(syncNow, delay),
    );

    return () => {
      window.cancelAnimationFrame(rafId);
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [pathname, updateLogoContrast]);

  useEffect(() => {
    mobileMenuTweenRef.current?.kill();
    mobileMenuCloseIconTweenRef.current?.kill();
    setMobileMenuOpen(false);
  }, [pathname]);

  useLayoutEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const panel = mobileMenuPanelRef.current;
    if (!panel) return undefined;

    mobileMenuTweenRef.current?.kill();
    mobileMenuCloseIconTweenRef.current?.kill();

    const closeLines = mobileMenuCloseLineRefs.current.filter(Boolean);
    closeLines.forEach((line, index) => {
      gsap.set(line, {
        rotation: index === 0 ? 45 : -45,
        transformOrigin: "50% 50%",
      });
    });

    if (reducedMotion.current) {
      gsap.set(panel, { clearProps: "opacity,transform" });
      return undefined;
    }

    gsap.set(panel, {
      opacity: 0,
      y: -8,
      scale: 0.98,
      transformOrigin: "50% 0%",
    });

    mobileMenuTweenRef.current = gsap.to(panel, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: MOBILE_MENU_DURATION,
      ease: springOut(MOBILE_MENU_BOUNCE),
      onComplete: () => {
        mobileMenuTweenRef.current = null;
      },
    });

    return () => {
      mobileMenuTweenRef.current?.kill();
      mobileMenuTweenRef.current = null;
      mobileMenuCloseIconTweenRef.current?.kill();
      mobileMenuCloseIconTweenRef.current = null;
    };
  }, [mobileMenuOpen]);

  const openMobileMenu = useCallback(() => {
    mobileMenuTweenRef.current?.kill();
    setMobileMenuOpen(true);
  }, []);

  const closeMobileMenu = useCallback(() => {
    const panel = mobileMenuPanelRef.current;
    const closeLines = mobileMenuCloseLineRefs.current.filter(Boolean);

    mobileMenuTweenRef.current?.kill();
    mobileMenuCloseIconTweenRef.current?.kill();

    if (!panel || reducedMotion.current) {
      setMobileMenuOpen(false);
      return;
    }

    if (closeLines.length) {
      mobileMenuCloseIconTweenRef.current = gsap.to(closeLines, {
        rotation: 0,
        duration: MOBILE_MENU_DURATION,
        ease: springOut(MOBILE_MENU_BOUNCE),
      });
    }

    mobileMenuTweenRef.current = gsap.to(panel, {
      opacity: 0,
      y: -8,
      scale: 0.98,
      duration: MOBILE_MENU_DURATION,
      ease: springOut(MOBILE_MENU_BOUNCE),
      onComplete: () => {
        mobileMenuTweenRef.current = null;
        mobileMenuCloseIconTweenRef.current = null;
        setMobileMenuOpen(false);
      },
    });
  }, []);

  return (
    <div
      ref={shellRef}
      className={`${styles.shell} ${hidden && !mobileMenuOpen ? styles.shellHidden : ""} ${mobileMenuOpen ? styles.shellMenuOpen : ""}`}
      data-hidden={(hidden && !mobileMenuOpen) || undefined}
    >
      <header className={styles.nav} aria-label="Primary" data-node-id="807:3340">
        <Link
          ref={logoLinkRef}
          href="/"
          className={styles.logoLink}
          aria-label="wisper studios home"
          data-node-id="807:3356"
        >
          <span className={styles.logoStack}>
            <Image
              src={WORDMARK_LIGHT_SRC}
              alt=""
              width={148}
              height={27}
              className={`${styles.logo} ${useNavyLogo ? styles.logoHidden : ""}`}
              priority
            />
            <Image
              src={WORDMARK_NAVY_SRC}
              alt=""
              width={148}
              height={27}
              className={`${styles.logo} ${styles.logoOverlay} ${useNavyLogo ? "" : styles.logoHidden}`}
              priority
            />
          </span>
        </Link>

        <Link
          ref={mobileLogoLinkRef}
          href="/"
          className={styles.mobileLogoLink}
          aria-label="wisper home"
        >
          <span className={styles.mobileLogoPill}>
            <Image
              src={MOBILE_WORDMARK_SRC}
              alt=""
              width={260}
              height={100}
              className={`${styles.mobileLogoImage} ${useNavyLogo ? styles.logoHidden : ""}`}
              priority
            />
            <Image
              src={MOBILE_WORDMARK_NAVY_SRC}
              alt=""
              width={260}
              height={100}
              className={`${styles.mobileLogoNavy} ${useNavyLogo ? "" : styles.logoHidden}`}
              aria-hidden
            />
          </span>
        </Link>

        <nav className={styles.navPill} aria-label="Site sections" data-node-id="807:3341">
          <Link href="/work" className={styles.navPillLink}>
            <span className={styles.navPillLinkInner}>Work</span>
          </Link>
          <Link href="/pricing" className={styles.navPillLink}>
            <span className={styles.navPillLinkInner}>Pricing</span>
          </Link>
        </nav>

        <TypeformPopupButton
          className={`${styles.navCta} ${blobStyles.blobBtn}`}
          data-node-id="807:3352"
        >
          <span className={styles.navCtaLabel}>CONTACT US</span>
          <span className={styles.navCtaIcon} aria-hidden>
            <Image
              src={CTA_ARROW_SRC}
              alt=""
              width={9}
              height={9}
              className={styles.navCtaIconImage}
            />
          </span>
        </TypeformPopupButton>

        <button
          type="button"
          className={styles.menuButton}
          aria-label="Open navigation menu"
          aria-controls="mobile-navigation-menu"
          aria-expanded={mobileMenuOpen}
          onClick={openMobileMenu}
        >
          <Image
            src={MOBILE_MENU_SRC}
            alt=""
            width={30}
            height={30}
            className={styles.menuButtonIcon}
            aria-hidden
          />
        </button>
      </header>

      {mobileMenuOpen ? (
        <div
          id="mobile-navigation-menu"
          className={styles.mobileMenuOverlay}
        >
          <div ref={mobileMenuPanelRef} className={styles.mobileMenuPanel}>
            <button
              type="button"
              className={styles.mobileMenuClose}
              aria-label="Close navigation menu"
              onClick={closeMobileMenu}
            >
              <span className={styles.mobileMenuCloseIcon} aria-hidden>
                <span
                  ref={(node) => {
                    mobileMenuCloseLineRefs.current[0] = node;
                  }}
                  className={`${styles.mobileMenuCloseLine} ${styles.mobileMenuCloseLinePrimary}`}
                />
                <span
                  ref={(node) => {
                    mobileMenuCloseLineRefs.current[1] = node;
                  }}
                  className={`${styles.mobileMenuCloseLine} ${styles.mobileMenuCloseLineSecondary}`}
                />
              </span>
            </button>

            <nav className={styles.mobileMenuPages} aria-label="Mobile navigation">
              <Link href="/work" className={styles.mobileMenuLink}>
                Work
              </Link>
              <Link href="/pricing" className={styles.mobileMenuLink}>
                Pricing
              </Link>
              <TypeformPopupButton
                className={`${styles.mobileMenuCta} ${blobStyles.blobBtn}`}
              >
                <span className={styles.mobileMenuCtaLabel}>CONTACT US</span>
                <Image
                  src={CTA_ARROW_SRC}
                  alt=""
                  width={9}
                  height={9}
                  className={styles.mobileMenuCtaIcon}
                  aria-hidden
                />
              </TypeformPopupButton>
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
