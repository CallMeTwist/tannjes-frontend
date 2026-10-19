import { careServices } from "@/data/careServices";

export type CareNavItem = { to: string; label: string; blurb?: string };

export const CARE_BRAND = "Tannjes Home & Hospice Care";
export const HOSPITAL_BRAND = "Tannjes Clinics Hospital";
export const HOSPITAL_HOME = "/hospital";
export const CARE_CONTACT = "/care/contact";

export const careServiceLinks: CareNavItem[] = careServices.map((s) => ({
  to: s.to,
  label: s.title,
  blurb: s.blurb,
}));

export const careSupportLinks: CareNavItem[] = [
  { to: "/inpatient-hospice", label: "Inpatient Hospice" },
  { to: "/families", label: "For Families" },
  { to: "/getting-care", label: "Getting Care" },
  { to: CARE_CONTACT, label: "Contact" },
];
