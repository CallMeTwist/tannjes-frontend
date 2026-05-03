import { render, screen, act, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import EmergencySplash from "./EmergencySplash";

const FLAG = "tcl-emergency-splash-seen";

const renderSplash = () => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <EmergencySplash />
    </QueryClientProvider>,
  );
};

describe("EmergencySplash", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the dialog when the session flag is absent", () => {
    renderSplash();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /\+234 701 909 0013/ })).toHaveAttribute(
      "href",
      "tel:+2347019090013",
    );
  });

  it("renders nothing when the session flag is set", () => {
    sessionStorage.setItem(FLAG, "1");
    renderSplash();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("sets the flag and unmounts on Continue tap", () => {
    renderSplash();
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: /continue to site/i }));
    });
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(sessionStorage.getItem(FLAG)).toBe("1");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("auto-dismisses after 3 seconds and sets the flag", () => {
    renderSplash();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(3000);
      vi.advanceTimersByTime(400);
    });
    expect(sessionStorage.getItem(FLAG)).toBe("1");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("dismisses on Escape key", () => {
    renderSplash();
    act(() => {
      fireEvent.keyDown(window, { key: "Escape" });
    });
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(sessionStorage.getItem(FLAG)).toBe("1");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
