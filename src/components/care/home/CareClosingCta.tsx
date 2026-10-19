import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";
import { buildWhatsAppUrl } from "@/lib/contact";
import { CARE_CONTACT } from "@/data/careNav";

export const CareClosingCta = () => {
  const settings = useSettings();
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl leading-tight text-care-ink sm:text-4xl md:text-5xl">
          Talk to our care team
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-care-ink/70">
          Call, WhatsApp or send us a request. We can help whether you need care today or are planning ahead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-full bg-care-primary text-white hover:bg-care-primary-deep">
            <Link to={CARE_CONTACT}>
              Request an assessment <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full border-care-primary/30 text-care-primary hover:bg-care-secondary-soft hover:text-care-primary">
            <a href={`tel:${settings.phone_primary}`}>
              <Phone className="mr-2 h-5 w-5" /> {settings.phone_primary}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full border-care-primary/30 text-care-primary hover:bg-care-secondary-soft hover:text-care-primary">
            <a href={buildWhatsAppUrl("Hello, I'd like to talk about care.")} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CareClosingCta;
