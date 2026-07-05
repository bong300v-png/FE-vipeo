"use client";

import { useEffect, useState } from "react";
import { getStoredLocale } from "@/lib/i18n";

export function useLocale() {
  const [locale, setLocale] = useState(getStoredLocale());

  useEffect(() => {
    const sync = () => setLocale(getStoredLocale());
    sync();
    window.addEventListener("vipeo:locale-change", sync);
    return () => window.removeEventListener("vipeo:locale-change", sync);
  }, []);

  return locale;
}
