import { describe, it, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import CopyButton from "@/components/ui/copy-button";
import SectionSkeleton from "@/components/ui/section-skeleton";

describe("CopyButton", () => {
  it("renders command text", () => {
    render(<CopyButton text="npx claude-symphony my-project" />);
    expect(screen.getByText("npx claude-symphony my-project")).toBeInTheDocument();
    cleanup();
  });

  it("shows $ prefix and command", () => {
    render(<CopyButton text="npm install" />);
    expect(screen.getByText("$")).toBeInTheDocument();
    expect(screen.getByText("npm install")).toBeInTheDocument();
    cleanup();
  });

  it("has accessible label", () => {
    render(<CopyButton text="test-cmd" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Copy: test-cmd");
    cleanup();
  });

  it("has aria-live for screen readers", () => {
    render(<CopyButton text="hello" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-live", "polite");
    cleanup();
  });
});

describe("SectionSkeleton", () => {
  it("renders with default height", () => {
    const { container } = render(<SectionSkeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("h-96");
    cleanup();
  });

  it("applies custom height", () => {
    const { container } = render(<SectionSkeleton height="h-64" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("h-64");
    cleanup();
  });

  it("is aria-hidden", () => {
    const { container } = render(<SectionSkeleton />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    cleanup();
  });
});
