"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const WAVE_COLORS = [
  { r: 139, g: 92, b: 246 },  // claude purple
  { r: 16, g: 185, b: 129 },  // gemini green
  { r: 245, g: 158, b: 11 },  // codex amber
];

export default function EqualizerWave({ className }: { className?: string }) {
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

    if (reducedMotion) {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      for (const color of WAVE_COLORS) {
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        for (let x = 0; x <= w; x += 4) {
          const y = h / 2 + Math.sin(x * 0.01) * (h * 0.15);
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},0.12)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      return () => window.removeEventListener("resize", resize);
    }

    let raf: number;
    let t = 0;
    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      WAVE_COLORS.forEach((color, i) => {
        ctx.beginPath();
        const freq = 0.008 + i * 0.003;
        const amp = h * (0.12 + i * 0.03);
        const phase = t * (0.3 + i * 0.15) + i * 2;

        ctx.moveTo(0, h / 2);
        for (let x = 0; x <= w; x += 4) {
          const y =
            h / 2 +
            Math.sin(x * freq + phase) * amp +
            Math.sin(x * freq * 2.5 + phase * 0.7) * (amp * 0.3);
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},0.12)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

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
      className={className ?? "pointer-events-none absolute inset-0 h-full w-full"}
    />
  );
}
