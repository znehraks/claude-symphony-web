"use client";

import { useSymphonyAudio } from "@/hooks/use-symphony-audio";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioToggle() {
  const { isPlaying, toggle } = useSymphonyAudio();

  return (
    <button
      onClick={toggle}
      aria-label={isPlaying ? "Mute ambient audio" : "Play ambient audio"}
      className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#111827]/80 text-[#94a3b8] backdrop-blur-sm transition-colors hover:bg-[#111827] hover:text-[#f1f5f9]"
    >
      {isPlaying ? (
        <Volume2 className="h-4 w-4" />
      ) : (
        <VolumeX className="h-4 w-4" />
      )}
    </button>
  );
}
