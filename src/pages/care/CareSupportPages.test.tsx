import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi } from "vitest";
import InpatientHospice from "./InpatientHospice";
import Families from "./Families";
import GettingCare from "./GettingCare";
import { inpatientReasons, trainingTopics } from "@/data/careSupportPages";

const renderAt = (ui: React.ReactElement, path = "/") => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <HelmetProvider>
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

describe("InpatientHospice", () => {
  it("explains why people stay and what to bring", () => {
    renderAt(<InpatientHospice />, "/inpatient-hospice");
    expect(screen.getByRole("heading", { level: 1, name: /our inpatient hospice/i })).toBeInTheDocument();
    for (const r of inpatientReasons) expect(screen.getByRole("heading", { name: r.title })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /what to bring/i })).toBeInTheDocument();
  });
});

describe("Families", () => {
  it("lists the caregiver training topics", () => {
    renderAt(<Families />, "/families");
    expect(screen.getByRole("heading", { level: 1, name: /support for families and carers/i })).toBeInTheDocument();
    for (const t of trainingTopics) expect(screen.getByText(t)).toBeInTheDocument();
  });
});

describe("GettingCare", () => {
  it("scrolls to the referral section when linked with #refer", () => {
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    const { container } = renderAt(<GettingCare />, "/getting-care#refer");
    const refer = container.querySelector("#refer");
    expect(refer).not.toBeNull();
    expect(scrollIntoView.mock.contexts).toContain(refer);
    expect(screen.getByRole("heading", { name: /refer a patient/i })).toBeInTheDocument();
  });

  it("pre-fills a referral email to the care team", () => {
    renderAt(<GettingCare />, "/getting-care");
    const href = screen.getByRole("link", { name: /email a referral/i }).getAttribute("href")!;
    expect(href).toMatch(/^mailto:/);
    expect(decodeURIComponent(href)).toContain("Reason for referral and urgency");
  });
});
