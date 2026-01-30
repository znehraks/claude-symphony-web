"use client";

import { cn } from "@/lib/utils";

interface RetroGridProps {
  className?: string;
  angle?: number;
}

export default function RetroGrid({
  className = "",
  angle = 65,
}: RetroGridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden opacity-50 [perspective:200px]",
        className
      )}
      style={
        {
          "--grid-angle": `${angle}deg`,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 [transform:rotateX(var(--grid-angle))]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139, 92, 246, 0.3) 1px, transparent 0),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.3) 1px, transparent 0)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Fade out gradient at top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 100%)",
        }}
      />
    </div>
  );
}
