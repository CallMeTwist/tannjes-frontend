import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import CareLeadership from "./CareLeadership";
import CareHero from "./CareHero";
import { md } from "@/data/leadership";

describe("CareLeadership", () => {
  it("introduces the Managing Director with photo, role and credentials", () => {
    render(<CareLeadership />);
    expect(screen.getByRole("heading", { name: md.name })).toBeInTheDocument();
    expect(screen.getByText(md.role)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: new RegExp(md.name) })).toBeInTheDocument();
    for (const c of md.credentials) expect(screen.getByText(c)).toBeInTheDocument();
  });

  it("does not publish private details from the CV", () => {
    const { container } = render(<CareLeadership />);
    const text = container.textContent ?? "";
    for (const secret of ["Konoko", "Wuse", "0802", "0803", "gmail", "1971", "Afikpo", "Married", "PDP", "Democratic"]) {
      expect(text).not.toContain(secret);
    }
  });
});

describe("CareHero", () => {
  it("has a slide about the doctor who leads the care, linking to the MD section", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <CareHero />
      </MemoryRouter>
    );
    await user.click(screen.getByRole("button", { name: /show slide 2 of 2/i }));
    expect(await screen.findByRole("heading", { level: 1, name: /care led by a doctor/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /meet dr\. jennifer/i })).toHaveAttribute("href", "#leadership");
  });
});
