"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { QUICK_START_STEPS } from "@/lib/data";

export default function QuickStartSection() {
  const { ref, isInView } = useInView(0.3);
  const reducedMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typedChars, setTypedChars] = useState(0);
  const command = QUICK_START_STEPS[0].text;

  useEffect(() => {
    if (!isInView) return;
    if (reducedMotion) {
      setTypedChars(command.length);
      setVisibleLines(QUICK_START_STEPS.length);
      return;
    }

    // Type command
    let charIdx = 0;
    const typeInterval = setInterval(() => {
      charIdx++;
      setTypedChars(charIdx);
      if (charIdx >= command.length) {
        clearInterval(typeInterval);
        // Show output lines sequentially
        let lineIdx = 1;
        const showLine = () => {
          if (lineIdx >= QUICK_START_STEPS.length) return;
          setTimeout(() => {
            setVisibleLines(lineIdx + 1);
            lineIdx++;
            showLine();
          }, QUICK_START_STEPS[lineIdx].delay || 400);
        };
        setTimeout(showLine, 300);
      }
    }, 60);

    return () => clearInterval(typeInterval);
  }, [isInView, reducedMotion, command]);

  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[720px]">
        <h2 className="mb-8 text-center text-3xl font-bold text-[#f1f5f9] sm:text-4xl">
          Quick Start
        </h2>
        <div
          ref={ref}
          className="overflow-hidden rounded-xl shadow-[0_0_40px_rgba(139,92,246,0.1)]"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 bg-[#161b22] px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <div className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-xs text-[#64748b] font-mono">terminal</span>
          </div>
          {/* Terminal body */}
          <div className="bg-[#0d1117] p-6 font-mono text-sm leading-relaxed text-[#e2e8f0]">
            <div className="flex">
              <span className="mr-2 text-[#10b981]">$</span>
              <span>{command.slice(0, typedChars)}</span>
              {typedChars < command.length && (
                <span className="ml-0.5 inline-block h-4 w-2 animate-[cursor-blink_1s_infinite] bg-[#f1f5f9]" />
              )}
            </div>
            {QUICK_START_STEPS.slice(1).map((step, i) => (
              <div
                key={i}
                className={cn(
                  "mt-1 transition-opacity duration-300",
                  visibleLines > i + 1 ? "opacity-100" : "opacity-0"
                )}
              >
                <span className={step.text.startsWith("✓") ? "text-[#10b981]" : "text-[#94a3b8]"}>
                  {step.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
