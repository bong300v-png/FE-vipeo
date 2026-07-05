"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { tx } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";

/* ---------------------------------- clock --------------------------------- */

function LocalClock() {
  const [time, setTime] = useState("--:-- --");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Ho_Chi_Minh",
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{time}</span>;
}

/* ------------------------------ callout line ------------------------------ */

function Callout({
  label,
  className,
  lineClassName,
  flip = false,
}: {
  label: string;
  className?: string;
  lineClassName?: string;
  flip?: boolean;
}) {
  return (
    <div className={`pointer-events-none absolute z-30 hidden lg:block ${className ?? ""}`} data-callout>
      <div className={`flex items-start gap-0 ${flip ? "flex-row-reverse" : ""}`}>
        {/* marker square */}
        <span className="mt-[-7px] flex size-[18px] shrink-0 items-center justify-center border border-black bg-white">
          <span className="size-[7px] bg-black" />
        </span>
        {/* elbow line */}
        <svg
          width="120"
          height="56"
          viewBox="0 0 120 56"
          fill="none"
          aria-hidden="true"
          className={`${flip ? "-scale-x-100" : ""} ${lineClassName ?? ""}`}
        >
          <path d="M0 1H70L119 50" stroke="black" strokeWidth="1.5" transform={flip ? "" : "translate(0,54) scale(1,-1)"} />
        </svg>
      </div>
      <p
        className={`max-w-[210px] font-mono text-[10px] font-semibold uppercase leading-snug tracking-wide text-black ${
          flip ? "mr-[132px] text-right" : "ml-[132px]"
        } mt-[-14px]`}
      >
        {label}
      </p>
    </div>
  );
}

/* ------------------------------ 3D primitives ----------------------------- */

/**
 * All scene children live inside an isometric world:
 * parent has rotateX(~60deg) rotateZ(~-45deg), preserve-3d.
 * - Flat items sit on the floor plane (z = translateZ)
 * - "Standing" items use an extra rotateX(-90deg) to stand upright
 */

