"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { STAGES } from "@/lib/data";
import type { Stage } from "@/lib/types";
import MusicalStaff from "@/components/symphony/musical-staff";

function StageBadge({ model, color }: { model: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
      style={{
        backgroundColor: `${color}15`,
        color,
        border: `1px solid ${color}30`,
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {model}
    </span>
  );
}

function StageCard({
  stage,
  index,
  isSelected,
  onClick,
  animate,
}: {
  stage: Stage;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  animate: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const variants = {
    hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: reducedMotion ? 0 : 0.5 },
    },
  };

  return (
    <motion.button
      variants={variants}
      initial={reducedMotion ? false : "hidden"}
      animate={animate ? "visible" : "hidden"}
      onClick={onClick}
      aria-expanded={isSelected}
      className={cn(
        "group relative w-full rounded-xl border p-4 text-left transition-shadow",
        isSelected
          ? "border-[var(--glow-color)] shadow-[0_0_30px_var(--glow-color-alpha)] note-strike-card"
          : "border-white/[0.06] hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
      )}
      style={{
        backgroundColor: "#111827",
        "--glow-color": stage.color,
        "--glow-color-alpha": `${stage.color}40`,
      } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-mono text-[#64748b]">{stage.number}</span>
        <StageBadge model={stage.aiModelLabel.split(" ")[0]} color={stage.color} />
      </div>
      <h3 className="mt-2 text-sm font-semibold text-[#f1f5f9]">{stage.name}</h3>
      <p className="mt-1 text-xs text-[#708599] line-clamp-2">{stage.description}</p>
    </motion.button>
  );
}

function DetailPanel({ stage, onClose }: { stage: Stage; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="col-span-full overflow-hidden"
    >
      <div className="rounded-xl border border-white/[0.06] bg-[#111827] p-6">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono text-[#64748b]">Stage {stage.number}</span>
            <h3 className="mt-1 text-lg font-semibold text-[#f1f5f9]">{stage.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#64748b] transition-colors hover:bg-white/5 hover:text-[#f1f5f9]"
            aria-label="Close detail panel"
          >
            ✕
          </button>
        </div>
        <p className="mt-3 text-sm text-[#94a3b8]">{stage.description}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <span className="text-xs font-medium text-[#64748b]">AI Model</span>
            <div className="mt-1">
              <StageBadge model={stage.aiModelLabel} color={stage.color} />
            </div>
          </div>
          <div>
            <span className="text-xs font-medium text-[#64748b]">Execution Mode</span>
            <p className="mt-1 text-sm text-[#f1f5f9]">{stage.executionMode}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-[#64748b]">Outputs</span>
            <div className="mt-1 flex flex-wrap gap-1">
              {stage.outputs.map((o) => (
                <span key={o} className="rounded bg-white/5 px-2 py-0.5 text-xs text-[#94a3b8] font-mono">
                  {o}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PipelineSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { ref, isInView } = useInView(0.2);

  const handleSelect = (id: string) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setSelectedId(null);
  };

  const selectedStage = STAGES.find((s) => s.id === selectedId);
  const selectedIndex = selectedStage ? STAGES.findIndex((s) => s.id === selectedId) : null;

  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:py-24" onKeyDown={handleKeyDown}>
      <MusicalStaff activeIndex={selectedIndex} />
      <div ref={ref} className="relative mx-auto max-w-7xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-[#f1f5f9] sm:text-4xl">
          10-Stage Pipeline
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-[#94a3b8]">
          From brainstorming to deployment — every phase orchestrated by the right AI.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {STAGES.slice(0, 5).map((stage, i) => (
            <StageCard
              key={stage.id}
              stage={stage}
              index={i}
              isSelected={selectedId === stage.id}
              onClick={() => handleSelect(stage.id)}
              animate={isInView}
            />
          ))}
          <AnimatePresence>
            {selectedStage && Number(selectedStage.number) <= 5 && (
              <DetailPanel stage={selectedStage} onClose={() => setSelectedId(null)} />
            )}
          </AnimatePresence>
          {STAGES.slice(5).map((stage, i) => (
            <StageCard
              key={stage.id}
              stage={stage}
              index={i + 5}
              isSelected={selectedId === stage.id}
              onClick={() => handleSelect(stage.id)}
              animate={isInView}
            />
          ))}
          <AnimatePresence>
            {selectedStage && Number(selectedStage.number) > 5 && (
              <DetailPanel stage={selectedStage} onClose={() => setSelectedId(null)} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
