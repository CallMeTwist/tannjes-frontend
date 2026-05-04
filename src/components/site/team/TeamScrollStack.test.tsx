import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import TeamScrollStack from "./TeamScrollStack";
import type { TeamMember } from "@/data/team";

const members: TeamMember[] = Array.from({ length: 15 }, (_, i) => ({
  name: `Dr. Member ${i + 1}`,
  role: i % 2 === 0 ? "Cardiology" : "Paediatrics",
  bio: `Bio for member ${i + 1}.`,
  image: `/m${i + 1}.jpg`,
  credentials: i === 0 ? "MBBS" : undefined,
}));

const renderStack = (props: Partial<{ members: TeamMember[] }> = {}) =>
  render(
    <MemoryRouter>
      <TeamScrollStack members={props.members ?? members} />
    </MemoryRouter>,
  );

declare global {
  function fireIntersection(predicate: (el: Element) => boolean, ratio: number): void;
}

beforeEach(() => {
  (globalThis as unknown as { __ioInstances: unknown[] }).__ioInstances = [];
});

describe("TeamScrollStack", () => {
  it("renders one rail button per member", () => {
    renderStack();
    expect(
      screen.getAllByRole("button", { name: /jump to dr\. member/i }),
    ).toHaveLength(15);
  });

  it("renders an article per member with the name as a heading", () => {
    renderStack();
    expect(screen.getAllByRole("article")).toHaveLength(15);
    expect(screen.getByRole("heading", { name: /^dr\. member 1$/i })).toBeInTheDocument();
  });

  it("opens the dialog with the active member's bio when 'View full profile' is clicked", async () => {
    const user = userEvent.setup();
    renderStack();
    const card3 = screen
      .getByRole("heading", { name: /^dr\. member 3$/i })
      .closest("article")!;
    await user.click(
      within(card3 as HTMLElement).getByRole("button", { name: /view profile/i }),
    );
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveTextContent("Dr. Member 3");
    expect(dialog).toHaveTextContent("Bio for member 3.");
    expect(within(dialog).getByRole("link", { name: /book appointment/i })).toHaveAttribute(
      "href",
      "/contact#book",
    );
  });

  it("updates aria-current on the rail when a card intersects above threshold", () => {
    renderStack();
    const railButtons = screen.getAllByRole("button", { name: /jump to dr\. member/i });
    expect(railButtons[0]).toHaveAttribute("aria-current", "true");

    act(() => {
      globalThis.fireIntersection(
        (el) => el.getAttribute("data-card-index") === "4",
        0.9,
      );
    });

    const updated = screen.getAllByRole("button", { name: /jump to dr\. member/i });
    expect(updated[4]).toHaveAttribute("aria-current", "true");
    expect(updated[0]).not.toHaveAttribute("aria-current", "true");
  });

  it("calls scrollTo on the container when a rail dot is clicked", async () => {
    const user = userEvent.setup();
    const scrollTo = vi.fn();
    Element.prototype.scrollTo = scrollTo as unknown as typeof Element.prototype.scrollTo;
    renderStack();
    await user.click(screen.getByRole("button", { name: /jump to dr\. member 6/i }));
    expect(scrollTo).toHaveBeenCalled();
    const arg = scrollTo.mock.calls[0][0] as { top: number; behavior: string };
    expect(arg).toMatchObject({ behavior: "smooth" });
    expect(typeof arg.top).toBe("number");
  });

  it("renders the empty-state fallback when members is empty", () => {
    render(
      <MemoryRouter>
        <TeamScrollStack members={[]} />
      </MemoryRouter>,
    );
    expect(screen.getByText(/team coming soon/i)).toBeInTheDocument();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });
});
