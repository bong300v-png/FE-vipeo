"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function NavigationLoading() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) return;
    const done = window.setTimeout(() => setLoading(false), 520);
    return () => window.clearTimeout(done);
  }, [pathname, loading]);

  useEffect(() => {
    let timer: number | undefined;
    const start = (event: MouseEvent) => {
      const el = (event.target as Element | null)?.closest?.("a[href],button[type='submit']") as HTMLAnchorElement | null;
      if (!el || el.target === "_blank" || event.metaKey || event.ctrlKey) return;
      const href = el.getAttribute("href");
      if (href && (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:"))) return;
      setLoading(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setLoading(false), 1800);
    };
    document.addEventListener("click", start, true);
    return () => {
      document.removeEventListener("click", start, true);
      window.clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[10001] h-1 overflow-hidden bg-primary/10">
        <div className="h-full w-1/2 animate-[route-progress_1.15s_cubic-bezier(.65,0,.35,1)_infinite] rounded-full bg-gradient-to-r from-transparent via-primary to-blue-400 shadow-[0_0_24px_rgba(59,130,246,.55)]" />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[10000] grid place-items-center bg-background/10 backdrop-blur-[1px]">
        <div className="flex items-center gap-3 rounded-full border border-border bg-popover/85 px-4 py-2 text-xs font-medium text-foreground shadow-xl shadow-black/10 ring-1 ring-foreground/10 animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="relative size-4">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
          </div>
          Loading
        </div>
      </div>
    </>
  );
}
