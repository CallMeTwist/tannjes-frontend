import { settings } from "@/data/settings";

export const TCL_PHONE_PRIMARY = settings.phone_primary;
export const TCL_PHONE_SECONDARY = settings.phone_secondary;
export const TCL_EMAIL = settings.email;
export const TCL_WHATSAPP_NUMBER = settings.phone_primary.replace(/^\+/, "");

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${TCL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl({ subject, body }: { subject: string; body: string }): string {
  return `mailto:${TCL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
