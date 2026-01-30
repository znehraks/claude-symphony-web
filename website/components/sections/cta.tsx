"use client";

import CopyButton from "@/components/ui/copy-button";
import { Github } from "lucide-react";
import SoundWaveBg from "@/components/symphony/sound-wave-bg";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      {/* Sound wave equalizer background */}
      <SoundWaveBg className="pointer-events-none absolute inset-0 h-full w-full opacity-80" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          <span className="bg-gradient-to-r from-[#8b5cf6] via-[#10b981] to-[#f59e0b] bg-clip-text text-transparent">
            Start Orchestrating
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[#94a3b8]">
          Transform your development workflow with multi-AI
          orchestration. Clone and start building.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <CopyButton
            text="git clone https://github.com/znehraks/claude-symphony"
            className="w-full sm:w-auto"
          />
          <a
            href="https://github.com/znehraks/claude-symphony"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-[#94a3b8] transition-colors hover:bg-white/5 hover:text-[#f1f5f9]"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </a>
        </div>

        <p className="mt-12 text-xs text-[#64748b]">
          MIT Licensed · Made with Claude, Gemini & Codex
        </p>
      </div>
    </section>
  );
}
