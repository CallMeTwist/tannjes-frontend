import type { LucideIcon } from "lucide-react";
import {
  Bath,
  BedDouble,
  BookHeart,
  Coffee,
  HandHeart,
  Heart,
  HeartHandshake,
  Hospital,
  Mail,
  MapPin,
  MessageCircle,
  Moon,
  Phone,
  ShieldCheck,
  Soup,
  Stethoscope,
  Sunrise,
  Users,
} from "lucide-react";

// DRAFT COPY for Inpatient Hospice, For Families and Getting Care.
// Visiting, overnight stays, admission and referral details must be confirmed by the Tannjes team.

type IconItem = { icon: LucideIcon; title: string; text: string };
type Faq = { q: string; a: string };

/* ---------------- Inpatient hospice ---------------- */

export const inpatientReasons: IconItem[] = [
  {
    icon: Stethoscope,
    title: "Settling symptoms",
    text: "A short stay to get pain or other symptoms under control, then home again when ready.",
  },
  {
    icon: Coffee,
    title: "Respite for carers",
    text: "A planned break for families, knowing their loved one is safe and well cared for.",
  },
  {
    icon: Sunrise,
    title: "Care at the end of life",
    text: "When home isn't possible or isn't preferred, a peaceful place for the final days.",
  },
  {
    icon: Hospital,
    title: "After a hospital stay",
    text: "Time to recover and plan next steps before going home.",
  },
];

export const inpatientCare: IconItem[] = [
  { icon: Moon, title: "Nursing around the clock", text: "Nurses on hand day and night, with regular doctor reviews." },
  { icon: BedDouble, title: "Comfortable rooms", text: "Quiet, private rooms." },
  { icon: Users, title: "Family welcome", text: "Family can visit and stay close." },
  { icon: HandHeart, title: "Spiritual support", text: "Christian and Muslim spiritual care, arranged on request." },
  { icon: Soup, title: "Nourishment and comfort", text: "Help with eating and drinking, at the person's own pace." },
  { icon: ShieldCheck, title: "Backed by our hospital", text: "Tannjes Clinics hospital is close at hand if treatment is needed." },
];

export const whatToBring: string[] = [
  "Comfortable clothes and nightwear",
  "Toiletries and any personal care items",
  "All current medicines, in their original packets",
  "Recent hospital letters, test results or discharge notes",
  "ID and HMO or insurance card, if you have one",
  "Familiar things from home, such as photos, a blanket or prayer items",
];

export const admissionSteps: { title: string; text: string }[] = [
  { title: "Talk to us", text: "You, your family or your doctor can contact our care team." },
  { title: "Assessment", text: "A senior nurse understands the person's needs and wishes." },
  { title: "Plan the stay", text: "We agree the reason for the stay and a date that works for you." },
  { title: "During and after", text: "We review care regularly and plan for going home where possible." },
];

export const inpatientFaqs: Faq[] = [
  {
    q: "Is the inpatient hospice a hospital ward?",
    a: "No. It is a calm, homely unit focused on comfort rather than investigations and treatment. If hospital care is needed, Tannjes Clinics hospital is close at hand.",
  },
  {
    q: "Does everyone who comes in stay until the end of life?",
    a: "No. Many people come in for a short stay to get symptoms under control or to give their carers a rest, and then go home.",
  },
  {
    q: "When can family visit?",
    a: "Family and friends are welcome. We agree visiting arrangements with each family so the person can rest and loved ones can be close.",
  },
  {
    q: "How much does a stay cost?",
    a: "It depends on the length of stay and the care needed. We explain costs clearly before admission. Please ask us about HMO and insurance cover.",
  },
];

/* ---------------- For families ---------------- */

