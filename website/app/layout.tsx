import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/symphony/scroll-progress";
import FloatingNotes from "@/components/symphony/floating-notes";
import AudioToggle from "@/components/symphony/audio-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Claude Symphony — Multi-AI Orchestration Framework",
  description:
    "10-stage autonomous development pipeline powered by Claude, Gemini, and Codex. Transform ideas into deployed code.",
  keywords: [
    "AI orchestration",
    "Claude",
    "Gemini",
    "Codex",
    "development pipeline",
    "autonomous coding",
  ],
  openGraph: {
    title: "Claude Symphony — Multi-AI Orchestration Framework",
    description:
      "10-stage autonomous development pipeline powered by Claude, Gemini, and Codex.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#0a0a0f] font-sans text-[#f1f5f9] antialiased`}
      >
        <a
          href="#main-content"
          className="skip-to-content sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#8b5cf6] focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <FloatingNotes />
        <main id="main-content">{children}</main>
        <AudioToggle />
      </body>
    </html>
  );
}
