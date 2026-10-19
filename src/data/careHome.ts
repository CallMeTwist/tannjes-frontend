import type { LucideIcon } from "lucide-react";
import {
  BookHeart,
  Coffee,
  GraduationCap,
  HandHelping,
  MessageCircle,
  ClipboardList,
  FileHeart,
  Stethoscope,
  UserRound,
  Users,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

// DRAFT COPY for the care home page. Clinical statements, timings and the FAQ answers
// must be confirmed by the Tannjes team before launch. No outcome or survival claims.

type IconItem = { icon: LucideIcon; title: string; text: string };

export const audiences: (IconItem & { to: string; cta: string })[] = [
  {
    icon: UserRound,
    title: "I need care for myself",
    text: "Find out what support is available and how to get started.",
    to: "/getting-care",
    cta: "Getting care",
  },
  {
    icon: Users,
    title: "I'm caring for a loved one",
    text: "Practical help, training and support for families and carers.",
    to: "/families",
    cta: "Support for families",
  },
  {
    icon: Stethoscope,
    title: "I'm a doctor or nurse",
    text: "Refer a patient for home, palliative or hospice care.",
    to: "/getting-care#refer",
    cta: "Refer a patient",
  },
];

// Figures reuse what the hospital site already states (12+ years, 24/7).
// Figures: 24/7 and 12+ years are stated on the hospital site; 20+ years is from the MD's CV.
export const trustPoints: { value: string; label: string }[] = [
  { value: "24/7", label: "Care line, day and night" },
  { value: "12+", label: "Years caring for Abuja families" },
  { value: "20+", label: "Years our Managing Director has practised medicine" },
];

export const careTypes: { term: string; text: string }[] = [
  {
    term: "Home care",
    text: "Support at home to recover after illness, manage a long-term condition or stay independent for longer.",
  },
  {
    term: "Palliative care",
    text: "Care that focuses on comfort and quality of life for anyone with a serious illness. It can start at diagnosis and run alongside treatment.",
  },
  {
    term: "Hospice care",
    text: "Palliative care for when an illness can no longer be cured, so the focus is on living as fully and comfortably as possible.",
  },
  {
    term: "End-of-life care",
    text: "Care in the last weeks and days of life. It eases symptoms, follows the person's wishes and supports the family, including after a death.",
  },
];

export const inpatientPoints: string[] = [
  "Comfortable rooms in a calm, homely setting",
  "Nursing around the clock, with doctors on hand",
  "Short stays for symptom control or to give carers a rest",
  "Space for family to stay close",
];

export const steps: IconItem[] = [
  {
    icon: MessageCircle,
    title: "Talk to us",
    text: "Call, WhatsApp or send a message, day or night. You, a family member or a doctor can contact us.",
  },
  {
    icon: FileHeart,
    title: "Share medical history",
    text: "Send any hospital letters, test results and a list of medicines, so we understand the full picture.",
  },
  {
    icon: ClipboardList,
    title: "Assessment",
    text: "A senior nurse meets you at home, in hospital or at our hospice to understand needs and wishes.",
  },
  {
    icon: BookHeart,
    title: "Your care plan",
    text: "We agree a care plan with you, your family and your doctors, and explain the costs before care begins.",
  },
  {
    icon: HeartHandshake,
    title: "Care begins",
    text: "Your team starts care at home, in our hospice or residence, and reviews it as your needs change.",
  },
]

export const familySupport: IconItem[] = [
  {
    icon: GraduationCap,
    title: "Caregiver training",
    text: "Hands-on guidance with medication, wound care, NGT/PEG feeding and keeping the home safe.",
  },
  {
    icon: Coffee,
    title: "Respite",
    text: "Our team takes over at home, or arranges a short stay in our hospice, so carers can rest.",
  },
  {
    icon: Sparkles,
    title: "Knowing what to expect",
    text: "Clear explanations of what is happening and what may happen next.",
  },
  {
    icon: HandHelping,
    title: "Bereavement support",
    text: "We stay in touch with families after a loss, and help you find support when you need it.",
  },
];

export const teamRoles: { title: string; text: string }[] = [
  { title: "Doctors", text: "Lead your care and manage pain and other symptoms." },
  { title: "Nurses", text: "Provide skilled clinical care, at home and on the ward." },
  { title: "Care assistants", text: "Help with personal care and daily living." },
  { title: "Therapists", text: "Support movement, comfort and independence." },
  { title: "Counsellors", text: "Emotional support for patients and families." },
  { title: "Spiritual care", text: "Christian and Muslim spiritual support, on request." },
];

export const careFaqs: { q: string; a: string }[] = [
  {
    q: "Who is palliative or hospice care for?",
    a: "Anyone living with a serious or life-limiting illness, such as cancer, heart, lung or kidney disease, stroke or dementia, and the people who care for them. You can ask for help at any stage of the illness.",
  },
  {
    q: "Do I need a doctor's referral?",
    a: "No. You, a family member or a doctor can contact us directly. If you already have a doctor, we will work closely with them.",
  },
  {
    q: "How do we choose between care at home and the inpatient hospice?",
    a: "Many people prefer to be at home, and we will support that wherever possible. Our inpatient hospice is there when symptoms need closer attention, when carers need a rest, or when home is no longer the right place. We will talk it through with you at the assessment.",
  },
  {
    q: "How much does care cost? Do you accept HMOs?",
    a: "Every care plan is different. We explain costs clearly after the assessment, before any care begins. Please contact us to ask about HMO and insurance cover.",
  },
  {
    q: "Which areas do you cover?",
    a: "We provide home care across Abuja. Call or WhatsApp us to confirm your area.",
  },
  {
    q: "What if things change at night?",
    a: "Our care line is open 24 hours a day. A nurse can advise you, visit, or arrange the next step.",
  },
  {
    q: "What happens if hospital treatment is needed?",
    a: "We are part of Tannjes Clinics, so we can arrange hospital tests or admission quickly and bring you home again when you are ready.",
  },
];
