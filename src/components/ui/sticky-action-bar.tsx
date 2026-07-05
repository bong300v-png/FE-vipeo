"use client";

import { cn } from "@/lib/utils";

export function StickyActionBar({
  show = true,
  children,
  className,
}: {
  show?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  if (!show) return null;
  return (
    <div className={cn("sticky bottom-4 z-30 mt-6 rounded-2xl border border-border bg-background/85 p-3 shadow-2xl shadow-black/10 ring-1 ring-foreground/10 backdrop-blur-xl animate-in slide-in-from-bottom-2 fade-in-0 duration-200", className)}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {children}
      </div>
    </div>
  );
}
