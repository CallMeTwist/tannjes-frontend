import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import TeamCard from "./TeamCard";
import type { TeamMember } from "@/data/team";

const member: TeamMember = {
  name: "Dr. Alpha",
  role: "Cardiology",
  bio: "Bio A long enough to be visible.",
  image: "/a.jpg",
  credentials: "MBBS",
};

const renderCard = (overrides: Partial<React.ComponentProps<typeof TeamCard>> = {}) =>
  render(
    <MemoryRouter>
      <TeamCard
        member={member}
        index={0}
        isActive
        eager
        onOpenProfile={() => {}}
        cardRef={createRef<HTMLElement>()}
        {...overrides}
      />
    </MemoryRouter>,
  );

describe("TeamCard", () => {
  it("renders name, role, credentials, bio and image alt text", () => {
    renderCard();
    expect(screen.getByRole("heading", { name: /dr\. alpha/i })).toBeInTheDocument();
    expect(screen.getByText(/cardiology/i)).toBeInTheDocument();
    expect(screen.getByText(/mbbs/i)).toBeInTheDocument();
    expect(screen.getByText(/bio a long enough/i)).toBeInTheDocument();
    expect(screen.getByAltText("Dr. Alpha")).toBeInTheDocument();
  });

  it("calls onOpenProfile when 'View full profile' is clicked", async () => {
    const onOpenProfile = vi.fn();
    const user = userEvent.setup();
    renderCard({ onOpenProfile });
    await user.click(screen.getByRole("button", { name: /view profile/i }));
    expect(onOpenProfile).toHaveBeenCalledTimes(1);
  });

  it("sets data-active attribute reflecting isActive prop", () => {
    const { rerender, container } = render(
      <MemoryRouter>
        <TeamCard
          member={member}
          index={0}
          isActive={false}
          eager
          onOpenProfile={() => {}}
          cardRef={createRef<HTMLElement>()}
        />
      </MemoryRouter>,
    );
    expect(container.querySelector("article")).toHaveAttribute("data-active", "false");

    rerender(
      <MemoryRouter>
        <TeamCard
          member={member}
          index={0}
          isActive
          eager
          onOpenProfile={() => {}}
          cardRef={createRef<HTMLElement>()}
        />
      </MemoryRouter>,
    );
    expect(container.querySelector("article")).toHaveAttribute("data-active", "true");
  });

  it("uses loading=eager only when eager prop is true", () => {
    const { rerender } = render(
      <MemoryRouter>
        <TeamCard
          member={member}
          index={0}
          isActive
          eager
          onOpenProfile={() => {}}
          cardRef={createRef<HTMLElement>()}
        />
      </MemoryRouter>,
    );
    expect(screen.getByAltText("Dr. Alpha")).toHaveAttribute("loading", "eager");

    rerender(
      <MemoryRouter>
        <TeamCard
          member={member}
          index={5}
          isActive={false}
          eager={false}
          onOpenProfile={() => {}}
          cardRef={createRef<HTMLElement>()}
        />
      </MemoryRouter>,
    );
    expect(screen.getByAltText("Dr. Alpha")).toHaveAttribute("loading", "lazy");
  });
});