export const familyHelp: IconItem[] = [
  {
    icon: Bath,
    title: "Caregiver training",
    text: "One-to-one training at home in the care your family member needs.",
  },
  {
    icon: Coffee,
    title: "Respite",
    text: "Our team steps in at home, or for a short stay in our hospice, so you can rest.",
  },
  {
    icon: BookHeart,
    title: "Knowing what to expect",
    text: "Clear explanations of what is happening and what may happen next.",
  },
  {
    icon: HeartHandshake,
    title: "Bereavement support",
    text: "We stay in touch after a death and can put you in touch with further support.",
  },
];

// Training topics from the existing Newborn & Caregiver Training service.
export const trainingTopics: string[] = [
  "Bathing, feeding and skin care",
  "Giving medicines safely",
  "Wound care and dressings",
  "NGT/PEG tube feeding",
  "Moving and positioning someone safely",
  "Keeping the home safe",
];

export const selfCare: IconItem[] = [
  { icon: Moon, title: "Rest when you can", text: "Tiredness builds up. Short breaks really do make a difference." },
  { icon: Users, title: "Accept help", text: "Let family, friends and our team share the load." },
  { icon: MessageCircle, title: "Talk to someone", text: "Worry, sadness and frustration are normal. Talking to family, a friend or our team can help." },
  { icon: Heart, title: "Look after your health", text: "Keep your own appointments, eat well and take your own medicines." },
];

export const familyFaqs: Faq[] = [
  {
    q: "Can you train a family member or our house help?",
    a: "Yes. We train whoever will be helping with care at home, one-to-one and at a pace that suits them.",
  },
  {
    q: "We're exhausted. Can we get a break?",
    a: "Yes. We can arrange carers at home for a few hours or overnight, or a short respite stay in our inpatient hospice.",
  },
  {
    q: "Can we call at night if we're worried?",
    a: "Yes. Our care line is open 24 hours a day. A nurse can advise you, visit, or arrange the next step.",
  },
  {
    q: "Who can we talk to after our loved one dies?",
    a: "Our team stays in touch with families after a loss, and can help you find counselling or faith-based support if you would like it.",
  },
];

/* ---------------- Getting care ---------------- */

export const contactRoutes = (phone: string, address: string): (IconItem & { href?: string; to?: string; external?: boolean })[] => [
  { icon: Phone, title: "Call us", text: `${phone}, day or night`, href: `tel:${phone}` },
  { icon: MessageCircle, title: "WhatsApp", text: "Message a nurse and we'll reply as soon as we can", external: true },
  { icon: Mail, title: "Request online", text: "Tell us a little about the situation and we'll call you back", to: "/care/contact" },
  { icon: MapPin, title: "Visit us", text: address },
];

export const haveReady: string[] = [
  "The person's main diagnosis or health conditions",
  "A list of current medicines",
  "Recent hospital letters, test results or discharge notes",
  "Contact details for their doctor or specialist",
  "HMO or insurance details, if you have them",
];

export const assessmentPoints: string[] = [
  "A senior nurse meets you at home, in hospital or at our hospice",
  "We talk about health, symptoms, daily needs and the person's wishes",
  "We look at the home set-up and any equipment that might help",
  "We agree a care plan together, and explain costs before any care begins",
];

export const referralInclude: string[] = [
  "Patient name, age and contact details (and next of kin)",
  "Diagnosis and relevant medical history",
  "Current medicines and allergies",
  "Reason for referral and how urgent it is",
  "Confirmation that the patient or family agrees to the referral",
];

export const gettingCareFaqs: Faq[] = [
  {
    q: "Do I need a doctor's referral?",
    a: "No. You, a family member or a doctor can contact us directly. If you already have a doctor, we will work closely with them.",
  },
  {
    q: "How quickly can care start?",
    a: "We arrange an assessment as soon as we can and will tell you honestly how quickly care can begin. If things are urgent, please call us.",
  },
  {
    q: "Which areas do you cover?",
    a: "We provide home care across Abuja. Call or WhatsApp us to confirm your area.",
  },
  {
    q: "How much does care cost? Do you accept HMOs?",
    a: "Every care plan is different. We explain costs clearly after the assessment, before any care begins. Please contact us to ask about HMO and insurance cover.",
  },
];
