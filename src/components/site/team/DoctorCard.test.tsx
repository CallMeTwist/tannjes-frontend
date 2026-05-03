import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import DoctorCard from "./DoctorCard";

const member = {
  name: "Dr. Adaeze Okonkwo",
  role: "Medical Director, General Medicine",
  bio: "20+ years leading concierge medical care in Abuja and beyond.",
  image: "/test.jpg",
};

const renderCard = (props = {}) =>
  render(
    <MemoryRouter>
      <DoctorCard member={member} eager {...props} />
    </MemoryRouter>,
  );

describe("DoctorCard", () => {
  it("renders the member's name, role, and bio", () => {
    renderCard();
    expect(screen.getByRole("heading", { name: member.name })).toBeInTheDocument();
    expect(screen.getByText(member.role)).toBeInTheDocument();
    expect(screen.getByText(member.bio)).toBeInTheDocument();
  });

  it("renders a Book Appointment link to /contact#book", () => {
    renderCard();
    const cta = screen.getByRole("link", { name: /book appointment/i });
    expect(cta).toHaveAttribute("href", "/contact#book");
  });

  it("renders the View profile button as disabled placeholder", () => {
    renderCard();
    const btn = screen.getByRole("button", { name: /view profile/i });
    expect(btn).toHaveAttribute("aria-disabled", "true");
  });

  it("renders credentials line only when provided", () => {
    const { rerender } = renderCard();
    expect(screen.queryByText(/MBBS/i)).not.toBeInTheDocument();
    rerender(
      <MemoryRouter>
        <DoctorCard member={{ ...member, credentials: "MBBS, FMCP" }} eager />
      </MemoryRouter>,
    );
    expect(screen.getByText("MBBS, FMCP")).toBeInTheDocument();
  });
});
