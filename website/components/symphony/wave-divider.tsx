"use client";

export default function WaveDivider() {
  return (
    <div className="wave-divider-wrapper" aria-hidden="true">
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="wave-divider-svg"
      >
        <defs>
          <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d="M0,20 Q150,5 300,20 T600,20 T900,20 T1200,20"
          fill="none"
          stroke="url(#wave-grad)"
          strokeWidth="1.5"
        />
        <path
          d="M0,25 Q150,35 300,25 T600,25 T900,25 T1200,25"
          fill="none"
          stroke="url(#wave-grad)"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
