"use client";

import { motion } from "motion/react";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { FEATURES } from "@/lib/data";
import {
  Workflow,
  Brain,
  Cpu,
  FileText,
  Activity,
  Shield,
  GitBranch,
  Users,
  CheckCircle,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Workflow,
  Brain,
  Cpu,
  FileText,
  Activity,
  Shield,
  GitBranch,
  Users,
  CheckCircle,
};

// 3 columns → row groups for orchestra entrance
const COLS = 3;

function FeatureCard({
  title,
  description,
  icon,
  highlight,
  index,
  animate,
}: {
  title: string;
  description: string;
  icon: string;
  highlight?: string;
  index: number;
  animate: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const Icon = ICON_MAP[icon];
  const row = Math.floor(index / COLS);

  const variants = {
    hidden: {
      opacity: reducedMotion ? 1 : 0,
      y: reducedMotion ? 0 : 24,
      rotateY: reducedMotion ? 0 : 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        delay: row * 0.2 + (index % COLS) * 0.08,
        duration: reducedMotion ? 0 : 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial={reducedMotion ? false : "hidden"}
      animate={animate ? "visible" : "hidden"}
      className="group relative rounded-xl border border-white/[0.06] bg-[#111827] p-6 transition-shadow hover:shadow-[0_0_30px_rgba(139,92,246,0.12)] feature-breathing"
      style={{ perspective: "600px" }}
    >
      <div className="mb-4 flex items-center gap-3">
        {Icon && <Icon className="h-5 w-5 text-[#8b5cf6]" />}
        <h3 className="text-base font-semibold text-[#f1f5f9]">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-[#94a3b8]">{description}</p>
      {highlight && (
        <span className="mt-4 inline-block rounded-full bg-[#8b5cf6]/10 px-3 py-1 text-xs font-medium text-[#8b5cf6]">
          {highlight}
        </span>
      )}
    </motion.div>
  );
}

export default function FeaturesSection() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div ref={ref} className="mx-auto max-w-7xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-[#f1f5f9] sm:text-4xl">
          Built for Autonomous Development
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-[#94a3b8]">
          Every feature designed to maximize AI collaboration and minimize human
          intervention.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              highlight={feature.highlight}
              index={i}
              animate={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
