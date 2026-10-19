import { z } from "zod";
import { careServices } from "@/data/careServices";

export const careTypeOptions: { value: string; label: string }[] = [
  { value: "not-sure", label: "Not sure yet" },
  ...careServices.map((s) => ({ value: s.to.slice(1), label: s.title })),
  { value: "inpatient-hospice", label: "Inpatient hospice stay" },
  { value: "respite", label: "Respite (a break for carers)" },
];

export const whoOptions = [
  { value: "myself", label: "Myself" },
  { value: "family", label: "A family member or friend" },
  { value: "patient", label: "A patient (I'm a health professional)" },
] as const;

export const settingOptions = [
  { value: "home", label: "At home" },
  { value: "inpatient", label: "In the inpatient hospice" },
  { value: "unsure", label: "Not sure" },
] as const;

export const urgencyOptions = [
  { value: "today", label: "Today" },
  { value: "this-week", label: "This week" },
  { value: "planning", label: "Planning ahead" },
] as const;

const values = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

export const careRequestSchema = z.object({
  name: z.string().trim().min(1, "Please tell us your name"),
  phone: z.string().trim().min(7, "Please give a phone number we can call"),
  email: z.string().trim().email("Please check the email address").optional().or(z.literal("")),
  who: z.enum(values(whoOptions), { errorMap: () => ({ message: "Please choose who needs care" }) }),
  patientName: z.string().trim().optional(),
  careType: z.string().min(1),
  setting: z.enum(values(settingOptions)),
  urgency: z.enum(values(urgencyOptions)),
  area: z.string().trim().optional(),
  details: z.string().trim().min(1, "Please tell us a little about the situation"),
  callTime: z.string().trim().optional(),
});

export type CareRequest = z.infer<typeof careRequestSchema>;

const labelOf = (opts: readonly { value: string; label: string }[], v: string) =>
  opts.find((o) => o.value === v)?.label ?? v;

/** Plain-text summary used for both the WhatsApp message and the email body. */
export function buildCareRequestMessage(v: CareRequest): string {
  const lines = [
    "Care assessment request: Tannjes Home & Hospice Care",
    "",
    `Name: ${v.name}`,
    `Phone: ${v.phone}`,
    `Email: ${v.email || "Not given"}`,
    `Care is for: ${labelOf(whoOptions, v.who)}`,
  ];
  if (v.patientName) lines.push(`Patient name: ${v.patientName}`);
  lines.push(
    `Type of care: ${labelOf(careTypeOptions, v.careType)}`,
    `Preferred setting: ${labelOf(settingOptions, v.setting)}`,
    `How soon: ${labelOf(urgencyOptions, v.urgency)}`,
    `Area: ${v.area || "Not given"}`,
    `Best time to call: ${v.callTime || "Not given"}`,
    "",
    v.details,
  );
  return lines.join("\n");
}
