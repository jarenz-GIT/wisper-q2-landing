"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./LensDistortion.module.css";

/* --------------------------------------------------------------------------
   Tunable lens parameters — also mirrored as CSS custom properties on .root
   -------------------------------------------------------------------------- */
/** Strength of the fisheye bulge. Barely readable at the default. */
export const LENS_DISTORTION = 0.04;
/** How far R/G/B split at the edges. Faint fringe only. */
export const LENS_ABERRATION = 0.01;
/**
 * Color-split mode. "lateral" = channels separate radially outward from the
 * center (quiet core, fringe at the edges). Not a depth cue or a horizontal band.
 */
export const LENS_MODE = "lateral";
/** Point the bulge and aberration radiate from, in viewport percentages. */
export const LENS_CENTER_POINT = "50% 50%";

const FILTER_ID = "lensDistortion";
const MAP_SIZE = 512;

function parseCenterPoint(value) {
  const parts = String(value)
    .trim()
    .split(/[\s,]+/)
    .map((part) => Number.parseFloat(part) / 100);
  const x = Number.isFinite(parts[0]) ? parts[0] : 0.5;
  const y = Number.isFinite(parts[1]) ? parts[1] : 0.5;
  return {
    x: Math.min(1, Math.max(0, x)),
    y: Math.min(1, Math.max(0, y)),
  };
}

function readCssNumber(style, name, fallback) {
  const next = Number.parseFloat(style.getPropertyValue(name).trim());
  return Number.isFinite(next) ? next : fallback;
}

function supportsSvgFilterOnHtml() {
  if (typeof document === "undefined") return false;
  const probe = document.createElement("div");
  probe.style.filter = `url(#${FILTER_ID})`;
  const applied = probe.style.filter || probe.style.webkitFilter || "";
  return applied.includes("url");
}

function encodeChannel(offset, maxOffset) {
  const normalized = offset / maxOffset;
  return Math.round(Math.min(255, Math.max(0, (normalized * 0.5 + 0.5) * 255)));
}

/**
 * Radial barrel-distortion displacement map.
 * displaced_radius = radius * (1 + distortion * (radius / maxRadius)^2)
 * R = X offset, G = Y offset, 128 = no displacement.
 */
export function createDisplacementMapDataUri({
  size = MAP_SIZE,
  distortion = LENS_DISTORTION,
  centerX = 0.5,
  centerY = 0.5,
} = {}) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const image = ctx.createImageData(size, size);
  const pixels = image.data;
  const cx = centerX * (size - 1);
  const cy = centerY * (size - 1);
  const maxRadius = Math.hypot(
    Math.max(cx, size - 1 - cx),
    Math.max(cy, size - 1 - cy),
  );
  const maxOffset = Math.max(distortion * maxRadius, 1e-6);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dx = x - cx;
      const dy = y - cy;
      const radius = Math.hypot(dx, dy);
      let ox = 0;
      let oy = 0;

      if (radius > 0 && maxRadius > 0) {
        const ratio = radius / maxRadius;
        const sourceRadius = radius / (1 + distortion * ratio * ratio);
        const factor = sourceRadius / radius;
        ox = dx * factor - dx;
        oy = dy * factor - dy;
      }

      const i = (y * size + x) * 4;
      pixels[i] = encodeChannel(ox, maxOffset);
      pixels[i + 1] = encodeChannel(oy, maxOffset);
      pixels[i + 2] = 128;
      pixels[i + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL("image/png");
}

function displacementScale(amount, viewportWidth, viewportHeight, center) {
  const cx = center.x * viewportWidth;
  const cy = center.y * viewportHeight;
  const maxRadius = Math.hypot(
    Math.max(cx, viewportWidth - cx),
    Math.max(cy, viewportHeight - cy),
  );
  return 2 * amount * maxRadius;
}

