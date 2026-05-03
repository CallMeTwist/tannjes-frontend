import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import EmergencyFloatingButton from "./EmergencyFloatingButton";

describe("EmergencyFloatingButton", () => {
  it("renders a tel: link to the primary number", () => {
    render(<EmergencyFloatingButton />);
    const link = screen.getByRole("link", { name: /emergency/i });
    expect(link).toHaveAttribute("href", "tel:+2347019090013");
  });

  it("has an accessible name mentioning emergency", () => {
    render(<EmergencyFloatingButton />);
    expect(screen.getByRole("link", { name: /emergency/i })).toBeInTheDocument();
  });
});
