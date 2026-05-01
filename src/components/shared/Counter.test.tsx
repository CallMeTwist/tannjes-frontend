import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Counter } from "./Counter";

class MockIO {
  cb: IntersectionObserverCallback;
  constructor(cb: IntersectionObserverCallback) { this.cb = cb; }
  observe() { this.cb([{ isIntersecting: true } as IntersectionObserverEntry], this as unknown as IntersectionObserver); }
  disconnect() {}
  unobserve() {}
  takeRecords() { return []; }
  root = null; rootMargin = ""; thresholds = [];
}

describe("Counter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    (globalThis as unknown as { IntersectionObserver: typeof IntersectionObserver }).IntersectionObserver = MockIO as unknown as typeof IntersectionObserver;
    let now = 0;
    vi.spyOn(performance, "now").mockImplementation(() => now);
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
      now += 16;
      return setTimeout(() => cb(now), 16) as unknown as number;
    });
  });

  it("counts up to target when in view", async () => {
    render(<Counter to={100} duration={500} />);
    expect(screen.getByText("0")).toBeInTheDocument();
    await act(async () => { vi.advanceTimersByTime(2000); });
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});
