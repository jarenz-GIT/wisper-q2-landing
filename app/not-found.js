import Link from "next/link";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main id="main" className={styles.main}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>This page is not on the cut.</h1>
      <Link href="/" className={styles.link}>
        Back to home
      </Link>
    </main>
  );
}
