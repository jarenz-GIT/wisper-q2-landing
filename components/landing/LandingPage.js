import Image from "next/image";

import { site } from "@/lib/site";

import { IconArrow, IconInstagram, IconLinkedIn, IconLock } from "./icons";
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
            href={site.links.linkedin}
            className={styles.lockNote}
            target="_blank"
            rel="noreferrer"
          >
            <IconLock className={styles.lockIcon} />
            {site.featured.lockNote}
          </a>
        </div>

        <ul className={styles.launchGrid}>
          {site.featured.items.map((item) => (
            <li key={item.slug} className={styles.launchCard}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
                className={styles.launchImage}
              />
              {item.overlay ? (
                <span className={styles.shortageBadge}>{item.overlay}</span>
              ) : null}
              {item.amount ? (
                <div className={styles.raiseOverlay}>
                  <p className={styles.raiseAmount}>{item.amount}</p>
                  <ul className={styles.raiseLogos} aria-label="Investors">
                    {item.logos.map((logo) => (
                      <li key={logo.label} title={logo.label}>
                        {logo.letter}
                      </li>
                    ))}
                  </ul>
                  {item.caption ? (
                    <p className={styles.raiseCaption}>{item.caption}</p>
                  ) : null}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

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