function Plate({
  x,
  y,
  z = 0,
  w,
  d,
  className,
  children,
}: {
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`absolute ${className ?? ""}`}
      style={{
        left: x,
        top: y,
        width: w,
        height: d,
        transform: `translateZ(${z}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

function Standing({
  x,
  y,
  z = 0,
  w,
  h,
  rotateZ = 0,
  className,
  children,
}: {
  x: number;
  y: number;
  z?: number;
  w: number;
  h: number;
  rotateZ?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`absolute ${className ?? ""}`}
      style={{
        left: x,
        top: y,
        width: w,
        height: h,
        transformOrigin: "bottom center",
        transform: `translateZ(${z}px) rotateZ(${rotateZ}deg) rotateX(-90deg)`,
        transformStyle: "preserve-3d",
        backfaceVisibility: "visible",
      }}
    >
      {children}
    </div>
  );
}

/* --------------------------------- studio --------------------------------- */

function StudioScene({
  tiltRef,
  sceneRef,
}: {
  tiltRef: React.RefObject<HTMLDivElement | null>;
  sceneRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      className="relative mx-auto"
      style={{ perspective: 1400, width: 560, height: 560 }}
      aria-hidden="true"
    >
      {/* tilt layer: GSAP rotationX only (applied FIRST, like the original rotateX→rotateZ order) */}
      <div
        ref={tiltRef}
        className="absolute inset-0 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
      {/* spin layer: GSAP rotationZ only */}
      <div
        ref={sceneRef}
        data-scene
        className="absolute left-1/2 top-1/2 will-change-transform"
        style={{
          width: 400,
          height: 400,
          marginLeft: -200,
          marginTop: -230,
          transformStyle: "preserve-3d",
        }}
      >
        {/* floor slab */}
        <Plate x={0} y={0} w={400} d={400} className="rounded-[6px] bg-[#efe9df] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.45)]">
          {/* parquet grid */}
          <div
            className="absolute inset-3 rounded-[4px] opacity-70"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0 38px, rgba(120,90,50,0.25) 38px 40px), repeating-linear-gradient(90deg, transparent 0 38px, rgba(120,90,50,0.25) 38px 40px)",
              backgroundColor: "#e5d9c4",
            }}
          />
          {/* rug */}
          <div
            className="absolute left-[110px] top-[120px] h-[190px] w-[190px] rounded-[4px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #1c1c1c 0 14px, #f5f2ec 14px 28px)",
              opacity: 0.85,
            }}
          />
        </Plate>

        {/* floor edge (thickness illusion) */}
        <Plate x={0} y={0} z={-10} w={400} d={400} className="rounded-[6px] bg-[#b6a488]" />

        {/* wall A — back-left, runs along X at y=0 */}
        <Standing x={0} y={-70} w={400} h={150} className="origin-bottom">
          <div className="absolute inset-0 rounded-t-[4px] bg-[#f7f5f0] shadow-[inset_0_-20px_40px_rgba(0,0,0,0.06)]">
            {/* window */}
            <div className="absolute right-[52px] top-[22px] h-[86px] w-[74px] border-[5px] border-[#2b2b2b] bg-gradient-to-b from-[#dff1ff] to-[#f9fbff]">
              <div className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-[#2b2b2b]" />
              <div className="absolute top-1/2 left-0 h-[3px] w-full -translate-y-1/2 bg-[#2b2b2b]" />
            </div>
            {/* art frame */}
            <div className="absolute left-[70px] top-[30px] h-[62px] w-[50px] border-[4px] border-[#1e1e1e] bg-white p-[5px]">
              <div className="size-full" style={{ background: "conic-gradient(from 45deg, #facc15 0 25%, #111 25% 50%, #e5e5e5 50% 75%, #facc15 75%)" }} />
            </div>
            {/* clock */}
            <div className="absolute left-[160px] top-[26px] flex size-[40px] items-center justify-center rounded-full border-[3px] border-[#1e1e1e] bg-white">
              <div className="absolute h-[13px] w-[2px] origin-bottom translate-y-[-6px] rotate-45 bg-black" />
              <div className="absolute h-[9px] w-[2px] origin-bottom translate-y-[-4px] rotate-[130deg] bg-black" />
            </div>
          </div>
        </Standing>

        {/* wall B — back-right, runs along Y near x=320 (rotZ 90 standing) */}
        <Standing x={120} y={50} w={400} h={150} rotateZ={90} className="origin-bottom">
          <div className="absolute inset-0 rounded-t-[4px] bg-[#26221f] shadow-[inset_0_-24px_40px_rgba(0,0,0,0.35)]">
            {/* wood slats */}
            <div
              className="absolute inset-y-0 left-[54px] w-[110px]"
              style={{ backgroundImage: "repeating-linear-gradient(90deg, #6b4f35 0 12px, #574029 12px 16px)" }}
            />
            {/* logo glow */}
            <div className="absolute right-[70px] top-[36px] flex h-[38px] items-center gap-1 px-2">
              <span className="font-mono text-[20px] font-black tracking-tight text-[#facc15] drop-shadow-[0_0_14px_rgba(250,204,21,0.9)]">VIPEO</span>
            </div>
            {/* speaker */}
            <div className="absolute left-[14px] bottom-0 h-[64px] w-[30px] bg-[#111]">
              <div className="mx-auto mt-2 size-[18px] rounded-full border-2 border-[#333] bg-[#0a0a0a]" />
              <div className="mx-auto mt-1 size-[10px] rounded-full border border-[#333] bg-[#0a0a0a]" />
            </div>
          </div>
        </Standing>

        {/* desk: legs shadow block + top */}
        <Plate x={120} y={96} z={0} w={170} d={96} className="rounded-[3px] bg-black/15 blur-[2px]" />
        <Plate x={116} y={90} z={46} w={178} d={104} className="rounded-[4px] bg-[#c89a63] shadow-[0_18px_30px_rgba(0,0,0,0.28)]">
          {/* desk items: keyboard */}
          <div className="absolute left-[66px] top-[58px] h-[22px] w-[56px] rounded-[2px] bg-[#1b1b1b]" />
          {/* mouse */}
          <div className="absolute left-[132px] top-[62px] h-[12px] w-[8px] rounded-full bg-[#facc15]" />
          {/* coffee */}
          <div className="absolute left-[18px] top-[16px] size-[14px] rounded-full border-2 border-[#3a2c1c] bg-[#6b4226]" />
        </Plate>

        {/* monitors standing on desk */}
        <Standing x={136} y={112} z={46} w={64} h={44} rotateZ={-6}>
          <div className="absolute inset-0 rounded-[3px] border-[3px] border-[#141414] bg-[#0c0c0c] p-[2px]">
            <div className="size-full rounded-[1px]" style={{ background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 55%, #06b6d4 100%)" }}>
              <div className="ml-[6px] mt-[6px] h-[3px] w-[26px] bg-white/80" />
              <div className="ml-[6px] mt-[3px] h-[3px] w-[16px] bg-white/50" />
            </div>
          </div>
        </Standing>
        <Standing x={206} y={108} z={46} w={58} h={40} rotateZ={8}>
          <div className="absolute inset-0 rounded-[3px] border-[3px] border-[#141414] bg-[#0c0c0c] p-[2px]">
            <div className="size-full rounded-[1px] bg-[#111]">
              <div className="mx-auto mt-[6px] h-[16px] w-[34px] rounded-[2px]" style={{ background: "linear-gradient(120deg, #f97316, #ef4444)" }} />
              <div className="mx-auto mt-[3px] h-[2px] w-[28px] bg-[#facc15]" />
            </div>
          </div>
        </Standing>

        {/* chair (yellow accent) */}
        <Plate x={190} y={230} z={0} w={54} d={54} className="rounded-full bg-black/15 blur-[2px]" />
        <Plate x={192} y={232} z={26} w={50} d={50} className="rounded-[10px] bg-[#facc15] shadow-[0_10px_18px_rgba(0,0,0,0.25)]" />
        <Standing x={192} y={262} z={26} w={50} h={44}>
          <div className="absolute inset-0 rounded-t-[12px] bg-[#eab308]" />
        </Standing>

        {/* camera tripod */}
        <Plate x={60} y={250} z={0} w={44} d={44} className="rounded-full bg-black/15 blur-[2px]" />
        <Standing x={58} y={272} z={0} w={48} h={92}>
          <div className="absolute bottom-0 left-1/2 h-[64px] w-[4px] -translate-x-1/2 bg-[#1c1c1c]" />
          <div className="absolute bottom-0 left-[8px] h-[54px] w-[3px] rotate-[16deg] bg-[#1c1c1c]" />
          <div className="absolute bottom-0 right-[8px] h-[54px] w-[3px] -rotate-[16deg] bg-[#1c1c1c]" />
          {/* camera body */}
          <div className="absolute left-1/2 top-0 h-[26px] w-[38px] -translate-x-1/2 rounded-[4px] bg-[#141414]">
            <div className="absolute -right-[10px] top-[5px] h-[14px] w-[12px] rounded-r-[3px] bg-[#141414]" />
            <div className="absolute left-[6px] top-[6px] size-[13px] rounded-full border-2 border-[#3f3f3f] bg-[#0a0a0a]">
              <div className="absolute left-[2px] top-[2px] size-[4px] rounded-full bg-[#60a5fa]" />
            </div>
            <div className="absolute right-[4px] top-[3px] size-[4px] rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.9)]" />
          </div>
        </Standing>

        {/* softbox light */}
        <Plate x={310} y={240} z={0} w={40} d={40} className="rounded-full bg-black/15 blur-[2px]" />
        <Standing x={302} y={262} z={0} w={56} h={110}>
          <div className="absolute bottom-0 left-1/2 h-[74px] w-[4px] -translate-x-1/2 bg-[#1c1c1c]" />
          <div className="absolute left-1/2 top-0 h-[40px] w-[34px] -translate-x-1/2 -rotate-12 rounded-[4px] border-[3px] border-[#141414] bg-[#fffbe6] shadow-[0_0_28px_rgba(250,204,21,0.75)]" />
        </Standing>

        {/* floating yellow pixels around scene */}
        <Plate x={-46} y={40} z={80} w={26} d={26} className="bg-[#facc15]" data-float />
        <Plate x={380} y={-20} z={120} w={18} d={18} className="bg-[#111]" data-float />
        <Plate x={352} y={330} z={60} w={22} d={22} className="bg-[#facc15]" data-float />
        <Plate x={-20} y={330} z={140} w={14} d={14} className="bg-[#111]" data-float />
      </div>
      </div>
    </div>
  );
}

/* ---------------------------------- hero ---------------------------------- */

export function HeroSutera() {
  const locale = useLocale();
  const rootRef = useRef<HTMLElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const tilt = tiltRef.current;
    const scene = sceneRef.current;
    const stage = stageRef.current;
    if (!root || !tilt || !scene || !stage) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const BASE_RX = 58;
    const BASE_RZ = -45;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      /* GSAP fully owns both transform layers — tilt gets X, scene gets Z (correct compose order) */
      gsap.set(tilt, { rotationX: BASE_RX });
      gsap.set(scene, { rotationZ: BASE_RZ });

      /* entrance */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-headline] > *", { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.12 })
        .from(stage, { y: 80, opacity: 0, duration: 1.1 }, "-=0.5")
        .from("[data-callout]", { opacity: 0, y: 16, duration: 0.6, stagger: 0.1 }, "-=0.6")
        .from("[data-corner]", { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 }, "-=0.5")
        .from("[data-tiles] > *", { opacity: 0, scale: 0.6, duration: 0.5, stagger: 0.06 }, "-=0.4");

      if (prefersReduced) return;

      /* idle float (separate y-tween on inner scene, never touches rotation) */
      gsap.to(scene, { y: "-=10", duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, i) => {
        gsap.to(el, {
          z: `+=${16 + i * 6}`,
          duration: 2.4 + i * 0.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });

      /* smooth lerp-ed rotation setters */
      const rz = gsap.quickTo(scene, "rotationZ", { duration: 0.9, ease: "power3.out" });
      const rx = gsap.quickTo(tilt, "rotationX", { duration: 0.9, ease: "power3.out" });
      const stageX = gsap.quickTo(stage, "x", { duration: 1.3, ease: "power3.out" });
      const stageY = gsap.quickTo(stage, "y", { duration: 1.3, ease: "power3.out" });

      /* auto sway — keeps the scene alive even with zero input (killed on first interaction) */
      let sway: gsap.core.Tween | null = gsap.to(scene, {
        rotationZ: BASE_RZ + 14,
        duration: 4.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      const killSway = () => {
        if (sway) {
          sway.kill();
          sway = null;
        }
      };

      const applyInput = (nx: number, ny: number) => {
        killSway();
        rz(BASE_RZ + nx * 30);
        rx(BASE_RX + ny * 12);
        stageX(nx * -24);
        stageY(ny * -16);
      };

      /* desktop: pointer position drives rotation */
      const onPointerMove = (e: PointerEvent) => {
        if (e.pointerType === "touch") return;
        applyInput(e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5);
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      cleanups.push(() => window.removeEventListener("pointermove", onPointerMove));

      /* mobile: finger position drives rotation (page scroll still works) */
      const onTouchMove = (e: TouchEvent) => {
        const t = e.touches[0];
        if (!t) return;
        applyInput(t.clientX / window.innerWidth - 0.5, t.clientY / window.innerHeight - 0.5);
      };
      root.addEventListener("touchmove", onTouchMove, { passive: true });
      cleanups.push(() => root.removeEventListener("touchmove", onTouchMove));

      /* mobile: gyroscope tilt (Android works directly; iOS asks permission on first tap) */
      const onOrientation = (e: DeviceOrientationEvent) => {
        if (e.gamma == null || e.beta == null) return;
        applyInput(
          gsap.utils.clamp(-0.5, 0.5, e.gamma / 60),
          gsap.utils.clamp(-0.5, 0.5, (e.beta - 45) / 90),
        );
      };
      const enableGyro = () => {
        type IOSOrientation = { requestPermission?: () => Promise<string> };
        const doe = DeviceOrientationEvent as unknown as IOSOrientation;
        if (typeof doe.requestPermission === "function") {
          doe.requestPermission().then((state) => {
            if (state === "granted") window.addEventListener("deviceorientation", onOrientation, { passive: true });
          }).catch(() => {});
        } else {
          window.addEventListener("deviceorientation", onOrientation, { passive: true });
        }
      };
      const onFirstTouch = () => {
        enableGyro();
        root.removeEventListener("touchstart", onFirstTouch);
      };
      root.addEventListener("touchstart", onFirstTouch, { passive: true });
      cleanups.push(() => {
        root.removeEventListener("touchstart", onFirstTouch);
        window.removeEventListener("deviceorientation", onOrientation);
      });

      /* click / tap: cinematic punch-in on the scene */
      const onPress = () => {
        gsap.fromTo(
          scene,
          { scale: 1 },
          { scale: 1.07, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out" },
        );
      };
      stage.addEventListener("pointerdown", onPress);
      cleanups.push(() => stage.removeEventListener("pointerdown", onPress));
    }, root);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] overflow-hidden bg-white text-black"
    >
      {/* faint vertical grid lines */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 left-1/4 w-px bg-black/[0.06]" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-black/[0.06]" />
        <div className="absolute inset-y-0 left-3/4 w-px bg-black/[0.06]" />
        <div className="absolute inset-x-0 top-1/3 h-px bg-black/[0.05]" />
        <div className="absolute inset-x-0 top-2/3 h-px bg-black/[0.05]" />
        {/* corner ticks */}
        <span className="absolute left-1/4 top-1/3 -ml-[7px] -mt-[7px] font-mono text-[14px] text-black/30">+</span>
        <span className="absolute left-3/4 top-1/3 -ml-[7px] -mt-[7px] font-mono text-[14px] text-black/30">+</span>
        <span className="absolute left-1/4 top-2/3 -ml-[7px] -mt-[7px] font-mono text-[14px] text-black/30">+</span>
        <span className="absolute left-3/4 top-2/3 -ml-[7px] -mt-[7px] font-mono text-[14px] text-black/30">+</span>
      </div>

      {/* top-center pill */}
      <div data-corner className="absolute left-1/2 top-6 z-40 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <Link
          href="/ai"
          className="border border-black bg-white px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
        >
          {tx(locale, "Create with AI")}
        </Link>
        <svg width="34" height="22" viewBox="0 0 34 22" fill="none" aria-hidden="true" className="text-black">
          <ellipse cx="17" cy="11" rx="16" ry="10" stroke="currentColor" strokeWidth="1.4" />
          <ellipse cx="17" cy="11" rx="7" ry="10" stroke="currentColor" strokeWidth="1.4" />
          <path d="M1 11h32" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </div>

      {/* top-right local time */}
      <div data-corner className="absolute right-6 top-6 z-40 text-right font-mono text-xs uppercase tracking-widest">
        <p className="text-black/40">{tx(locale, "Local time")}</p>
        <p className="font-bold">
          HAN <LocalClock />
        </p>
      </div>

      {/* headline */}
      <div data-headline className="absolute left-4 top-14 z-40 md:left-8 md:top-10">
        <h1 className="text-[16vw] font-black leading-[0.86] tracking-tighter md:text-[9vw]">
          <span className="block overflow-hidden">VIDEO,</span>
          <span className="block overflow-hidden">
            BY&nbsp;AI<span className="text-[#eab308]">.</span>
          </span>
        </h1>
      </div>

      {/* central 3D stage */}
      <div ref={stageRef} className="relative z-20 flex min-h-[100svh] items-center justify-center pt-28 will-change-transform md:pt-24">
        {/* wrapper reserves the *scaled* layout box so mobile never overflows */}
        <div className="relative size-[310px] sm:size-[420px] md:size-[500px] lg:size-[560px]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.55] sm:scale-75 md:scale-[0.89] lg:scale-100">
            <StudioScene tiltRef={tiltRef} sceneRef={sceneRef} />
          </div>
        </div>

        {/* glass tiles overlay */}
        <div
          data-tiles
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[16%] right-[24%] z-30 hidden grid-cols-2 lg:grid"
        >
          <div className="size-[92px] border border-white/70 bg-white/25 backdrop-blur-[3px]" />
          <div className="size-[92px] border border-white/70 bg-white/35 backdrop-blur-[5px]" />
          <div className="size-[92px] border border-white/70 bg-white/40 backdrop-blur-[6px]" />
          <div className="size-[92px] border border-white/60 bg-white/15 backdrop-blur-[2px]" />
        </div>
      </div>

      {/* callouts */}
      <Callout
        label={tx(locale, "Where one prompt branches into a full video workflow")}
        className="right-[14%] top-[22%]"
        flip
      />
      <Callout
        label={tx(locale, "From skills and credits, production draws its strength")}
        className="left-[10%] top-[42%]"
      />
      <Callout
        label={tx(locale, "A studio designed for async rendering")}
        className="bottom-[18%] left-[38%]"
      />

      {/* right info card */}
      <div data-corner className="absolute right-6 top-[30%] z-40 hidden w-[240px] border border-black bg-white lg:block">
        <div className="flex items-center justify-between border-b border-black bg-black/5 px-3 py-2">
          <span className="font-sans text-lg font-black tracking-tight">VIPEO</span>
          <span className="font-mono text-[10px] text-black/50">/25</span>
        </div>
        <div className="space-y-2 px-3 py-3 font-mono text-[11px] font-semibold uppercase leading-relaxed tracking-wide">
          <p>VI (VIDEO)</p>
          <p>+ PEO (PEOPLE)</p>
          <p className="pt-1">→ {tx(locale, "Video for everyone")}</p>
        </div>
      </div>

      {/* bottom-left core skills */}
      <div data-corner className="absolute bottom-8 left-6 z-40 hidden md:block">
        <p className="mb-3 font-sans text-sm font-black tracking-tight">[ {tx(locale, "CORE SKILL LINES")} ]</p>
        <ul className="space-y-2 font-mono text-[11px] font-bold uppercase tracking-wider">
          {[
            ["01.(A)", tx(locale, "Faceless narration")],
            ["02.(B)", tx(locale, "Product showcase")],
            ["03.(C)", tx(locale, "News & recap")],
            ["04.(D)", tx(locale, "Shorts & remix")],
          ].map(([code, label]) => (
            <li key={code} className="group flex items-center gap-2">
              <span className="text-black/40">{code}</span>
              <span className="inline-block h-[8px] w-[70px] bg-[repeating-linear-gradient(115deg,#000_0_2px,transparent_2px_5px)] transition-all group-hover:w-[110px] group-hover:bg-[repeating-linear-gradient(115deg,#eab308_0_2px,transparent_2px_5px)]" />
              <span className="transition-colors group-hover:text-[#a16207]">{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* bottom-right note card */}
      <div data-corner className="absolute bottom-8 right-6 z-40 hidden w-[280px] lg:block">
        <div className="border border-black bg-white">
          <div className="flex items-center justify-between bg-black px-3 py-1.5">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white">
              {tx(locale, "Not a crew — just AI")}
            </span>
            <span className="font-mono text-[11px] text-white/60">×</span>
          </div>
          <p className="px-3 py-3 font-mono text-[11px] leading-relaxed text-black/80">
            {tx(locale, "Vipeo turns one brief into scripts, scenes, voiceover, and export-ready video. Skills, credits, and rights checks included along the way.")}
          </p>
        </div>
        <div className="mt-3 flex justify-end gap-2">
          {[
            [tx(locale, "Pricing"), "#pricing"],
            [tx(locale, "Skills"), "#skills"],
            [tx(locale, "Start"), "/ai"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="border border-black bg-white px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors hover:bg-black hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* mobile CTA row (corners are hidden on small screens) */}
      <div data-corner className="absolute bottom-6 left-1/2 z-40 flex w-full max-w-[92vw] -translate-x-1/2 items-center justify-center gap-2 md:hidden">
        <Link
          href="/ai"
          className="border border-black bg-black px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-white"
        >
          {tx(locale, "Create with AI")}
        </Link>
        <Link
          href="#pricing"
          className="border border-black bg-white px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest"
        >
          {tx(locale, "Pricing")}
        </Link>
      </div>

      {/* screen-reader summary */}
      <p className="sr-only">
        {tx(locale, "Vipeo — AI video studio. One prompt becomes a full video workflow with skills, credits, and async rendering.")}
      </p>
    </section>
  );
}
