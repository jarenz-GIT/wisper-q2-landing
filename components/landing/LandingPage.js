import { site } from "@/lib/site";

import ExperienceSection from "./ExperienceSection";
import FeaturedLaunches from "./FeaturedLaunches";
import { IconArrow, IconInstagram, IconLinkedIn } from "./icons";
import styles from "./LandingPage.module.css";

function BookLink({ href, className, children }) {
  return (
    <a href={href} className={className} target="_blank" rel="noreferrer">
      {children}
      <IconArrow className={styles.arrow} />
    </a>
  );
}

export default function LandingPage() {
  return (
    <main id="main" className={styles.main}>
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroCopy}>
          <h1 id="hero-heading" className={styles.headline}>
            {site.hero.headline}
          </h1>
          <p className={styles.subhead}>{site.hero.subhead}</p>
        </div>
        <BookLink href={site.links.calendly} className={styles.heroCta}>
          {site.hero.cta}
        </BookLink>
      </section>

      <FeaturedLaunches />

      <ExperienceSection />

      <section className={styles.cardGrid} aria-label="Contact, pricing, and socials">
        <article id="contact" className={`${styles.infoCard} ${styles.contactCard}`}>
          <h2 className={styles.cardTitle}>{site.cards.contact.title}</h2>
          <div className={styles.cardActions}>
            <BookLink href={site.links.calendly} className={styles.calendlyButton}>
              {site.cards.contact.calendly}
            </BookLink>
            <a
              href={site.links.linkedin}
              className={styles.linkedinButton}
              target="_blank"
              rel="noreferrer"
            >
              {site.cards.contact.linkedin}
            </a>
          </div>
        </article>

        <article id="pricing" className={`${styles.infoCard} ${styles.pricingCard}`}>
          <h2 className={styles.cardTitle}>{site.cards.pricing.title}</h2>
          <p className={styles.pricingBody}>{site.cards.pricing.body}</p>
        </article>

        <article className={`${styles.infoCard} ${styles.socialsCard}`}>
          <h2 className={styles.cardTitle}>{site.cards.socials.title}</h2>
          <div className={styles.socialButtons}>
            <a
              href={site.links.linkedin}
              className={styles.socialTile}
              target="_blank"
              rel="noreferrer"
              aria-label="Wisper Studios on LinkedIn"
            >
              <IconLinkedIn className={styles.socialTileIcon} />
            </a>
            <a
              href={site.links.instagram}
              className={styles.socialTile}
              target="_blank"
              rel="noreferrer"
              aria-label="Wisper Studios on Instagram"
            >
              <IconInstagram className={styles.socialTileIcon} />
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}