export default function LensDistortion({ children }) {
  const rootRef = useRef(null);
  const contentRef = useRef(null);
  const filterRef = useRef(null);
  const mapImageRef = useRef(null);
  const displaceRRef = useRef(null);
  const displaceGRef = useRef(null);
  const displaceBRef = useRef(null);
  const offsetRRef = useRef(null);
  const offsetBRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [mapUri, setMapUri] = useState("");

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setEnabled(supportsSvgFilterOnHtml() && !motionQuery.matches);
    };
    update();
    motionQuery.addEventListener("change", update);
    return () => motionQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setMapUri("");
      return undefined;
    }

    const computed = rootRef.current ? getComputedStyle(rootRef.current) : null;
    const distortion = computed
      ? readCssNumber(computed, "--lens-distortion", LENS_DISTORTION)
      : LENS_DISTORTION;
    const center = parseCenterPoint(
      computed?.getPropertyValue("--lens-center-point") || LENS_CENTER_POINT,
    );

    setMapUri(
      createDisplacementMapDataUri({
        size: MAP_SIZE,
        distortion,
        centerX: center.x,
        centerY: center.y,
      }),
    );
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !mapUri) return undefined;

    const computed = rootRef.current ? getComputedStyle(rootRef.current) : null;
    const distortion = computed
      ? readCssNumber(computed, "--lens-distortion", LENS_DISTORTION)
      : LENS_DISTORTION;
    const aberration = computed
      ? readCssNumber(computed, "--lens-aberration", LENS_ABERRATION)
      : LENS_ABERRATION;
    const mode =
      (computed?.getPropertyValue("--lens-mode").trim() || LENS_MODE) || LENS_MODE;
    const center = parseCenterPoint(
      computed?.getPropertyValue("--lens-center-point") || LENS_CENTER_POINT,
    );

    const syncPrimitives = () => {
      const content = contentRef.current;
      const filter = filterRef.current;
      const mapImage = mapImageRef.current;
      if (!content || !filter || !mapImage) return;

      const width = Math.max(content.scrollWidth, content.clientWidth, 1);
      const height = Math.max(content.scrollHeight, content.clientHeight, 1);
      const viewW = window.innerWidth;
      const viewH = window.innerHeight;
      const rect = content.getBoundingClientRect();

      filter.setAttribute("x", "-24");
      filter.setAttribute("y", "-24");
      filter.setAttribute("width", String(width + 48));
      filter.setAttribute("height", String(height + 48));

      mapImage.setAttribute("x", String(-rect.left));
      mapImage.setAttribute("y", String(-rect.top));
      mapImage.setAttribute("width", String(viewW));
      mapImage.setAttribute("height", String(viewH));

      const bulgeScale = displacementScale(distortion, viewW, viewH, center);
      const redScale = displacementScale(distortion + aberration, viewW, viewH, center);
      const blueScale = displacementScale(
        Math.max(0, distortion - aberration),
        viewW,
        viewH,
        center,
      );

      displaceGRef.current?.setAttribute("scale", String(bulgeScale));

      if (mode === "lateral") {
        displaceRRef.current?.setAttribute("scale", String(redScale));
        displaceBRef.current?.setAttribute("scale", String(blueScale));
        offsetRRef.current?.setAttribute("dx", "0");
        offsetRRef.current?.setAttribute("dy", "0");
        offsetBRef.current?.setAttribute("dx", "0");
        offsetBRef.current?.setAttribute("dy", "0");
      } else {
        displaceRRef.current?.setAttribute("scale", String(bulgeScale));
        displaceBRef.current?.setAttribute("scale", String(bulgeScale));
        const px = aberration * Math.max(viewW, viewH);
        offsetRRef.current?.setAttribute("dx", String(-px));
        offsetRRef.current?.setAttribute("dy", "0");
        offsetBRef.current?.setAttribute("dx", String(px));
        offsetBRef.current?.setAttribute("dy", "0");
      }
    };

    let frame = 0;
    const onScrollOrResize = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        syncPrimitives();
      });
    };

    const startId = window.requestAnimationFrame(syncPrimitives);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.cancelAnimationFrame(startId);
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [enabled, mapUri]);

  const filterActive = enabled && Boolean(mapUri);

  return (
    <div ref={rootRef} className={styles.root} data-lens-mode={LENS_MODE}>
      <svg
        className={styles.svg}
        aria-hidden="true"
        focusable="false"
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <filter
            ref={filterRef}
            id={FILTER_ID}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            primitiveUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="100%"
            height="100%"
          >
            <feFlood floodColor="#808080" result="identityMap" />
            <feImage
              ref={mapImageRef}
              href={mapUri || undefined}
              xlinkHref={mapUri || undefined}
              preserveAspectRatio="none"
              result="viewportMap"
            />
            <feComposite
              in="viewportMap"
              in2="identityMap"
              operator="over"
              result="displacementMap"
            />

            <feDisplacementMap
              ref={displaceRRef}
              in="SourceGraphic"
              in2="displacementMap"
              xChannelSelector="R"
              yChannelSelector="G"
              scale="0"
              result="bulgeR"
            />
            <feOffset ref={offsetRRef} in="bulgeR" dx="0" dy="0" result="shiftR" />
            <feColorMatrix
              in="shiftR"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="channelR"
            />

            <feDisplacementMap
              ref={displaceGRef}
              in="SourceGraphic"
              in2="displacementMap"
              xChannelSelector="R"
              yChannelSelector="G"
              scale="0"
              result="bulgeG"
            />
            <feColorMatrix
              in="bulgeG"
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="channelG"
            />

            <feDisplacementMap
              ref={displaceBRef}
              in="SourceGraphic"
              in2="displacementMap"
              xChannelSelector="R"
              yChannelSelector="G"
              scale="0"
              result="bulgeB"
            />
            <feOffset ref={offsetBRef} in="bulgeB" dx="0" dy="0" result="shiftB" />
            <feColorMatrix
              in="shiftB"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="channelB"
            />

            <feComposite
              in="channelR"
              in2="channelG"
              operator="arithmetic"
              k1="0"
              k2="1"
              k3="1"
              k4="0"
              result="channelRG"
            />
            <feComposite
              in="channelRG"
              in2="channelB"
              operator="arithmetic"
              k1="0"
              k2="1"
              k3="1"
              k4="0"
              result="channelRGB"
            />
            <feComposite in="channelRGB" in2="SourceAlpha" operator="in" />
          </filter>
        </defs>
      </svg>
      <div
        ref={contentRef}
        className={filterActive ? styles.contentFiltered : styles.content}
      >
        {children}
      </div>
    </div>
  );
}
