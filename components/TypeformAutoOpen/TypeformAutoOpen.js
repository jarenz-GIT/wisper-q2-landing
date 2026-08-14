"use client";

import { useEffect, useRef } from "react";

import TypeformPopupButton from "@/components/TypeformPopupButton";

import styles from "./TypeformAutoOpen.module.css";

export default function TypeformAutoOpen() {
  const triggerWrapRef = useRef(null);

  useEffect(() => {
    const trigger = triggerWrapRef.current?.querySelector("button");

    trigger?.click();
  }, []);

  return (
    <div ref={triggerWrapRef} className={styles.trigger} aria-hidden="true">
      <TypeformPopupButton>Open contact form</TypeformPopupButton>
    </div>
  );
}
