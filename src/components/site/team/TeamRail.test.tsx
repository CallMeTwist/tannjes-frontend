import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TeamRail from "./TeamRail";
import type { TeamMember } from "@/data/team";

const members: TeamMember[] = [
  { name: "Dr. Alpha", role: "Cardiology", bio: "A", image: "/a.jpg" },
  { name: "Dr. Beta", role: "Paediatrics", bio: "B", image: "/b.jpg" },
  { name: "Dr. Gamma", role: "Geriatrics", bio: "C", image: "/c.jpg" },
];

describe("TeamRail", () => {
  it("renders one button per member labelled with the member's name", () => {
    render(<TeamRail members={members} activeIndex={0} onJump={() => {}} />);
    for (const m of members) {
      expect(
        screen.getByRole("button", { name: new RegExp(`jump to ${m.name}`, "i") }),
      ).toBeInTheDocument();
    }
  });

  it("marks only the active dot with aria-current=true", () => {
    render(<TeamRail members={members} activeIndex={1} onJump={() => {}} />);
    const buttons = screen.getAllByRole("button", { name: /jump to/i });
    expect(buttons[0]).not.toHaveAttribute("aria-current", "true");
    expect(buttons[1]).toHaveAttribute("aria-current", "true");
    expect(buttons[2]).not.toHaveAttribute("aria-current", "true");
  });

  it("calls onJump with the clicked index", async () => {
    const onJump = vi.fn();
    const user = userEvent.setup();
    render(<TeamRail members={members} activeIndex={0} onJump={onJump} />);
    await user.click(screen.getByRole("button", { name: /jump to dr\. gamma/i }));
    expect(onJump).toHaveBeenCalledWith(2);
  });

  it("renders a progressbar with correct value attributes", () => {
    render(<TeamRail members={members} activeIndex={1} onJump={() => {}} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuemin", "1");
    expect(bar).toHaveAttribute("aria-valuemax", "3");
    expect(bar).toHaveAttribute("aria-valuenow", "2");
  });

  it("renders a label showing position and active member name", () => {
    render(<TeamRail members={members} activeIndex={1} onJump={() => {}} />);
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText(/\/\s*03/)).toBeInTheDocument();
    expect(screen.getAllByText(/dr\. beta/i).length).toBeGreaterThan(0);
  });
});
