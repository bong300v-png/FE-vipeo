"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useInView, useReducedMotion } from "./use-motion";

/**
 * A muted looping video that only plays while visible in the viewport,
 * revealed with a cinematic fade/rise. Reduced motion → static poster.
 */
export function LoopVideo({
  src,
  poster,
  className,
  overlay = true,
}: {
  src: string;
  poster: string;
  className?: string;
  overlay?: boolean;
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-1000 ease-out",
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className,
      )}
    >
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className="block size-full object-cover" />
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="block size-full object-cover"
          aria-hidden="true"
        />
      )}
      {overlay && <div className="pointer-events-none absolute inset-0 bg-scrim/40" aria-hidden="true" />}
    </div>
  );
}

/**
 * An image with a subtle depth parallax as it moves through the viewport.
 * Reduced motion → static image.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  strength = 36,
}: {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const frameRef = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    if (reduced) return;
    const container = ref.current;
    const img = imgRef.current;
    if (!container || !img) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 (below viewport) → 1 (above viewport)
      const progress = Math.max(-1, Math.min(1, 1 - (rect.top + rect.height / 2) / (vh / 2)));
      img.style.transform = `scale(1.12) translateY(${(-progress * strength).toFixed(1)}px)`;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      frameRef.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, strength, ref]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-1000 ease-out",
        inView && ready ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imgRef} src={src} alt={alt} className="block size-full object-cover will-change-transform" />
    </div>
  );
}
