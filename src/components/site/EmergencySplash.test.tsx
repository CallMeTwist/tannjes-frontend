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

  it("renders the dialog after the appear delay when the flag is absent", () => {
    renderSplash();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /\+234 701 909 0013/ })).toHaveAttribute(
      "href",
      "tel:+2347019090013",
    );
  });

  it("renders nothing when the session flag is set", () => {
    sessionStorage.setItem(FLAG, "1");
    renderSplash();
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("sets the flag and unmounts on Continue tap", () => {
    renderSplash();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: /continue to site/i }));
    });
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(sessionStorage.getItem(FLAG)).toBe("1");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("dismisses on Escape key", () => {
    renderSplash();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    act(() => {
      fireEvent.keyDown(window, { key: "Escape" });
    });
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(sessionStorage.getItem(FLAG)).toBe("1");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("dismisses when the backdrop is clicked", () => {
    renderSplash();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: /dismiss emergency notice/i }));
    });
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(sessionStorage.getItem(FLAG)).toBe("1");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
