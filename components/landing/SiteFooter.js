import Link from "next/link";

import { site } from "@/lib/site";

import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.legal}>
        {site.legalName} © {site.year}
      </p>
      <p className={styles.tagline}>{site.tagline}</p>
      <Link href={site.links.terms} className={styles.terms}>
        Terms &amp; Conditions
      </Link>
    </footer>
  );
}
