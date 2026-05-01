import { describe, it, expect } from "vitest";
import { buildWhatsAppUrl, buildMailtoUrl, TCL_WHATSAPP_NUMBER, TCL_EMAIL } from "./contact";

describe("buildWhatsAppUrl", () => {
  it("uses the TCL WhatsApp number and url-encodes the message", () => {
    const url = buildWhatsAppUrl("Hello & welcome");
    expect(url).toBe(`https://wa.me/${TCL_WHATSAPP_NUMBER}?text=Hello%20%26%20welcome`);
  });
});

describe("buildMailtoUrl", () => {
  it("builds a mailto with subject and body url-encoded", () => {
    const url = buildMailtoUrl({ subject: "Booking request", body: "Name: Ada\nPhone: +234..." });
    expect(url).toBe(`mailto:${TCL_EMAIL}?subject=Booking%20request&body=Name%3A%20Ada%0APhone%3A%20%2B234...`);
  });
});
