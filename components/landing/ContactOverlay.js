"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { site } from "@/lib/site";

import { IconCopy, IconInstagram, IconLinkedIn, IconX } from "./icons";
import styles from "./ContactOverlay.module.css";

const MOBILE_QUERY = "(max-width: 767px)";
const MAX_TILT = 4.2;
const TOAST_MS = 2400;

function isMobileViewport() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.left = "-9999px";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    field.remove();
    return ok;
  }
}

function CopyEmailButton({
  copyValue,
  className,
  ariaLabel,
  copied,
  onCopied,
  onHoverEnd,
  dataAttrs,
  children,
}) {
  const onCopy = useCallback(async () => {
    const ok = await copyText(copyValue);
    if (!ok) return;
    onCopied();
  }, [copyValue, onCopied]);

  return (
    <button
      type="button"
      className={`${className} ${copied ? styles.copied : ""}`}
      onClick={onCopy}
      onMouseLeave={onHoverEnd}
      onBlur={onHoverEnd}
      aria-label={copied ? `Copied ${copyValue}` : ariaLabel}
      {...dataAttrs}
    >
      {children}
    </button>
  );
}

function DirectChip({ alias, email, copied, onCopied, onHoverEnd }) {
  return (
    <CopyEmailButton
      copyValue={email}
      className={styles.directChip}
      ariaLabel={`Copy ${email}`}
      copied={copied}
      onCopied={onCopied}
      onHoverEnd={onHoverEnd}
    >
      <span className={styles.directInner}>
        <span className={styles.directFront}>
          <span className={styles.directAlias}>{alias}</span>
          <span className={styles.directEmail}>{email}</span>
          <IconCopy className={styles.copyIconSm} />
        </span>
        <span className={styles.directBack} aria-hidden="true">
          <span>{email}</span>
          <IconCopy className={styles.copyIconSm} />
        </span>
      </span>
    </CopyEmailButton>
  );
}

export default function ContactOverlay({ onClose }) {
  const titleId = useId();
  const closeRef = useRef(null);
  const cardRef = useRef(null);
  const tiltEnabled = useRef(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [toastEmail, setToastEmail] = useState(null);

  const resetTilt = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  }, []);

  const showCopied = useCallback((email, key) => {
    setCopiedKey(key);
    setToastEmail(email);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (!toastEmail) return undefined;
    const timeout = window.setTimeout(() => setToastEmail(null), TOAST_MS);
    return () => window.clearTimeout(timeout);
  }, [toastEmail]);

  useEffect(() => {
    if (copiedKey !== "studio") return undefined;

    const onPointerDown = (event) => {
      if (event.target.closest("[data-studio-email]")) return;
      setCopiedKey(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [copiedKey]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    const enableTilt = () => {
      tiltEnabled.current =
        !isMobileViewport() &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!tiltEnabled.current) resetTilt();
    };

    const onPointerMove = (event) => {
      if (!tiltEnabled.current || event.pointerType !== "mouse") return;
      const rect = card.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      const rotateX = (-ny * MAX_TILT).toFixed(2);
      const rotateY = (nx * MAX_TILT).toFixed(2);
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const onPointerLeave = () => {
      if (!tiltEnabled.current) return;
      resetTilt();
    };

    enableTilt();
    card.addEventListener("pointermove", onPointerMove);
    card.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", enableTilt);

    return () => {
      card.removeEventListener("pointermove", onPointerMove);
      card.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", enableTilt);
    };
  }, [resetTilt]);

  const { contactCard, links } = site;

  return (
    <div className={styles.backdrop} onClick={onClose} data-lenis-prevent>
      <div className={styles.stage}>
        <div
          ref={cardRef}
          className={styles.card}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={onClose}
          >
            CLOSE
          </button>

          <div className={styles.top}>
            <p id={titleId} className={styles.kicker}>
              {contactCard.title}
            </p>
            <div className={styles.divider} />
          </div>

          <div className={styles.body}>
            <p className={styles.kicker}>{contactCard.emailLabel}</p>

            <CopyEmailButton
              copyValue={contactCard.studioEmail}
              className={styles.studioEmail}
              ariaLabel={`Copy ${contactCard.studioEmail}`}
              copied={copiedKey === "studio"}
              onCopied={() => showCopied(contactCard.studioEmail, "studio")}
              dataAttrs={{ "data-studio-email": "" }}
            >
              <span>{contactCard.studioEmail}</span>
              <IconCopy className={styles.copyIconLg} />
            </CopyEmailButton>

            <div className={styles.direct}>
              <p className={styles.kicker}>{contactCard.directLabel}</p>
              <div className={styles.directList}>
                {contactCard.directs.map((person) => (
                  <DirectChip
                    key={person.id}
                    alias={person.alias}
                    email={person.email}
                    copied={copiedKey === person.id}
                    onCopied={() => showCopied(person.email, person.id)}
                    onHoverEnd={() => {
                      if (isMobileViewport()) return;
                      setCopiedKey((key) => (key === person.id ? null : key));
                    }}
                  />
                ))}
              </div>
            </div>

            <a
              href={links.calendly}
              className={styles.calendlyCta}
              target="_blank"
              rel="noreferrer"
            >
              {contactCard.calendlyCta}
            </a>
          </div>

          <div className={styles.footer}>
            <Image
              src="/images/brand/wisper-wordmark-home.svg"
              alt=""
              width={148}
              height={27}
              className={styles.wordmark}
            />
            <nav className={styles.footerSocials} aria-label="Social">
              <a
                href={links.x}
                className={styles.footerSocial}
                target="_blank"
                rel="noreferrer"
                aria-label="Wisper Studios on X"
              >
                <IconX className={styles.footerSocialX} />
              </a>
              <a
                href={links.linkedin}
                className={styles.footerSocial}
                target="_blank"
                rel="noreferrer"
                aria-label="Wisper Studios on LinkedIn"
              >
                <IconLinkedIn className={styles.footerSocialLinkedIn} />
              </a>
              <a
                href={links.instagram}
                className={styles.footerSocial}
                target="_blank"
                rel="noreferrer"
                aria-label="Wisper Studios on Instagram"
              >
                <IconInstagram className={styles.footerSocialInstagram} />
              </a>
            </nav>
          </div>
        </div>
      </div>

      {toastEmail ? (
        <p
          className={styles.copiedToast}
          role="status"
          onClick={(event) => event.stopPropagation()}
        >
          {`COPIED ${toastEmail.toUpperCase()} TO CLIPBOARD`}
        </p>
      ) : null}
    </div>
  );
}
