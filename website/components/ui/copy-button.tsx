"use client";

import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { type ButtonHTMLAttributes, useState } from "react";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

export default function CopyButton({
  text,
  className,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API may not be available
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-3 rounded-lg border border-white/10 bg-[#111827] px-5 py-3 font-mono text-sm text-[#e2e8f0] transition-colors hover:border-[#8b5cf6]/40 hover:bg-[#111827]/80",
        className
      )}
      aria-live="polite"
      aria-label={copied ? "Copied to clipboard" : `Copy: ${text}`}
      {...props}
    >
      <span className="text-[#10b981]">$</span>
      <span>{text}</span>
      {copied ? (
        <Check className="h-4 w-4 text-[#10b981]" />
      ) : (
        <Copy className="h-4 w-4 text-[#64748b]" />
      )}
    </button>
  );
}
