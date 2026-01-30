"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RainbowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function RainbowButton({
  children,
  className = "",
  ...props
}: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-lg p-[2px] font-medium transition-all duration-300 hover:scale-105 active:scale-95",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg,#ff0000,#ff7f00,#ffff00,#00ff00,#0000ff,#4b0082,#9400d3,#ff0000)",
          backgroundSize: "200% 100%",
          animation: "rainbow 3s linear infinite",
        }}
      />
      <span className="relative flex items-center gap-2 rounded-md bg-gray-950 px-6 py-2 text-white transition-all group-hover:bg-gray-900">
        {children}
      </span>
    </button>
  );
}
