"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import CopyButton from "@/components/ui/copy-button";
import { Github } from "lucide-react";
import EqualizerWave from "@/components/symphony/equalizer-wave";
import ConductorCursor from "@/components/symphony/conductor-cursor";

const PARTICLE_COLORS = ["#8b5cf6", "#10b981", "#f59e0b"];
const NOTE_GLYPHS = ["♩", "♪", "♫", "♬"];

function ParticlesCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const count = window.innerWidth < 640 ? 30 : 60;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      color: PARTICLE_COLORS[Math.floor(Math.random() * 3)],
      glyph: NOTE_GLYPHS[Math.floor(Math.random() * NOTE_GLYPHS.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    if (reducedMotion) {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (const p of particles) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.font = `${10 + p.r * 3}px serif`;
        ctx.fillStyle = p.color + "60";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.glyph, 0, 0);
        ctx.restore();
      }
      return () => window.removeEventListener("resize", resize);
    }

    let raf: number;
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        p.rotation += p.rotationSpeed;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.dy *= -1;

        const pulse = 0.4 + Math.sin(t * 1.5 + p.pulsePhase) * 0.25;
        const size = 10 + p.r * 3;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = `${size}px serif`;
        ctx.fillStyle = p.color + Math.round(pulse * 255).toString(16).padStart(2, "0");
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.glyph, 0, 0);
        ctx.restore();
      }
      t += 0.016;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
}

function SplitTextHero({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setReady(true);
      return;
    }

    const loadGSAP = async () => {
      const { default: gsap } = await import("gsap");
      const el = containerRef.current;
      if (!el) return;
      const chars = el.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "back.out(1.7)",
          onStart: () => setReady(true),
        }
      );
    };
    loadGSAP();
  }, [reducedMotion]);

  const words = text.split(" ");
  return (
    <h1
      ref={containerRef}
      className={cn(
        "text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl",
        className
      )}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.25em]">
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className={cn("char inline-block", !ready && !reducedMotion && "opacity-0")}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6"
    >
      <EqualizerWave className="pointer-events-none absolute inset-0 h-full w-full z-[1]" />
      <ParticlesCanvas className="z-[2]" />
      <ConductorCursor containerRef={sectionRef} />
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background: "radial-gradient(ellipse at top center, rgba(139,92,246,0.1) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 px-4 py-1.5 text-sm text-[#8b5cf6]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8b5cf6] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8b5cf6]" />
          </span>
          Multi-AI Orchestration Framework
        </div>

        <SplitTextHero text="Orchestrate Your Entire Product Lifecycle" />

        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#94a3b8]">
          An autonomous agent pipeline that transforms ideas into deployed code through{" "}
          <span className="text-[#f1f5f9]">10 specialized stages</span>, powered by{" "}
          <span className="text-[#8b5cf6]">Claude</span>,{" "}
          <span className="text-[#10b981]">Gemini</span>, and{" "}
          <span className="text-[#f59e0b]">Codex</span>.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <CopyButton
            text="npx claude-symphony init"
            className="w-full sm:w-auto"
          />
          <a
            href="https://github.com/znehraks/claude-symphony"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-[#94a3b8] transition-colors hover:bg-white/5 hover:text-[#f1f5f9]"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </a>
        </div>
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent z-[4]"
        aria-hidden="true"
      />
    </section>
  );
}
