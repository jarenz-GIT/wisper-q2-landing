"use client";

import { PopupButton } from "@typeform/embed-react";
import "@typeform/embed/build/css/popup.css";

import { useTypeformId } from "@/components/TypeformProvider";

import styles from "./typeform-popup-button.module.css";

/**
 * Opens the Wisper contact Typeform in a full-screen popup overlay.
 * Pass `className` from existing CTA / nav button modules to preserve styling.
 */
export default function TypeformPopupButton({
  className = "",
  children,
  id,
  ...props
}) {
  const typeformId = useTypeformId();
  const mergedClassName = [styles.button, className].filter(Boolean).join(" ");

  return (
    <PopupButton id={id ?? typeformId} className={mergedClassName} {...props}>
      {children}
    </PopupButton>
  );
}
