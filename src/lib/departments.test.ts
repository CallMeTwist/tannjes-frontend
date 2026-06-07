import { describe, expect, it } from "vitest";
import { resolveIcon } from "@/lib/departments";
import { HeartPulse, Stethoscope } from "lucide-react";

describe("resolveIcon", () => {
  it("maps a known icon name to its component", () => {
    expect(resolveIcon("HeartPulse")).toBe(HeartPulse);
  });
  it("falls back to Stethoscope for unknown/empty names", () => {
    expect(resolveIcon("Nope")).toBe(Stethoscope);
    expect(resolveIcon(null)).toBe(Stethoscope);
  });
});
