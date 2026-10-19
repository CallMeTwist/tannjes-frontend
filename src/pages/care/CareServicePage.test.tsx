import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect } from "vitest";
import CareServicePage from "./CareServicePage";
import { careServices, type CareService } from "@/data/careServices";

const renderPage = (service: CareService) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <HelmetProvider>
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={[service.to]}>
          <CareServicePage service={service} />
        </MemoryRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

describe("CareServicePage", () => {
  it.each(careServices.map((s) => [s.title, s] as const))("renders the %s page from its data", (_title, service) => {
    renderPage(service);
    expect(screen.getByRole("heading", { level: 1, name: service.title })).toBeInTheDocument();
    for (const d of service.details) {
      expect(screen.getByRole("heading", { name: d.title })).toBeInTheDocument();
    }
    for (const f of service.faqs) {
      expect(screen.getByRole("button", { name: f.q })).toBeInTheDocument();
    }
  });

  it("links to three other services, never itself", () => {
    const service = careServices[0];
    renderPage(service);
    const related = screen.getByRole("heading", { name: /you may also be interested in/i }).closest("section")!;
    const hrefs = within(related).getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toHaveLength(3);
    expect(hrefs).not.toContain(service.to);
  });

  it("points home-only services to the inpatient hospice for closer care", () => {
    const homeOnly = careServices.find((s) => !s.settings.includes("inpatient"))!;
    renderPage(homeOnly);
    expect(screen.getByRole("link", { name: "inpatient hospice" })).toHaveAttribute("href", "/inpatient-hospice");
  });
});
