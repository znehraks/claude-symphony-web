export type AIModel = "claude" | "gemini" | "codex";

export interface Stage {
  id: string;
  number: string;
  name: string;
  description: string;
  aiModel: AIModel;
  aiModelLabel: string;
  executionMode: string;
  inputs: string[];
  outputs: string[];
  color: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
  highlight?: string;
}

export interface Metric {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface QuickStartStep {
  type: "command" | "output";
  text: string;
  delay?: number;
}
