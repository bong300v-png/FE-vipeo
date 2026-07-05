"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Show, SignUpButton } from "@clerk/nextjs";
import { ChevronRightIcon, SparklesIcon } from "@/components/icons";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";
import { cn } from "@/lib/utils";
import { useCoarsePointer, useReducedMotion } from "./use-motion";

const SCRUB_LERP = 0.14;
const TILT_LERP = 0.09;
const BEAT_KEYS = [
  { title: "landing.hero.beat1.title", body: "landing.hero.beat1.body" },
  { title: "landing.hero.beat2.title", body: "landing.hero.beat2.body" },
  { title: "landing.hero.beat3.title", body: "landing.hero.beat3.body" },
] as const;

/**
 * Apple-style scrollytelling hero:
 * - 400vh sticky section; scroll progress scrubs video.currentTime (rAF + lerp)
 * - cursor-reactive multi-layer parallax/tilt (video, glow, copy move separately)
 * - click triggers a cinematic push-in + light ripple
 * - reduced motion → static poster + copy, no scrub/tilt
 */
export function HeroScrollytelling() {
  const locale = useLocale();
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const videoLayerRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const copyLayerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // animation state kept in refs so the rAF loop never re-renders
  const scrollTarget = useRef(0);
  const scrollCurrent = useRef(0);
  const tiltTarget = useRef({ x: 0, y: 0 });
  const tiltCurrent = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  const [beat, setBeat] = useState(0); // 0 = opening title, 1..3 = story beats
  const [punch, setPunch] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const punchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let running = true;

    const readScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      scrollTarget.current = progress;
      const nextBeat = progress < 0.18 ? 0 : progress < 0.45 ? 1 : progress < 0.75 ? 2 : 3;
      setBeat((prev) => (prev === nextBeat ? prev : nextBeat));
    };

    const loop = () => {
      if (!running) return;
      // --- scroll scrub with lerp ---
      scrollCurrent.current += (scrollTarget.current - scrollCurrent.current) * SCRUB_LERP;
      if (video.duration && video.readyState >= 1) {
        const targetTime = scrollCurrent.current * Math.max(0, video.duration - 0.05);
        if (Math.abs(video.currentTime - targetTime) > 0.02) {
          video.currentTime = targetTime;
        }
      }
      // --- cursor tilt with lerp ---
      tiltCurrent.current.x += (tiltTarget.current.x - tiltCurrent.current.x) * TILT_LERP;
      tiltCurrent.current.y += (tiltTarget.current.y - tiltCurrent.current.y) * TILT_LERP;
      const { x, y } = tiltCurrent.current;
      if (videoLayerRef.current) {
        videoLayerRef.current.style.transform = `rotateX(${(-y * 2.4).toFixed(2)}deg) rotateY(${(x * 2.4).toFixed(2)}deg) translate3d(${(x * 10).toFixed(1)}px, ${(y * 10).toFixed(1)}px, 0) scale(1.06)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${(x * 46).toFixed(1)}px, ${(y * 46).toFixed(1)}px, 0)`;
      }
      if (copyLayerRef.current) {
        copyLayerRef.current.style.transform = `translate3d(${(-x * 16).toFixed(1)}px, ${(-y * 12).toFixed(1)}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    readScroll();
    scrollCurrent.current = scrollTarget.current;
    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", readScroll);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
    };
  }, [reduced]);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduced || coarse) return;
      const rect = event.currentTarget.getBoundingClientRect();
      tiltTarget.current = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    },
    [reduced, coarse],
  );

  const onPointerLeave = useCallback(() => {
    tiltTarget.current = { x: 0, y: 0 };
  }, []);

  const onSceneClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return;
      const host = event.currentTarget;
      const rect = host.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "hero-ripple";
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      host.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
      setPunch(true);
      if (punchTimer.current) clearTimeout(punchTimer.current);
      punchTimer.current = setTimeout(() => setPunch(false), 750);
    },
    [reduced],
  );

  useEffect(() => () => {
    if (punchTimer.current) clearTimeout(punchTimer.current);
  }, []);

  const openingVisible = reduced || beat === 0;

  return (
    <section ref={sectionRef} className={reduced ? "relative" : "relative h-[400vh]"} aria-label={t(locale, "landing.badge")}>
      <div
        ref={stickyRef}
        className={cn("overflow-hidden", reduced ? "relative h-[85svh] min-h-[540px]" : "sticky top-0 h-svh")}
        style={{ perspective: "1200px" }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onClick={onSceneClick}
      >
        {/* Layer 1: video */}
        <div
          ref={videoLayerRef}
          className={cn(
            "absolute inset-0 will-change-transform transition-none",
            punch && "hero-punch",
          )}
          style={{ transform: "scale(1.06)" }}
        >
          {reduced ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/images/hero-poster.jpg" alt="" className="size-full object-cover" />
          ) : (
            <video
              ref={videoRef}
              src="/videos/hero-director.mp4"
              poster="/images/hero-poster.jpg"
              muted
              playsInline
              preload="auto"
              className={cn("size-full object-cover transition-opacity duration-700", videoReady ? "opacity-100" : "opacity-0")}
              onLoadedData={() => setVideoReady(true)}
              aria-hidden="true"
            />
          )}
          {!videoReady && !reduced && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/images/hero-poster.jpg" alt="" className="absolute inset-0 size-full object-cover" aria-hidden="true" />
          )}
        </div>

        {/* Layer 2: adaptive scrim + cursor-following glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-scrim via-scrim to-scrim-strong" aria-hidden="true" />
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 size-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cine/10 blur-3xl will-change-transform"
          aria-hidden="true"
        />

        {/* Layer 3: copy */}
        <div ref={copyLayerRef} className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center will-change-transform">
          {/* Opening beat */}
          <div
            className={cn(
              "flex max-w-3xl flex-col items-center transition-all duration-700",
              openingVisible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-6 opacity-0",
            )}
            aria-hidden={!openingVisible}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cine-foreground/25 bg-scrim-strong px-3 py-1 text-sm text-cine-foreground/90 backdrop-blur">
              <SparklesIcon className="size-4 text-cine" />
              {t(locale, "landing.badge")}
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-cine-foreground text-balance sm:text-5xl lg:text-6xl">
              {t(locale, "landing.title")}
            </h1>
            <p className="mt-5 max-w-2xl text-base text-cine-foreground/80 text-pretty sm:text-lg">
              {t(locale, "landing.body")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Show when="signed-out">
                <SignUpButton mode="modal">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 rounded-lg bg-cine px-5 py-3 text-sm font-medium text-primary shadow-lg hover:bg-cine/90 dark:text-background"
                  >
                    {t(locale, "landing.start")}
                    <ChevronRightIcon className="size-4" />
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <Link
                  href="/dashboard"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 rounded-lg bg-cine px-5 py-3 text-sm font-medium text-primary shadow-lg hover:bg-cine/90 dark:text-background"
                >
                  {t(locale, "cta.openDirector")}
                  <ChevronRightIcon className="size-4" />
                </Link>
              </Show>
              <Link
                href="#skills"
                onClick={(e) => e.stopPropagation()}
                className="rounded-lg border border-cine-foreground/30 bg-scrim px-5 py-3 text-sm font-medium text-cine-foreground backdrop-blur hover:bg-scrim-strong"
              >
                {t(locale, "landing.explore")}
              </Link>
            </div>
          </div>

          {/* Story beats (scrub-driven) */}
          {!reduced &&
            BEAT_KEYS.map((keys, index) => {
              const active = beat === index + 1;
              return (
                <div
                  key={keys.title}
                  className={cn(
                    "absolute inset-x-4 bottom-[16svh] mx-auto max-w-xl transition-all duration-700 sm:inset-x-auto",
                    active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0",
                  )}
                  aria-hidden={!active}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-cine">{`0${index + 1}`}</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight text-cine-foreground text-balance sm:text-4xl">
                    {t(locale, keys.title)}
                  </h2>
                  <p className="mt-3 text-base text-cine-foreground/80 text-pretty">{t(locale, keys.body)}</p>
                </div>
              );
            })}
        </div>

        {/* Hints */}
        {!reduced && (
          <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex flex-col items-center gap-1.5 text-xs text-cine-foreground/60">
            <span className="animate-bounce" aria-hidden="true">
              <svg viewBox="0 0 16 16" className="size-4 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6l5 5 5-5" />
              </svg>
            </span>
            <p>{t(locale, "landing.hero.scroll")}</p>
            {!coarse && <p className="hidden sm:block">{t(locale, "landing.hero.click")}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
