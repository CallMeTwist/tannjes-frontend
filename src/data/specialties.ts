import type { LucideIcon } from "lucide-react";
import {
  Stethoscope, Scissors, Brain, Droplets, Activity, Baby, Wind, Pill,
  Microscope, ScanLine, HeartPulse, Smile, Ear, Flower, FlaskConical, BookHeart,
} from "lucide-react";

export type Specialty = { name: string; icon: LucideIcon };

export const specialties: Specialty[] = [
  { name: "General Medicine", icon: Stethoscope },
  { name: "General Surgery", icon: Scissors },
  { name: "Neurology", icon: Brain },
  { name: "Haematology", icon: Droplets },
  { name: "Endocrinology", icon: Activity },
  { name: "Paediatrics", icon: Baby },
  { name: "Urology", icon: Wind },
  { name: "Nephrology", icon: HeartPulse },
  { name: "Gastroenterology", icon: Pill },
  { name: "Dermatology", icon: Smile },
  { name: "ENT", icon: Ear },
  { name: "Obstetrics & Gynaecology", icon: Flower },
  { name: "Laboratory", icon: FlaskConical },
  { name: "Radiology Diagnostics", icon: ScanLine },
  { name: "Mental Health & Counselling", icon: BookHeart },
  { name: "Pharmacy", icon: Microscope },
];
