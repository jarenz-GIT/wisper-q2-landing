"use client";

import Image from "next/image";
import Link from "next/link";

import { site } from "@/lib/site";

import { IconInstagram, IconLinkedIn, IconX } from "./icons";
import styles from "./SiteHeader.module.css";

const SOCIALS = [
  { href: site.links.x, label: "Wisper Studios on X", Icon: IconX, size: 14 },
  {
    href: site.links.linkedin,
    label: "Wisper Studios on LinkedIn",
    Icon: IconLinkedIn,
    size: 18,
  },
  {
    href: site.links.instagram,
    label: "Wisper Studios on Instagram",
    Icon: IconInstagram,
    size: 20,
  },
];

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.logo} aria-label="wisper studios home">
          <Image
            src="/images/brand/wisper-wordmark-home.svg"
            alt=""
            width={148}
            height={27}
            priority
          />
        </Link>

        <nav className={styles.socials} aria-label="Social">
          {SOCIALS.map(({ href, label, Icon, size }) => (
            <a
              key={label}
              href={href}
              className={styles.socialLink}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
            >
              <span className={styles.socialIcon} style={{ width: size, height: size }}>
                <Icon />
              </span>
            </a>
          ))}
        </nav>

        <a
          href={site.links.calendly}
          className={styles.bookLink}
          target="_blank"
          rel="noreferrer"
        >
          {site.hero.navCta}
        </a>
      </div>
    </header>
  );
}
