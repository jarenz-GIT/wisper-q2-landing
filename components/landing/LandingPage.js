import { site } from "@/lib/site";

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

function ExperienceStatement() {
  const { statement, highlights } = site.experience;
  const parts = statement.split(
    /(tech startups|nonprofits|ecommerce|film)/g,
  );

  return (
    <p className={styles.experienceStatement}>
      {parts.map((part, index) => {
        const highlight = highlights.find((item) => item.label === part);
        if (!highlight) return <span key={`${part}-${index}`}>{part}</span>;
        return (
          <span key={`${part}-${index}`} className={styles.highlight}>
            {highlight.icon} {highlight.label}
          </span>
        );
      })}
    </p>
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

      <section
        id="experience"
        className={styles.experience}
        aria-labelledby="experience-heading"
      >
        <h2 id="experience-heading" className={styles.srOnly}>
          Experience
        </h2>
        <ExperienceStatement />
        <article className={styles.experienceCard}>
          <p className={styles.experienceEyebrow}>
            {site.experience.cardEyebrow}
          </p>
          <p className={styles.experienceBody}>
            We understand how positioning matters when it comes to{" "}
            <em>speed</em> and <em>comprehension</em> for a variety of
            stakeholders from investors to customers.
          </p>
        </article>
      </section>

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
