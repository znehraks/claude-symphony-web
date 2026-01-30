"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TerminalProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export default function Terminal({
  children,
  title = "terminal",
  className = "",
}: TerminalProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-gray-800 bg-[#0d1117] font-mono text-sm shadow-2xl",
        className
      )}
    >
      {/* Header with traffic lights */}
      <div className="flex items-center gap-2 border-b border-gray-800 bg-[#161b22] px-4 py-3">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="ml-2 text-xs text-gray-400">{title}</div>
      </div>

      {/* Terminal body */}
      <div className="p-4 text-gray-300">{children}</div>
    </div>
  );
}
