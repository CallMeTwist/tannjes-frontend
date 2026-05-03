export const TCL_WHATSAPP_NUMBER = "2347019090013";
export const TCL_EMAIL = "tannjes03@gmail.com";
export const TCL_PHONE_PRIMARY = "+2347019090013";
export const TCL_PHONE_SECONDARY = "+2347086113160";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${TCL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl({ subject, body }: { subject: string; body: string }): string {
  return `mailto:${TCL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
