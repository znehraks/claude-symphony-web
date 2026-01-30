"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

const STAGE_COLORS = [
  "#10b981", "#8b5cf6", "#10b981", "#10b981", "#8b5cf6",
  "#8b5cf6", "#f59e0b", "#8b5cf6", "#f59e0b", "#8b5cf6",
];

const NOTE_GLYPHS = ["♩", "♪", "♫", "♬", "♩", "♪", "♫", "♬", "♩", "♪"];

const NOTE_Y_POSITIONS = [12, 20, 16, 24, 10, 22, 14, 18, 26, 12];

export default function MusicalStaff({ activeIndex }: { activeIndex: number | null }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 1000 40"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full opacity-20"
      >
        {/* 5 staff lines */}
        {[8, 14, 20, 26, 32].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="1000"
            y2={y}
            stroke="#f1f5f9"
            strokeWidth="0.3"
            opacity="0.3"
          />
        ))}

        {/* 10 notes on staff */}
        {STAGE_COLORS.map((color, i) => {
          const x = 50 + i * 95;
          const y = NOTE_Y_POSITIONS[i];
          const isActive = activeIndex === i;

          return (
            <g key={i}>
              <text
                x={x}
                y={y}
                fill={color}
                fontSize="12"
                textAnchor="middle"
                dominantBaseline="central"
                className={
                  isActive && !reducedMotion ? "note-strike-glow" : ""
                }
                opacity={isActive ? 1 : 0.5}
              >
                {NOTE_GLYPHS[i]}
              </text>
              {isActive && (
                <circle
                  cx={x}
                  cy={y}
                  r="10"
                  fill="none"
                  stroke={color}
                  strokeWidth="0.5"
                  className={reducedMotion ? "" : "note-strike-ring"}
                  opacity="0.6"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
