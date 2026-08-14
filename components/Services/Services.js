"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import { POP_IN_STAGGER, runPopIn, setPopInVisible } from "@/lib/gsap-pop-in";

import styles from "./Services.module.css";

const PRICING_HREF = "/pricing";

const SERVICES = [
  {
    id: "brand",
    nodeId: "812:3400",
    borderClassName: styles.cardBrand,
    imageSrc: "/images/services/brand-card-img.png",
    imageAlt: "Brand identity and packaging preview",
    numberTag: "01 / Brand",
    title: "Brand",
    description:
      "Identity systems, packaging and voice. The long-form story that makes you recognizable from across the room",
    tags: ["Logo & System", "Packaging", "Voice + Positioning", "Supply Chain Partner"],
    href: PRICING_HREF,
  },
  {
    id: "website",
    nodeId: "812:3420",
    borderClassName: styles.cardWebsite,
    imageSrc: "/images/services/website-card-img.png",
    imageAlt: "Website design preview",
    numberTag: "02 / WEBSITE",
    title: "Website",
    description:
      "Shopify and bespoke builds with a UX audit baked in. Where discovery turns into decisions.",
    tags: [
      "Shopify",
      "Framer",
      "Ecommerce",
      "UX Audit",
      "Animation",
      "3PL Partner",
    ],
    href: PRICING_HREF,
  },
  {
    id: "media",
    nodeId: "812:3483",
    borderClassName: styles.cardMedia,
    imageSrc: "/images/services/media-card-img.png",
    imageAlt: "Media production preview",
    numberTag: "03 / Media",
    title: "Media",
    description:
      "Photography, short-form and storytelling. The proof that turns a brand from flat into felt by the audience.",
    tags: [
      "Photography",
      "Videography",
      "Paid Ads",
      "Social Media Strategy",
      "Launch Campaigns",
    ],
    href: PRICING_HREF,
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const cardsList = cardsRef.current;
    if (!section || !cardsList) return;

    const cards = gsap.utils.toArray(`.${styles.card}`, cardsList);
    if (!cards.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      cards.forEach(setPopInVisible);
      return;
    }

    cards.forEach((card) =>
      gsap.set(card, { scale: 0.3, opacity: 0, transformOrigin: "50% 50%" }),
    );

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardsList,
        start: "top 85%",
        once: true,
        onEnter: () => {
          cards.forEach((card, index) => {
            runPopIn(card, { delay: index * POP_IN_STAGGER });
          });
        },
      });
    }, section);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.servicesSection}
      aria-label="Services"
      data-nav-logo="navy"
      data-node-id="812:3389"
    >
      <div className={styles.servicesInner} data-node-id="812:3390">
        <header className={styles.titleBlock} data-node-id="812:3391">
          <p className={styles.subtitle} data-node-id="812:3392">
            <span aria-hidden="true">-</span>
            <span>OUR PILLARS OF CREATION</span>
            <span aria-hidden="true">-</span>
          </p>
          <div className={styles.headline} data-node-id="812:3396">
            <p className={styles.headlineSans} data-node-id="812:3397">
              Identity. Website. Stories.
            </p>
            <p className={styles.headlineSerif} data-node-id="812:3398">
              One studio, built around you.
            </p>
          </div>
        </header>

        <ul ref={cardsRef} className={styles.cards} data-node-id="812:3399">
          {SERVICES.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CardArrowIcon() {
  return (
    <svg
      className={styles.cardArrowIcon}
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8.25026 1.50256C8.05141 1.50256 7.86071 1.58155 7.72011 1.72215C7.5795 1.86276 7.50051 2.05346 7.50051 2.2523V6.44337L1.28513 0.220494C1.14395 0.079314 0.95247 0 0.752812 0C0.553154 0 0.361673 0.079314 0.220494 0.220494C0.079314 0.361673 0 0.553154 0 0.752812C0 0.95247 0.079314 1.14395 0.220494 1.28513L6.44337 7.50051H2.2523C2.05346 7.50051 1.86276 7.5795 1.72215 7.72011C1.58155 7.86071 1.50256 8.05141 1.50256 8.25026C1.50256 8.4491 1.58155 8.6398 1.72215 8.78041C1.86276 8.92101 2.05346 9 2.2523 9H8.25026C8.4491 9 8.6398 8.92101 8.78041 8.78041C8.92101 8.6398 9 8.4491 9 8.25026V2.2523C9 2.05346 8.92101 1.86276 8.78041 1.72215C8.6398 1.58155 8.4491 1.50256 8.25026 1.50256Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ServiceCard({ service }) {
  return (
    <article
      className={`${styles.card} ${service.borderClassName}`}
      data-node-id={service.nodeId}
    >
      <Link href={service.href} className={styles.cardLink}>
        <div className={styles.cardImageWrap}>
          <Image
            src={service.imageSrc}
            alt={service.imageAlt}
            fill
            className={styles.cardImage}
            sizes="(max-width: 767px) 100vw, 33vw"
          />
          <span className={styles.cardNumberTag}>{service.numberTag}</span>
        </div>

        <div className={styles.cardBody}>
          <div className={styles.cardHeader}>
            <p className={styles.cardTitle}>{service.title}</p>
            <span className={styles.cardArrow} aria-hidden="true">
              <CardArrowIcon />
            </span>
          </div>

          <div className={styles.cardContent}>
            <p className={styles.cardDescription}>{service.description}</p>
            <ul className={styles.cardTags} aria-label={`${service.title} capabilities`}>
              {service.tags.map((tag) => (
                <li key={tag}>
                  <span className={styles.cardTag}>{tag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </article>
  );
}
