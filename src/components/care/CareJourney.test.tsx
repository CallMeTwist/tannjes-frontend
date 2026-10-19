import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect } from "vitest";
import CareJourney from "./CareJourney";
import { steps } from "@/data/careHome";

const renderJourney = () => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <CareJourney />
    </QueryClientProvider>
  );
};

describe("CareJourney", () => {
  it("shows all five steps in order", () => {
    renderJourney();
    expect(steps).toHaveLength(5);
    const buttons = screen.getAllByRole("button", { name: /^step \d:/i });
    expect(buttons).toHaveLength(5);
    steps.forEach((s, i) => expect(buttons[i]).toHaveAccessibleName(`Step ${i + 1}: ${s.title}`));
  });

  it("highlights a step and shows its description when chosen", async () => {
    const user = userEvent.setup();
    const { container } = renderJourney();
    await user.click(screen.getByRole("button", { name: `Step 3: ${steps[2].title}` }));
    expect(screen.getByRole("button", { name: `Step 3: ${steps[2].title}` })).toHaveAttribute("aria-current", "step");
    const live = container.querySelector("[aria-live=polite]") as HTMLElement;
    // The previous step fades out first, so wait for the new description.
    expect(await within(live).findByText(steps[2].text)).toBeInTheDocument();
    expect(within(live).getByText((_, el) => el?.textContent === "Step 3 of 5")).toBeInTheDocument();
  });
});
