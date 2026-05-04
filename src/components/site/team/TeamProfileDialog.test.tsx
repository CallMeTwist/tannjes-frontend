import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import TeamProfileDialog from "./TeamProfileDialog";
import type { TeamMember } from "@/data/team";

const member: TeamMember = {
  name: "Dr. Beta",
  role: "Paediatrics",
  bio: "Bio B.",
  image: "/b.jpg",
  credentials: "MBBS, FWACP",
};

describe("TeamProfileDialog", () => {
  it("renders the member's name, role, credentials, bio and book CTA when open", () => {
    render(
      <MemoryRouter>
        <TeamProfileDialog member={member} open onOpenChange={() => {}} />
      </MemoryRouter>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent("Dr. Beta");
    expect(dialog).toHaveTextContent("Paediatrics");
    expect(dialog).toHaveTextContent("MBBS, FWACP");
    expect(dialog).toHaveTextContent("Bio B.");
    expect(screen.getByRole("link", { name: /book appointment/i })).toHaveAttribute(
      "href",
      "/contact#book",
    );
  });

  it("renders nothing when member is null", () => {
    const { queryByRole } = render(
      <MemoryRouter>
        <TeamProfileDialog member={null} open={false} onOpenChange={() => {}} />
      </MemoryRouter>,
    );
    expect(queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onOpenChange when Radix fires close", () => {
    const onOpenChange = vi.fn();
    render(
      <MemoryRouter>
        <TeamProfileDialog member={member} open onOpenChange={onOpenChange} />
      </MemoryRouter>,
    );
    screen.getByRole("button", { name: /close/i }).click();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
