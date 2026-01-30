"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function ShimmerButton({
  children,
  className,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 font-medium text-white transition-transform hover:scale-105 active:scale-95",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
        style={{ animation: "shimmer-sweep 2.5s ease-in-out infinite" }}
      />
    </button>
  );
}
