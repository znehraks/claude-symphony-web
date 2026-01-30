"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

const NOTES = ["♩", "♪", "♫", "♬", "♭", "♯"];

const noteElements = Array.from({ length: 12 }, (_, i) => ({
  glyph: NOTES[i % NOTES.length],
  left: `${(i * 8.3 + 2) % 100}%`,
  delay: `${i * 3.5}s`,
  duration: `${18 + (i % 5) * 4}s`,
  size: `${14 + (i % 3) * 4}px`,
}));

export default function FloatingNotes() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {noteElements.map((note, i) => (
        <span
          key={i}
          className="float-up-note absolute bottom-0 text-[#8b5cf6]"
          style={{
            left: note.left,
            animationDelay: note.delay,
            animationDuration: note.duration,
            fontSize: note.size,
            opacity: 0,
          }}
        >
          {note.glyph}
        </span>
      ))}
    </div>
  );
}
