"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}

export default function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
}: AnimatedShinyTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r from-neutral-100 via-neutral-400 to-neutral-100 bg-clip-text text-transparent",
        className
      )}
      style={{
        backgroundSize: `${shimmerWidth}% 100%`,
        animation: "shimmer 3s linear infinite",
      }}
    >
      {children}
    </span>
  );
}
