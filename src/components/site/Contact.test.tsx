import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Contact } from "./Contact";

describe("Contact form", () => {
  it("blocks submit until required fields are filled, then exposes WhatsApp + Email actions", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/full name/i), "Ada Obi");
    await user.type(screen.getByLabelText(/phone/i), "+2348012345678");
    await user.type(screen.getByLabelText(/message/i), "Please call me back");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    const wa = await screen.findByRole("link", { name: /send via whatsapp/i });
    const mail = screen.getByRole("link", { name: /send via email/i });
    expect(wa.getAttribute("href")).toMatch(/^https:\/\/wa\.me\/2347019090013/);
    expect(mail.getAttribute("href")).toMatch(/^mailto:tannjes03@gmail\.com/);
  });
});
