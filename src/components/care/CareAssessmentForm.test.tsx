import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect } from "vitest";
import CareAssessmentForm from "./CareAssessmentForm";
import { buildCareRequestMessage } from "@/lib/careRequest";

const renderForm = (props: { defaultCareType?: string } = {}) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <CareAssessmentForm {...props} />
    </QueryClientProvider>
  );
};

const fillRequired = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText(/your name/i), "Ada Obi");
  await user.type(screen.getByLabelText(/phone number/i), "+2348012345678");
  await user.click(screen.getByLabelText(/a family member or friend/i));
  await user.type(screen.getByLabelText(/about the situation/i), "My father has advanced heart failure.");
};

describe("CareAssessmentForm", () => {
  it("asks for the essentials before continuing", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole("button", { name: /continue/i }));
    expect(await screen.findByText(/please tell us your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please choose who needs care/i)).toBeInTheDocument();
    expect(screen.getByText(/a little about the situation/i, { selector: "span" })).toBeInTheDocument();
  });

  it("pre-selects the care type passed in from a service page", () => {
    renderForm({ defaultCareType: "hospice-care" });
    expect(screen.getByLabelText(/type of care/i)).toHaveValue("hospice-care");
  });

  it("falls back to 'Not sure yet' for an unknown care type", () => {
    renderForm({ defaultCareType: "nonsense" });
    expect(screen.getByLabelText(/type of care/i)).toHaveValue("not-sure");
  });

  it("offers WhatsApp and email with the request filled in", async () => {
    const user = userEvent.setup();
    renderForm({ defaultCareType: "palliative-care" });
    await fillRequired(user);
    await user.click(screen.getByRole("button", { name: /continue/i }));

    const wa = await screen.findByRole("link", { name: /send via whatsapp/i });
    const mail = screen.getByRole("link", { name: /send via email/i });
    const waText = decodeURIComponent(wa.getAttribute("href")!);
    expect(wa.getAttribute("href")).toMatch(/^https:\/\/wa\.me\/2348144490900/);
    expect(waText).toContain("Type of care: Palliative Care");
    expect(waText).toContain("Care is for: A family member or friend");
    expect(mail.getAttribute("href")).toMatch(/^mailto:tannjes03@gmail\.com/);
  });

  it("nudges people to call when care is needed today", async () => {
    const user = userEvent.setup();
    renderForm();
    await fillRequired(user);
    await user.click(screen.getByLabelText(/^today$/i));
    await user.click(screen.getByRole("button", { name: /continue/i }));
    expect(await screen.findByText(/you said care is needed today/i)).toBeInTheDocument();
  });
});

describe("buildCareRequestMessage", () => {
  it("leaves out the patient line when no patient name is given", () => {
    const msg = buildCareRequestMessage({
      name: "Ada",
      phone: "0801",
      email: "",
      who: "myself",
      careType: "not-sure",
      setting: "unsure",
      urgency: "planning",
      details: "Planning ahead.",
    });
    expect(msg).not.toContain("Patient name");
    expect(msg).toContain("Type of care: Not sure yet");
    expect(msg).toContain("Email: Not given");
  });
});
