import type { LucideIcon } from "lucide-react";
import { Stethoscope, HeartPulse, Home, HandHeart, Syringe, Plane, Baby } from "lucide-react";
import heroDoctor from "@/assets/hero-doctor.jpg";
import serviceElderly from "@/assets/service-elderly.jpg";
import serviceHome from "@/assets/service-home.jpg";
import serviceNursing from "@/assets/service-nursing.jpg";
import serviceNewborn from "@/assets/service-newborn.jpg";
import ctaFamily from "@/assets/cta-family.jpg";
import facilityRecovery from "@/assets/facility-recovery.jpg";

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
  image: string;
};

export const services: Service[] = [
  {
    slug: "doctor-at-home",
    title: "Doctor at Home, Hotel, or Workplace",
    description: "Personalized medical care delivered to your doorstep — anywhere in Abuja.",
    icon: Stethoscope,
    bullets: ["Home, office and hotel visits", "Routine screening referrals", "Lifestyle and nutrition counselling"],
    image: heroDoctor,
  },
  {
    slug: "geriatrics",
    title: "Geriatrics Care (Elderly Comfort)",
    description: "Dignified, compassionate care for elderly loved ones and their families.",
    icon: HeartPulse,
    bullets: ["General medical and surgical care", "Incontinence and neurological support", "Stabilization and daily living assistance"],
    image: serviceElderly,
  },
  {
    slug: "hospital-to-home",
    title: "Hospital to Home Care",
    description: "Smooth transition from hospital discharge to recovery at home.",
    icon: Home,
    bullets: ["Post-surgery and chronic illness care", "Family and physician coordination", "Goal-oriented recovery support"],
    image: serviceHome,
  },
  {
    slug: "palliative",
    title: "Palliative Care",
    description: "Holistic comfort and quality-of-life care for patients with serious illness.",
    icon: HandHeart,
    bullets: ["Pain management and feeding assistance", "Psychological and emotional support", "Daily living and family support"],
    image: ctaFamily,
  },
  {
    slug: "skilled-nursing",
    title: "Skilled Nursing",
    description: "Post-operative and post-hospitalization nursing by trained professionals.",
    icon: Syringe,
    bullets: ["High-level surgical and custodial care", "NGT/PEG nutrition therapy", "Wound, tracheostomy and colostomy care"],
    image: serviceNursing,
  },
  {
    slug: "medical-escort",
    title: "Medical Escort Services",
    description: "Safe, professional medical travel — by land or air, anywhere needed.",
    icon: Plane,
    bullets: ["Land and air medical concierge", "Medical evacuation support", "Network of partner hospitals nationwide"],
    image: facilityRecovery,
  },
  {
    slug: "newborn-caregiver",
    title: "Newborn & Caregiver Training",
    description: "Hands-on training for new parents and caregivers to care with confidence.",
    icon: Baby,
    bullets: ["Bathing, feeding and skin care", "Medication and wound care", "NGT/PEG handling and home safety"],
    image: serviceNewborn,
  },
];
