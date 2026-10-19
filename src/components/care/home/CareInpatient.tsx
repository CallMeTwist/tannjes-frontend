import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import CareHeading from "@/components/care/CareHeading";
import { inpatientPoints } from "@/data/careHome";
import roomImg from "@/assets/care/hospice-room.jpeg";
import wardImg from "@/assets/care/elderly-wheelchair.jpeg";

export const CareInpatient = () => (
  <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <Reveal className="relative">
        <img src={roomImg} alt="A private room in the Tannjes inpatient hospice" loading="lazy" className="aspect-[4/5] w-full rounded-3xl object-cover object-[center_30%] sm:w-4/5" />
        <img
          src={wardImg}
          alt=""
          loading="lazy"
          className="absolute -bottom-8 right-0 hidden aspect-square w-2/5 rounded-2xl border-8 border-care-cream object-cover object-[center_30%] shadow-card sm:block"
        />
      </Reveal>
      <div>
        <CareHeading
          title="Care in our inpatient hospice"
          subtitle="Some people need closer care for a while. They may stay with us to get symptoms under control, to give their carers a rest, or in their final days."
        />
        <ul className="mt-8 space-y-3">
          {inpatientPoints.map((p) => (
            <li key={p} className="flex gap-3 text-care-ink/80">
              <span className="mt-0.5 shrink-0 text-care-secondary">
                <Check className="h-3.5 w-3.5" aria-hidden />
              </span>
              {p}
            </li>
          ))}
        </ul>
        <Button asChild size="lg" className="mt-10 rounded-full bg-care-primary text-white hover:bg-care-primary-deep">
          <Link to="/inpatient-hospice">
            About our inpatient hospice <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

export default CareInpatient;
