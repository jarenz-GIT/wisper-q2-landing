"use client";

import { createContext, useContext } from "react";

import { WISPER_CONTACT_TYPEFORM_ID } from "@/lib/typeform";

const TypeformContext = createContext(WISPER_CONTACT_TYPEFORM_ID);

export function TypeformProvider({ typeformId, children }) {
  return (
    <TypeformContext.Provider value={typeformId || WISPER_CONTACT_TYPEFORM_ID}>
      {children}
    </TypeformContext.Provider>
  );
}

export function useTypeformId() {
  return useContext(TypeformContext);
}
