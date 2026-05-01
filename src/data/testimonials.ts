import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";

export type Testimonial = { quote: string; name: string; condition: string; rating: number; image: string };

export const testimonials: Testimonial[] = [
  {
    quote: "Tannjes brought the doctor to our home at 2am when my mother needed help. Compassionate, fast, professional.",
    name: "Mrs. Halima A.",
    condition: "Family of patient",
    rating: 5,
    image: t1,
  },
  {
    quote: "Their hospital-to-home program made my recovery safe and stress-free. Highly recommend.",
    name: "Engr. Tunde O.",
    condition: "Post-surgery patient",
    rating: 5,
    image: t2,
  },
  {
    quote: "The nursing team trained us on PEG feeding with so much patience. We couldn't have done it without them.",
    name: "Mrs. Grace U.",
    condition: "Caregiver",
    rating: 5,
    image: t3,
  },
];
