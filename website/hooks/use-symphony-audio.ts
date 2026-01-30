"use client";

import { useCallback, useRef, useState } from "react";

// Chord frequencies: Cmaj7 → Am7 → Fmaj7 → G7
const CHORDS = [
  [261.63, 329.63, 392.0, 493.88],  // Cmaj7
  [220.0, 261.63, 329.63, 392.0],   // Am7
  [174.61, 220.0, 261.63, 329.63],  // Fmaj7
  [196.0, 246.94, 293.66, 349.23],  // G7
];

export function useSymphonyAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (ctxRef.current) return;

    const audioCtx = new AudioContext();
    const masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.06;
    masterGain.connect(audioCtx.destination);

    ctxRef.current = audioCtx;
    gainRef.current = masterGain;

    let chordIndex = 0;

    const playChord = () => {
      const chord = CHORDS[chordIndex % CHORDS.length];
      chordIndex++;

      chord.forEach((freq) => {
        const osc = audioCtx.createOscillator();
        const noteGain = audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.value = freq;
        noteGain.gain.setValueAtTime(0, audioCtx.currentTime);
        noteGain.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.5);
        noteGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 3.5);

        osc.connect(noteGain);
        noteGain.connect(masterGain);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 4);
      });
    };

    playChord();
    intervalRef.current = setInterval(playChord, 4000);
    setIsPlaying(true);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (ctxRef.current) {
      ctxRef.current.close();
      ctxRef.current = null;
    }
    gainRef.current = null;
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  }, [isPlaying, start, stop]);

  return { isPlaying, toggle };
}
