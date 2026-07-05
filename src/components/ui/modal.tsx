"use client";

import { cn } from "@/lib/utils";

export function Modal({
  open,
  title,
  description,
  children,
  onClose,
  className,
}: {
  open: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[10000] grid place-items-center bg-background/70 p-4 backdrop-blur-sm animate-in fade-in-0 duration-150">
      <div className={cn("w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl shadow-black/20 ring-1 ring-foreground/10 animate-in zoom-in-95 slide-in-from-bottom-2 duration-200", className)}>
        <div className="flex items-start justify-between gap-4 border-b border-border/70 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold tracking-tight">{title}</h2>
            {description && <p className="mt-1 text-sm leading-5 text-muted-foreground">{description}</p>}
          </div>
          <button type="button" onClick={onClose} className="rounded-md px-2 py-1 text-xl leading-none text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Close modal">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
