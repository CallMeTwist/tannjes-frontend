import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";
import t4 from "@/assets/cta-family.jpg";

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  credentials?: string;
};

export const team: TeamMember[] = [
  { name: "Dr. Adaeze Okonkwo", role: "Medical Director, General Medicine", bio: "20+ years leading concierge medical care in Abuja and beyond.", image: t1 },
  { name: "Dr. Ibrahim Bello", role: "Consultant, Geriatrics", bio: "Specialist in elderly comfort care and rehabilitative medicine.", image: t2 },
  { name: "Nurse Funmi Adeyemi", role: "Lead Nurse, Skilled Nursing", bio: "Expert in post-operative and tube-feeding nutrition therapy.", image: t3 },
  { name: "Dr. Chiamaka Eze", role: "Consultant, Paediatrics", bio: "Newborn and family-care specialist with a focus on caregiver training.", image: t4 },
];
