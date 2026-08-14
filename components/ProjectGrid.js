"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProjectGrid({ caseStudies = [] }) {
  if (!caseStudies.length) return null;

  return (
    <section aria-label="Project grid">
      {caseStudies.map((study) => {
        const href = `/work/${study.slug?.current ?? ""}`;
        const afterSrc =
          study.afterImageUrl ??
          `/images/case-studies/${study.slug?.current}/after.jpg`;

        return (
          <article key={study._id}>
            <Link href={href}>
              <div style={{ position: "relative", aspectRatio: "16/9" }}>
                <Image
                  src={afterSrc}
                  alt={study.afterImage?.alt ?? `${study.clientName} — after`}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p>{study.projectTitle}</p>
              <p>{study.clientName}</p>
            </Link>
          </article>
        );
      })}
    </section>
  );
}
