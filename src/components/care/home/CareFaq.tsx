import CareFaqList from "@/components/care/CareFaqList";
import CareHeading from "@/components/care/CareHeading";
import { careFaqs } from "@/data/careHome";

export const CareFaq = () => (
  <section className="bg-care-sand/60 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
      <CareHeading
        title="Common questions"
        subtitle="If your question isn't here, call our care line. It is open 24 hours a day."
      />
      <CareFaqList faqs={careFaqs} />
    </div>
  </section>
);

export default CareFaq;
