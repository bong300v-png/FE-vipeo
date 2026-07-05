"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useEffect, useState } from "react";
import type { ComponentProps } from "react";

type ClerkAppearance = ComponentProps<typeof ClerkProvider>["appearance"];

export function ClerkThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Initial sync on mount
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    // Observe changes to html classList
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        elements: {
          footer: { display: "none" },
          modalBackdrop: {
            backdropFilter: "blur(8px)",
            backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.45)" : "rgba(255, 255, 255, 0.3)",
          },
          modalContent: {
            paddingTop: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        },
      } as unknown as ClerkAppearance}
      localization={{
        signIn: {
          start: {
            title: "Sign in to Vipeo",
            subtitle: "to continue to AI Director Studio",
          },
        },
        signUp: {
          start: {
            title: "Create your Vipeo account",
            subtitle: "to get started with AI Director Studio",
          },
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
