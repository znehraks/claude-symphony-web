"use client";

import { cn } from "@/lib/utils";
import { animate, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

interface CountUpProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  start?: boolean;
}

export default function CountUp({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
  className,
  start = true,
}: CountUpProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!start) return;

    const controls = animate(count, target, {
      duration: duration / 1000,
      ease: "easeOut",
    });

    return controls.stop;
  }, [count, target, duration, start]);

  return (
    <span className={cn("tabular-nums", className)}>
      {prefix}
      {rounded.get()}
      {suffix}
    </span>
  );
}
