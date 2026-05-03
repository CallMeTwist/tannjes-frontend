import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useTeam } from "./useTeam";
import { team as staticTeam } from "@/data/team";

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe("useTeam", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns static fallback while loading", () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useTeam(), { wrapper });
    expect(result.current).toEqual(staticTeam);
  });

  it("returns static fallback when fetch fails", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(new Error("boom"));
    const { result } = renderHook(() => useTeam(), { wrapper });
    await waitFor(() => expect(result.current).toEqual(staticTeam));
  });

  it("returns api data when fetch succeeds", async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => [
        { name: "Dr. X", role: "r", bio: "b", credentials: null, image_url: "https://h/storage/x.jpg", sort_order: 1 },
      ],
    });
    const { result } = renderHook(() => useTeam(), { wrapper });
    await waitFor(() => expect(result.current[0].name).toBe("Dr. X"));
    expect(result.current[0].image).toBe("https://h/storage/x.jpg");
  });
});
