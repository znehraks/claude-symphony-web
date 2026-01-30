"use client";

import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitText({
  text,
  className,
  delay = 0,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const chars = containerRef.current.querySelectorAll(".char");

      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.04,
          delay,
          ease: "back.out(1.7)",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="char inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
