"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "motion/react";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { METRICS } from "@/lib/data";

// Custom crescendo easing: slow start → explosive finish
function crescendoEase(t: number): number {
  return t < 0.7 ? 0.3 * (t / 0.7) : 0.3 + 0.7 * Math.pow((t - 0.7) / 0.3, 2);
}

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  start,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  start: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(() => (reducedMotion ? value : 0));
  const [done, setDone] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!start || reducedMotion) return;
    const motionVal = { v: 0 };
    const controls = animate(motionVal, { v: value }, {
      duration: 2.2,
      ease: crescendoEase,
      onUpdate: () => {
        setDisplay(Math.round(motionVal.v));
        // Font scale: 90% → 100% during count
        const progress = value > 0 ? motionVal.v / value : 1;
        setScale(0.9 + progress * 0.1);
      },
      onComplete: () => {
        setDone(true);
        setScale(1);
      },
    });
    return () => controls.stop();
  }, [start, value, reducedMotion]);

  return (
    <span
      className="tabular-nums inline-block transition-transform"
      style={{ transform: reducedMotion ? undefined : `scale(${scale})` }}
    >
      {prefix}
      {reducedMotion ? value : display}
      {suffix}
      {done && !reducedMotion && (
        <span className="crescendo-flash" />
      )}
    </span>
  );
}

export default function MetricsSection() {
  const { ref, isInView } = useInView(0.3);
  const reducedMotion = useReducedMotion();

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div ref={ref} className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : reducedMotion
                    ? {}
                    : { opacity: 0, scale: 0.9 }
              }
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="metric-card flex flex-col items-center rounded-xl border border-white/[0.06] bg-[#111827] p-6 text-center"
            >
              <span className="text-3xl font-bold text-[#f1f5f9] sm:text-4xl">
                <AnimatedNumber
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  start={isInView}
                />
              </span>
              <span className="mt-2 text-sm text-[#94a3b8]">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
