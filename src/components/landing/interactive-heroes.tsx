"use client";

import { useRef, useEffect, useState } from "react";

interface HeroImageProps {
  title: string;
  subtitle: string;
  gradient1: string;
  gradient2: string;
  accentColor: string;
}

function InteractiveHeroCard({ title, subtitle, gradient1, gradient2, accentColor }: HeroImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animateCanvas = () => {
      const width = canvas.width;
      const height = canvas.height;
      const time = Date.now() / 1000;

      // Create gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, gradient1);
      bgGradient.addColorStop(1, gradient2);
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Add subtle animated circles
      ctx.globalAlpha = 0.15;
      for (let i = 0; i < 3; i++) {
        const x = width / 2 + Math.cos(time + i) * (width / 3);
        const y = height / 2 + Math.sin(time + i * 1.5) * (height / 3);
        const size = 80 + Math.sin(time + i) * 40;

        const circleGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        circleGradient.addColorStop(0, accentColor);
        circleGradient.addColorStop(1, "transparent");
        ctx.fillStyle = circleGradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Add mouse interaction glow
      if (isHovering) {
        ctx.globalAlpha = 0.1 + Math.sin(time * 2) * 0.05;
        const glowGradient = ctx.createRadialGradient(
          mousePos.x,
          mousePos.y,
          0,
          mousePos.x,
          mousePos.y,
          150
        );
        glowGradient.addColorStop(0, accentColor);
        glowGradient.addColorStop(1, "transparent");
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 150, 0, Math.PI * 2);
        ctx.fill();
      }

      // Reset alpha
      ctx.globalAlpha = 1;

      requestAnimationFrame(animateCanvas);
    };

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    animateCanvas();
  }, [gradient1, gradient2, accentColor, mousePos, isHovering]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
        <h3 className="text-2xl font-bold text-white mb-2 transform group-hover:translate-y-0 transition-transform group-hover:text-primary">
          {title}
        </h3>
        <p className="text-sm text-white/80 line-clamp-2 group-hover:text-white/90 transition-colors">
          {subtitle}
        </p>
      </div>

      {/* Hover indicator */}
      <div className="absolute top-4 right-4 size-3 rounded-full bg-white/20 group-hover:bg-primary/80 transition-colors duration-300" />
    </div>
  );
}

export function InteractiveHeroes() {
  const heroes = [
    {
      title: "AI Director",
      subtitle: "Transform ideas into stunning videos with intelligent automation",
      gradient1: "#1e1b4b",
      gradient2: "#312e81",
      accentColor: "#8b5cf6",
    },
    {
      title: "Smart Workflow",
      subtitle: "Orchestrate every step of your creative process seamlessly",
      gradient1: "#0f172a",
      gradient2: "#1e3a8a",
      accentColor: "#3b82f6",
    },
    {
      title: "Global Distribution",
      subtitle: "Publish across all platforms with one click",
      gradient1: "#0f172a",
      gradient2: "#1f2937",
      accentColor: "#06b6d4",
    },
    {
      title: "Advanced Analytics",
      subtitle: "Track performance and optimize with real-time insights",
      gradient1: "#1f2937",
      gradient2: "#111827",
      accentColor: "#ec4899",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-balance bg-gradient-to-r from-primary-accent via-primary to-secondary-accent bg-clip-text text-transparent lg:text-5xl">
          Powerful Features
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience interactive, animated interface elements that respond to your movements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {heroes.map((hero, index) => (
          <InteractiveHeroCard key={index} {...hero} />
        ))}
      </div>
    </section>
  );
}
