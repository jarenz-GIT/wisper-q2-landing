"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { site } from "@/lib/site";

import { IconLock } from "./icons";
import styles from "./LandingPage.module.css";

function VideoOverlay({ item, onClose }) {
  const closeDesktopRef = useRef(null);
  const closeMobileRef = useRef(null);
  const titleId = useId();
  const [frameLoaded, setFrameLoaded] = useState(false);
  const roles = item.roles ?? [];

  useEffect(() => {
    setFrameLoaded(false);
  }, [item?.embedUrl]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    (mobile ? closeMobileRef : closeDesktopRef).current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  if (!item?.embedUrl) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.overlayStack}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={styles.overlayDialog}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <button
            ref={closeDesktopRef}
            type="button"
            className={styles.overlayClose}
            onClick={onClose}
          >
            CLOSE
          </button>
          <div className={styles.overlayBody}>
            <div className={styles.overlayFrame}>
              {frameLoaded ? null : (
                <div className={styles.overlayLoader} aria-hidden="true">
                  <div className={styles.overlayLoaderBar} />
                </div>
              )}
              <iframe
                key={item.embedUrl}
                src={item.embedUrl}
                title={item.title}
                allow="encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
                onLoad={() => setFrameLoaded(true)}
              />
            </div>
            <div className={styles.overlayMeta}>
              <h3 id={titleId} className={styles.overlayTitle}>
                {item.title}
              </h3>
              {roles.length ? (
                <p className={styles.overlayDirector}>
                  <span className={styles.overlayRolesDesktop}>
                    [{roles.join(", ")}]
                  </span>
                  <span className={styles.overlayRolesMobile}>
                    {roles.map((role) => (
                      <span key={role} className={styles.overlayRole}>
                        [{role}]
                      </span>
                    ))}
                  </span>
                </p>
              ) : null}
              {item.description ? (
                <p className={styles.overlayDescription}>{item.description}</p>
              ) : null}
            </div>
          </div>
        </div>
        <button
          ref={closeMobileRef}
          type="button"
          className={styles.overlayCloseMobile}
          onClick={onClose}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}

export default function FeaturedLaunches() {
  const [activeSlug, setActiveSlug] = useState(null);
  const activeItem = site.featured.items.find((item) => item.slug === activeSlug);

  const openItem = useCallback((item) => {
    if (!item.embedUrl) return;
    setActiveSlug(item.slug);
  }, []);

  const close = useCallback(() => setActiveSlug(null), []);

  return (
    <section
      id="featured"
      className={styles.featured}
      aria-labelledby="featured-heading"
    >
      <div className={styles.featuredHead}>
        <h2 id="featured-heading" className={styles.sectionTitle}>
          {site.featured.title}
        </h2>
        <a
          href={site.links.linkedinDm}
          className={styles.lockNote}
          target="_blank"
          rel="noreferrer"
        >
          <IconLock className={styles.lockIcon} />
          {site.featured.lockNote}
        </a>
      </div>

      <ul className={styles.launchScroller}>
        {site.featured.items.map((item) => (
          <li key={item.slug} className={styles.launchCard}>
            {item.placeholder ? (
              <div className={styles.placeholderCard}>
                <IconLock className={styles.lockIcon} />
                <span>{item.title}</span>
              </div>
            ) : (
              <button
                type="button"
                className={styles.launchButton}
                onClick={() => openItem(item)}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 100vw, 548px"
                  className={styles.launchImage}
                />
                <span className={styles.srOnly}>Play {item.title}</span>
              </button>
            )}
          </li>
        ))}
      </ul>

      {activeItem ? <VideoOverlay item={activeItem} onClose={close} /> : null}
    </section>
  );
}
