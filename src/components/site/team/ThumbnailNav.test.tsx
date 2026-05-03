import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ThumbnailNav from "./ThumbnailNav";

const members = [
  { name: "Dr. A", role: "r", bio: "b", image: "/a.jpg" },
  { name: "Dr. B", role: "r", bio: "b", image: "/b.jpg" },
  { name: "Dr. C", role: "r", bio: "b", image: "/c.jpg" },
];

describe("ThumbnailNav", () => {
  it("renders one button per member", () => {
    render(<ThumbnailNav members={members} activeIndex={0} onSelect={() => {}} />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("marks the active button with aria-current", () => {
    render(<ThumbnailNav members={members} activeIndex={1} onSelect={() => {}} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).not.toHaveAttribute("aria-current");
    expect(buttons[1]).toHaveAttribute("aria-current", "true");
    expect(buttons[2]).not.toHaveAttribute("aria-current");
  });

  it("calls onSelect with the clicked index", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<ThumbnailNav members={members} activeIndex={0} onSelect={onSelect} />);
    await user.click(screen.getAllByRole("button")[2]);
    expect(onSelect).toHaveBeenCalledWith(2);
  });
});
