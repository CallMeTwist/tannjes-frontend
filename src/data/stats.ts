export type Stat = { label: string; value: number; suffix?: string };

export const stats: Stat[] = [
  { label: "Years of Service", value: 12, suffix: "+" },
  { label: "Medical Specialties", value: 16 },
  { label: "Patients Cared For", value: 4500, suffix: "+" },
  { label: "Concierge Availability", value: 24, suffix: "/7" },
];
