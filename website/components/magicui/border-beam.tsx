"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  duration?: number;
  size?: number;
  colorFrom?: string;
  colorTo?: string;
}

export default function BorderBeam({
  className = "",
  duration = 8,
  size = 100,
  colorFrom = "#8b5cf6",
  colorTo = "#10b981",
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className
      )}
    >
      <div
        className="absolute"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
          filter: "blur(20px)",
          opacity: 0.75,
          animation: `border-beam ${duration}s linear infinite`,
          offsetPath: "border-box",
          offsetRotate: "0deg",
        }}
      />
    </div>
  );
}
