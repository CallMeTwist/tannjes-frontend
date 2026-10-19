import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import CareHeading from "@/components/care/CareHeading";
import { familySupport } from "@/data/careHome";
import familyImg from "@/assets/care/lounge-family.jpeg";

export const CareFamilies = () => (
  <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
      <div className="flex flex-col">
        <CareHeading
          title="Support for families and carers"
          subtitle="Looking after someone with a serious illness is hard work. We can train you, give you a break, and be there to talk."
        />
        <img
          src={familyImg}
          alt=""
          loading="lazy"
          className="mt-10 aspect-[16/10] w-full rounded-3xl object-cover object-[center_30%] lg:mt-auto lg:pt-10"
        />
      </div>
      <div>
        <div className="grid gap-4 sm:grid-cols-2">
          {familySupport.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06} className="rounded-2xl border border-care-sand bg-white p-6">
              <h3 className="text-xl text-care-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-care-ink/70">{f.text}</p>
            </Reveal>
          ))}
        </div>
        <Button asChild size="lg" variant="outline" className="mt-8 rounded-full border-care-primary/30 text-care-primary hover:bg-care-secondary-soft hover:text-care-primary">
          <Link to="/families">
            Support for families <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

export default CareFamilies;
