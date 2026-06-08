import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Departments from "@/components/site/Departments";

const renderWithProviders = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter>
        <Departments />
      </MemoryRouter>
    </QueryClientProvider>,
  );

describe("Departments", () => {
  it("renders each department as a link to its detail page", () => {
    renderWithProviders();
    const link = screen.getByRole("link", { name: /General Medicine/i });
    expect(link).toHaveAttribute("href", "/departments/general-medicine");
  });
});
