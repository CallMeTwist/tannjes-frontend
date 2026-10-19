import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect } from "vitest";
import CareHome from "./CareHome";
import { careServices } from "@/data/careServices";
import { careFaqs } from "@/data/careHome";

const renderHome = () => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <HelmetProvider>
      <QueryClientProvider client={client}>
        <MemoryRouter>
          <CareHome />
        </MemoryRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

describe("CareHome", () => {
  it("leads with the care brand hero", () => {
    renderHome();
    expect(screen.getByRole("heading", { level: 1, name: /expert care for serious illness/i })).toBeInTheDocument();
  });

  it("links every care service card to its page", () => {
    renderHome();
    for (const s of careServices) {
      expect(screen.getByRole("link", { name: new RegExp(`learn more about ${s.title}`, "i") })).toHaveAttribute("href", s.to);
    }
    // Renders the full home page and runs 8 role queries, so allow for a busy machine.
  }, 15000);

  it("offers a way through to the hospital near the end of the page", () => {
    renderHome();
    const bridge = screen.getByRole("heading", { name: /hospital care when you need it/i }).closest("section")!;
    expect(within(bridge).getByRole("link", { name: /visit tannjes clinics hospital/i })).toHaveAttribute("href", "/hospital");
  });

  it("expands an FAQ answer when its question is clicked", async () => {
    renderHome();
    const first = careFaqs[0];
    await userEvent.click(screen.getByRole("button", { name: first.q }));
    expect(screen.getByText(first.a)).toBeVisible();
  });
});
