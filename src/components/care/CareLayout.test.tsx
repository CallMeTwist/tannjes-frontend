import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect } from "vitest";
import CareLayout from "./CareLayout";

const renderLayout = () => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <CareLayout>
          <p>page body</p>
        </CareLayout>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("CareLayout", () => {
  it("links through to the main hospital site", () => {
    renderLayout();
    const links = screen.getAllByRole("link", { name: /tannjes clinics hospital|visit the hospital/i });
    expect(links.length).toBeGreaterThan(0);
    links.forEach((l) => expect(l).toHaveAttribute("href", "/hospital"));
  });

  it("shows the calm care coordinator button instead of the emergency button", () => {
    renderLayout();
    expect(screen.getByRole("link", { name: /care coordinator/i })).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/")
    );
    expect(screen.queryByRole("link", { name: /emergency/i })).not.toBeInTheDocument();
  });

  it("applies the care theme", () => {
    const { container } = renderLayout();
    expect(container.firstChild).toHaveClass("theme-care");
  });
});
