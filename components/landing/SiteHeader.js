"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { site } from "@/lib/site";

import { IconInstagram, IconLinkedIn, IconX } from "./icons";
import styles from "./SiteHeader.module.css";

const SOCIALS = [
  { href: site.links.x, label: "Wisper Studios on X", Icon: IconX },
  {
    href: site.links.linkedin,
    label: "Wisper Studios on LinkedIn",
    Icon: IconLinkedIn,
  },
  {
    href: site.links.instagram,
    label: "Wisper Studios on Instagram",
    Icon: IconInstagram,
  },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.logo} aria-label="wisper studios home">
          <Image
            src="/images/brand/wisper-studios-wordmark-navy.svg"
            alt=""
            width={148}
            height={27}
            priority
          />
        </Link>

        <nav className={styles.socials} aria-label="Social">
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              className={styles.socialLink}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
            >
              <Icon className={styles.socialIcon} />
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id={menuId}
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        hidden={!open}
      >
        <nav className={styles.overlayNav} aria-label="Page">
          {site.menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.overlayLink}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.links.calendly}
            className={styles.overlayCta}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            Book a Call
          </a>
        </nav>
      </div>
    </header>
  );
}
