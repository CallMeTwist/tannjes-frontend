import type { LucideIcon } from "lucide-react";
import { Stethoscope, HeartPulse, Home, HandHeart, Syringe, Plane, Baby } from "lucide-react";
import heroDoctor from "@/assets/hero-doctor.jpg";
import elderlyWheelchair from "@/assets/care/elderly-wheelchair.jpeg";
import ambulanceTransfer from "@/assets/care/ambulance-transfer.jpeg";
import careTeam from "@/assets/care/care-team.jpeg";
import serviceNewborn from "@/assets/service-newborn.jpg";
import hospiceRoom from "@/assets/care/hospice-room.jpeg";
import conciergeAir from "@/assets/care/concierge-air-transfer.jpeg";

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
    description: "Medical care at your home, hotel or office, anywhere in Abuja.",
    icon: Stethoscope,
    bullets: ["Home, office and hotel visits", "Routine screening referrals", "Lifestyle and nutrition counselling"],
    image: heroDoctor,
  },
  {
    slug: "geriatrics",
    title: "Geriatrics Care (Elderly Comfort)",
    description: "Medical care and daily support for elderly people and their families.",
    icon: HeartPulse,
    bullets: ["General medical and surgical care", "Incontinence and neurological support", "Stabilization and daily living assistance"],
    image: elderlyWheelchair,
  },
  {
    slug: "hospital-to-home",
    title: "Hospital to Home Care",
    description: "Smooth transition from hospital discharge to recovery at home.",
    icon: Home,
    bullets: ["Post-surgery and chronic illness care", "Family and physician coordination", "Goal-oriented recovery support"],
    image: ambulanceTransfer,
  },
  {
    slug: "palliative",
    title: "Palliative Care",
    description: "Comfort care and symptom relief for patients with serious illness.",
    icon: HandHeart,
    bullets: ["Pain management and feeding assistance", "Psychological and emotional support", "Daily living and family support"],
    image: hospiceRoom,
  },
  {
    slug: "skilled-nursing",
    title: "Skilled Nursing",
    description: "Post-operative and post-hospitalization nursing by trained professionals.",
    icon: Syringe,
    bullets: ["High-level surgical and custodial care", "NGT/PEG nutrition therapy", "Wound, tracheostomy and colostomy care"],
    image: careTeam,
  },
  {
    slug: "medical-escort",
    title: "Medical Escort Services",
    description: "Safe medical travel by land or air.",
    icon: Plane,
    bullets: ["Land and air medical concierge", "Medical evacuation support", "Network of partner hospitals nationwide"],
    image: conciergeAir,
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
