import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import TeamSlider from "./TeamSlider";

const members = [
  { name: "Dr. Alpha", role: "Cardiology", bio: "Bio A.", image: "/a.jpg" },
  { name: "Dr. Beta", role: "Paediatrics", bio: "Bio B.", image: "/b.jpg" },
  { name: "Dr. Gamma", role: "Geriatrics", bio: "Bio C.", image: "/c.jpg" },
];

const renderSlider = (props = {}) =>
  render(
    <MemoryRouter>
      <TeamSlider members={members} {...props} />
    </MemoryRouter>,
  );

describe("TeamSlider", () => {
  it("renders the first member by default", () => {
    renderSlider();
    expect(screen.getByRole("heading", { name: "Dr. Alpha" })).toBeInTheDocument();
  });

  it("switches to a member when their thumbnail is clicked", async () => {
    const user = userEvent.setup();
    renderSlider();
    await user.click(screen.getByRole("button", { name: /show dr\. beta/i }));
    expect(await screen.findByRole("heading", { name: "Dr. Beta" })).toBeInTheDocument();
  });

  it("ArrowRight advances and wraps", async () => {
    renderSlider();
    const region = screen.getByRole("region", { name: /team/i });
    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(await screen.findByRole("heading", { name: "Dr. Beta" })).toBeInTheDocument();
    fireEvent.keyDown(region, { key: "ArrowRight" });
    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(await screen.findByRole("heading", { name: "Dr. Alpha" })).toBeInTheDocument();
  });

  it("ArrowLeft rewinds and wraps", async () => {
    renderSlider();
    const region = screen.getByRole("region", { name: /team/i });
    fireEvent.keyDown(region, { key: "ArrowLeft" });
    expect(await screen.findByRole("heading", { name: "Dr. Gamma" })).toBeInTheDocument();
  });

  it("renders fallback when members is empty", () => {
    render(
      <MemoryRouter>
        <TeamSlider members={[]} />
      </MemoryRouter>,
    );
    expect(screen.getByText(/team coming soon/i)).toBeInTheDocument();
  });
});
