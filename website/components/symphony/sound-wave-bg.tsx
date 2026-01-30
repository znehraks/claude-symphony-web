"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const BAR_COUNT = 50;

export default function SoundWaveBg({ className }: { className?: string }) {
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

    const drawBars = (time: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const barWidth = w / (BAR_COUNT * 2);
      const centerY = h * 0.55;

      for (let i = 0; i < BAR_COUNT; i++) {
        const x = (i / BAR_COUNT) * w + barWidth / 2;
        const normalizedX = i / BAR_COUNT;

        const barHeight =
          Math.sin(normalizedX * Math.PI * 3 + time * 0.8) *
          Math.sin(normalizedX * Math.PI + time * 0.5) *
          (h * 0.3) +
          h * 0.05;

        const absHeight = Math.abs(barHeight);

        // gradient color: purple → green → amber
        const r = normalizedX < 0.5
          ? 139 + (16 - 139) * (normalizedX * 2)
          : 16 + (245 - 16) * ((normalizedX - 0.5) * 2);
        const g = normalizedX < 0.5
          ? 92 + (185 - 92) * (normalizedX * 2)
          : 185 + (158 - 185) * ((normalizedX - 0.5) * 2);
        const b = normalizedX < 0.5
          ? 246 + (129 - 246) * (normalizedX * 2)
          : 129 + (11 - 129) * ((normalizedX - 0.5) * 2);

        ctx.fillStyle = `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},0.15)`;

        // main bar
        ctx.fillRect(x, centerY - absHeight, barWidth, absHeight);

        // mirror reflection
        ctx.fillStyle = `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},0.06)`;
        ctx.fillRect(x, centerY, barWidth, absHeight * 0.5);
      }
    };

    if (reducedMotion) {
      drawBars(0);
      return () => window.removeEventListener("resize", resize);
    }

    let raf: number;
    let t = 0;
    const animate = () => {
      drawBars(t);
      t += 0.016;
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className ?? "pointer-events-none absolute inset-0 h-full w-full"}
    />
  );
}
