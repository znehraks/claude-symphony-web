"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r from-violet-600 via-emerald-500 to-amber-500 bg-clip-text text-transparent",
        className
      )}
      style={{
        backgroundSize: "200% 200%",
        animation: "gradient-flow 4s ease infinite",
      }}
    >
      {children}
    </span>
  );
}
