"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const TRAIL_LENGTH = 18;

export default function ConductorCursor({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const trail: Array<{ x: number; y: number }> = [];

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      trail.push({ x, y });
      if (trail.length > TRAIL_LENGTH) trail.shift();
    };

    container.addEventListener("mousemove", onMouseMove);

    let raf: number;
    const draw = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      if (trail.length > 1) {
        for (let i = 1; i < trail.length; i++) {
          const alpha = (i / trail.length) * 0.5;
          const width = (i / trail.length) * 2;
          ctx.beginPath();
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
          ctx.lineTo(trail[i].x, trail[i].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = width;
          ctx.lineCap = "round";
          ctx.stroke();
        }

        // glow at tip
        const tip = trail[trail.length - 1];
        const gradient = ctx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, 8);
        gradient.addColorStop(0, "rgba(139, 92, 246, 0.4)");
        gradient.addColorStop(1, "rgba(139, 92, 246, 0)");
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, [containerRef, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full hidden md:block"
    />
  );
}
