"use client";

import { useEffect, useState } from "react";
import { getStoredLocale, localeNames, locales, setStoredLocale, tx } from "@/lib/i18n";
import { SunIcon, MoonIcon } from "@/components/icons";
import { useLocale } from "@/lib/use-locale";
import type { Locale } from "@/types";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function LocaleSwitcher() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    setLocale(getStoredLocale());
    const sync = () => setLocale(getStoredLocale());
    window.addEventListener("vipeo:locale-change", sync);
    return () => window.removeEventListener("vipeo:locale-change", sync);
  }, []);

  const onChange = (value: Locale) => {
    setLocale(value);
    setStoredLocale(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group/button hover:bg-muted text-muted-foreground hover:text-foreground flex h-8 items-center justify-center gap-x-1.5 rounded-lg px-2.5 text-[0.8rem] font-medium transition-colors cursor-pointer border border-border bg-background select-none active:scale-95 duration-100 outline-none">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
        <span>{localeNames[locale]}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3 opacity-60 ml-0.5"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[130px]">
        {locales.map((value) => (
          <DropdownMenuItem
            key={value}
            onClick={() => onChange(value)}
            className={`cursor-pointer ${
              locale === value ? "font-semibold text-primary" : ""
            }`}
          >
            <span className="flex-1">{localeNames[value]}</span>
            {locale === value && <span className="text-xs text-primary">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ThemeToggle() {
  const locale = useLocale();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Determine initial theme on mount
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={tx(locale, "Toggle theme")}
      className="hover:bg-muted text-muted-foreground hover:text-foreground flex size-8 items-center justify-center rounded-lg transition-colors cursor-pointer active:scale-95 duration-100"
    >
      <div className="relative size-4 flex items-center justify-center overflow-hidden">
        <div
          className={`absolute transition-all duration-500 transform ${
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          }`}
        >
          <SunIcon className="size-4" />
        </div>
        <div
          className={`absolute transition-all duration-500 transform ${
            theme === "light"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        >
          <MoonIcon className="size-4" />
        </div>
      </div>
    </button>
  );
}
