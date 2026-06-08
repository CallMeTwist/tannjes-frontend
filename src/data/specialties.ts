import type { LucideIcon } from "lucide-react";
import {
  Stethoscope, Scissors, Brain, Droplets, Activity, Baby, Wind, Pill,
  Microscope, ScanLine, HeartPulse, Smile, Ear, Flower, FlaskConical, BookHeart,
} from "lucide-react";

export type Specialty = { name: string; slug: string; description: string; icon: LucideIcon };

export const specialties: Specialty[] = [
  { name: "General Medicine", slug: "general-medicine", description: "Comprehensive primary and internal medicine for adults across every stage of life.", icon: Stethoscope },
  { name: "General Surgery", slug: "general-surgery", description: "Expert surgical care from routine procedures to complex operations.", icon: Scissors },
  { name: "Neurology", slug: "neurology", description: "Diagnosis and management of disorders of the brain, spine and nervous system.", icon: Brain },
  { name: "Haematology", slug: "haematology", description: "Specialist care for blood disorders, anaemia and clotting conditions.", icon: Droplets },
  { name: "Endocrinology", slug: "endocrinology", description: "Management of diabetes, thyroid and hormonal conditions.", icon: Activity },
  { name: "Paediatrics", slug: "paediatrics", description: "Compassionate care for newborns, children and adolescents.", icon: Baby },
  { name: "Urology", slug: "urology", description: "Care for the urinary tract and male reproductive health.", icon: Wind },
  { name: "Nephrology", slug: "nephrology", description: "Kidney health, hypertension and dialysis support.", icon: HeartPulse },
  { name: "Gastroenterology", slug: "gastroenterology", description: "Digestive system, liver and gut health.", icon: Pill },
  { name: "Dermatology", slug: "dermatology", description: "Skin, hair and nail health for all ages.", icon: Smile },
  { name: "ENT", slug: "ent", description: "Ear, nose and throat diagnosis and treatment.", icon: Ear },
  { name: "Obstetrics & Gynaecology", slug: "obstetrics-gynaecology", description: "Women's health, pregnancy and reproductive care.", icon: Flower },
  { name: "Laboratory", slug: "laboratory", description: "Accurate, fast diagnostic testing across all specialties.", icon: FlaskConical },
  { name: "Radiology Diagnostics", slug: "radiology-diagnostics", description: "Advanced imaging for precise diagnosis.", icon: ScanLine },
  { name: "Mental Health & Counselling", slug: "mental-health-counselling", description: "Confidential psychiatric and therapeutic support.", icon: BookHeart },
  { name: "Pharmacy", slug: "pharmacy", description: "Medication therapy management and home delivery.", icon: Microscope },
];

export const iconByName: Record<string, LucideIcon> = {
  Stethoscope, Scissors, Brain, Droplets, Activity, Baby, Wind, Pill,
  Microscope, ScanLine, HeartPulse, Smile, Ear, Flower, FlaskConical, BookHeart,
};
