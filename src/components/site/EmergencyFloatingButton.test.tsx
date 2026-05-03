import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect } from "vitest";
import EmergencyFloatingButton from "./EmergencyFloatingButton";

const renderWithClient = (ui: React.ReactElement) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
};

describe("EmergencyFloatingButton", () => {
  it("renders a tel: link to the primary number", () => {
    renderWithClient(<EmergencyFloatingButton />);
    const link = screen.getByRole("link", { name: /emergency/i });
    expect(link).toHaveAttribute("href", "tel:+2347019090013");
  });

  it("has an accessible name mentioning emergency", () => {
    renderWithClient(<EmergencyFloatingButton />);
    expect(screen.getByRole("link", { name: /emergency/i })).toBeInTheDocument();
  });
});
