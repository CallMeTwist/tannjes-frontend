import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Props = { faqs: { q: string; a: string }[] };

export const CareFaqList = ({ faqs }: Props) => (
  <Accordion type="single" collapsible className="rounded-2xl bg-white px-6 ring-1 ring-care-sand">
    {faqs.map((f, i) => (
      <AccordionItem key={f.q} value={`faq-${i}`} className="border-care-sand last:border-b-0">
        <AccordionTrigger className="py-5 text-left font-serif text-lg font-semibold text-care-ink hover:no-underline">
          {f.q}
        </AccordionTrigger>
        <AccordionContent className="text-base leading-relaxed text-care-ink/70">{f.a}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default CareFaqList;
