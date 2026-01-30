import { describe, it, expect } from "vitest";
import { STAGES, FEATURES, METRICS, QUICK_START_STEPS, AI_COLORS } from "@/lib/data";

describe("STAGES data", () => {
  it("has exactly 10 stages", () => {
    expect(STAGES).toHaveLength(10);
  });

  it("stages are numbered 01-10", () => {
    const numbers = STAGES.map((s) => s.number);
    expect(numbers).toEqual(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]);
  });

  it("each stage has required fields", () => {
    for (const stage of STAGES) {
      expect(stage.id).toBeTruthy();
      expect(stage.name).toBeTruthy();
      expect(stage.description).toBeTruthy();
      expect(stage.aiModel).toBeTruthy();
      expect(stage.color).toMatch(/^#[0-9a-f]{6}$/i);
      expect(stage.outputs.length).toBeGreaterThan(0);
    }
  });

  it("uses valid AI model identifiers", () => {
    const validModels = ["claude", "gemini", "codex"];
    for (const stage of STAGES) {
      expect(validModels).toContain(stage.aiModel);
    }
  });
});

describe("FEATURES data", () => {
  it("has exactly 9 features", () => {
    expect(FEATURES).toHaveLength(9);
  });

  it("each feature has title and description", () => {
    for (const feature of FEATURES) {
      expect(feature.title).toBeTruthy();
      expect(feature.description.length).toBeGreaterThan(20);
      expect(feature.icon).toBeTruthy();
    }
  });
});

describe("METRICS data", () => {
  it("has exactly 4 metrics", () => {
    expect(METRICS).toHaveLength(4);
  });

  it("each metric has value and label", () => {
    for (const metric of METRICS) {
      expect(typeof metric.value).toBe("number");
      expect(metric.label).toBeTruthy();
    }
  });
});

describe("QUICK_START_STEPS", () => {
  it("starts with a command", () => {
    expect(QUICK_START_STEPS[0].type).toBe("command");
  });

  it("ends with a success message", () => {
    const last = QUICK_START_STEPS[QUICK_START_STEPS.length - 1];
    expect(last.text).toContain("✓");
  });
});

describe("AI_COLORS", () => {
  it("has colors for all AI models", () => {
    expect(AI_COLORS.claude).toBe("#8b5cf6");
    expect(AI_COLORS.gemini).toBe("#10b981");
    expect(AI_COLORS.codex).toBe("#f59e0b");
  });
});
