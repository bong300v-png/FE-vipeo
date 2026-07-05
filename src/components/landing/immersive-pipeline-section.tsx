"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const PipelineCanvas = dynamic(
  () => import("./pipeline-canvas").then((m) => m.PipelineCanvas),
  { ssr: false },
);

const BEATS = [
  {
    tag: "01 — Idea",
    title: "Start with a spark",
    body: "Drop a one-line brief. The director agent expands it into hooks, angles, and a full narrative arc.",
  },
  {
    tag: "02 — Script",
    title: "Scripts that cut themselves",
    body: "Every beat is timed to the frame. Dialogue, B-roll markers, and captions generated in one pass.",
  },
  {
    tag: "03 — Direct",
    title: "AI Director takes the chair",
    body: "Camera moves, pacing, and scene transitions are staged automatically — you approve, it executes.",
  },
  {
    tag: "04 — Render",
    title: "Broadcast-ready output",
    body: "Multi-ratio renders for every platform, delivered with credits metered per second of output.",
  },
];

export function ImmersivePipelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef({ value: 0 });
  const [activeBeat, setActiveBeat] = useState(0);
  const [canvasVisible, setCanvasVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Only mount the WebGL canvas when the section approaches the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setCanvasVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    io.observe(section);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progressRef.current.value = self.progress;
        const idx = Math.min(
          BEATS.length - 1,
          Math.floor(self.progress * BEATS.length),
        );
        setActiveBeat((prev) => (prev === idx ? prev : idx));
      },
    });

    return () => {
      io.disconnect();
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="How the AI video pipeline works"
      className="relative h-[400vh] bg-[#0a0a0c]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 3D scene */}
        <div className="absolute inset-0">
          {canvasVisible ? (
            <PipelineCanvas progressRef={progressRef} />
          ) : (
            <div className="h-full w-full bg-[#0a0a0c]" />
          )}
        </div>

        {/* Vignette + readability scrim */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(5,5,7,0.75)_100%)]"
        />

        {/* Beat copy — bottom left */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6 sm:p-10 lg:p-16">
          <div className="max-w-xl">
            {BEATS.map((beat, i) => (
              <div
                key={beat.tag}
                className={`transition-all duration-700 ${
                  i === activeBeat
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none absolute translate-y-4 opacity-0"
                }`}
              >
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-cine">
                  {beat.tag}
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-balance text-white sm:text-4xl lg:text-5xl">
                  {beat.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                  {beat.body}
                </p>
              </div>
            ))}
          </div>

          {/* Progress rail */}
          <div className="mt-10 flex items-center gap-2">
            {BEATS.map((beat, i) => (
              <div
                key={beat.tag}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === activeBeat ? "w-10 bg-cine" : "w-4 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll hint — top right */}
        <div className="pointer-events-none absolute top-24 right-6 z-10 sm:right-10 lg:right-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
            Scroll to travel the pipeline
          </p>
        </div>
      </div>
    </section>
  );
}
