"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Toast = { id: number; title: string; description?: string; variant?: "default" | "success" | "destructive" };

type ToastContextValue = {
  toast: (toast: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((next: Omit<Toast, "id">) => {
    const id = Date.now();
    setToasts((items) => [...items, { ...next, id }]);
    window.setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 2800);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-[10050] flex w-[360px] max-w-[calc(100vw-2rem)] flex-col gap-2 pointer-events-none">
        {toasts.map((item) => (
          <div
            key={item.id}
            className={cn(
              "pointer-events-auto rounded-xl border bg-popover/95 p-4 text-popover-foreground shadow-2xl shadow-black/10 ring-1 ring-foreground/10 backdrop-blur animate-in slide-in-from-bottom-3 fade-in-0 duration-200",
              item.variant === "success" && "border-emerald-500/30",
              item.variant === "destructive" && "border-destructive/40"
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-0.5 size-2.5 rounded-full bg-primary shadow-[0_0_16px_rgba(59,130,246,.55)]",
                  item.variant === "success" && "bg-emerald-500 shadow-[0_0_16px_rgba(16,185,129,.55)]",
                  item.variant === "destructive" && "bg-destructive shadow-[0_0_16px_rgba(239,68,68,.55)]"
                )}
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-none">{item.title}</p>
                {item.description && <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{item.description}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
