"use client";

import { cn } from "@/lib/utils";

interface SectionSkeletonProps {
  height?: string;
  className?: string;
}

export default function SectionSkeleton({ height = "h-96", className }: SectionSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "w-full animate-pulse rounded-xl bg-[#111827]/50",
        height,
        className
      )}
    >
      <div className="flex h-full items-center justify-center">
        <div className="h-4 w-32 rounded bg-[#1e293b]" />
      </div>
    </div>
  );
}
