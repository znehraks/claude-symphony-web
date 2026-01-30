"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagicCardProps {
  children: ReactNode;
  className?: string;
  gradientColor?: string;
}

export default function MagicCard({
  children,
  className = "",
  gradientColor = "rgba(139,92,246,0.15)",
}: MagicCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${gradientColor}, transparent 40%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
