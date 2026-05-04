import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.stubEnv("VITE_API_URL", "http://localhost:8000");

type IOEntry = Pick<IntersectionObserverEntry, "target" | "isIntersecting" | "intersectionRatio">;
type IOCallback = (entries: IOEntry[]) => void;

class IntersectionObserverMock {
  callback: IOCallback;
  targets = new Set<Element>();
  constructor(callback: IOCallback) {
    this.callback = callback;
    const g = globalThis as unknown as { __ioInstances?: IntersectionObserverMock[] };
    if (!g.__ioInstances) g.__ioInstances = [];
    g.__ioInstances.push(this);
  }
  observe(el: Element) {
    this.targets.add(el);
  }
  unobserve(el: Element) {
    this.targets.delete(el);
  }
  disconnect() {
    this.targets.clear();
  }
  takeRecords() {
    return [];
  }
}
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});
Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

(globalThis as unknown as {
  fireIntersection: (predicate: (el: Element) => boolean, ratio: number) => void;
}).fireIntersection = (predicate, ratio) => {
  const instances: IntersectionObserverMock[] =
    (globalThis as unknown as { __ioInstances?: IntersectionObserverMock[] }).__ioInstances ?? [];
  for (const inst of instances) {
    const entries: IOEntry[] = [];
    for (const t of inst.targets) {
      if (predicate(t)) {
        entries.push({ target: t, isIntersecting: ratio > 0, intersectionRatio: ratio });
      }
    }
    if (entries.length) inst.callback(entries);
  }
};

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
