import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buildWhatsAppUrl, buildMailtoUrl } from "@/lib/contact";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(7, "Phone is required"),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().min(1, "Message is required"),
});
type Vals = z.infer<typeof schema>;

export const Contact = () => {
  const [submitted, setSubmitted] = useState<Vals | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<Vals>({ resolver: zodResolver(schema) });

  const buildBody = (v: Vals) => `Name: ${v.name}\nPhone: ${v.phone}\nEmail: ${v.email || "—"}\n\n${v.message}`;

  return (
    <section id="contact" className="bg-brand-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Get in Touch" title="We're a phone call away — 24/7." />
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-brand-pink" />
              <p className="text-brand-navy">
                Drive 2, 1st Crescent, 3rd Avenue, House 38<br />
                Prince and Princess Estate, Kaura District, Abuja
              </p>
            </div>
            <div className="flex gap-3">
              <Phone className="h-5 w-5 shrink-0 text-brand-pink" />
              <p className="text-brand-navy">
                +234 701 909 0013<br />+234 708 611 3160
              </p>
            </div>
            <div className="flex gap-3">
              <Mail className="h-5 w-5 shrink-0 text-brand-pink" />
              <p className="text-brand-navy">tannjes03@gmail.com</p>
            </div>
            <div className="overflow-hidden rounded-2xl shadow ring-1 ring-brand-pink-soft">
              <iframe
                title="Tannjes Clinics location"
                src="https://www.google.com/maps?q=Prince+and+Princess+Estate+Kaura+Abuja&output=embed"
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
          <form
            onSubmit={handleSubmit((v) => setSubmitted(v))}
            className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-pink-soft"
          >
            <label className="block text-sm">
              <span className="font-medium text-brand-navy">Full name</span>
              <input
                {...register("name")}
                className="mt-1 w-full rounded-lg border border-brand-navy/15 px-3 py-2 outline-none focus:border-brand-pink"
              />
              {errors.name && <span className="text-xs text-brand-pink">{errors.name.message}</span>}
            </label>
            <label className="block text-sm">
              <span className="font-medium text-brand-navy">Phone</span>
              <input
                {...register("phone")}
                className="mt-1 w-full rounded-lg border border-brand-navy/15 px-3 py-2 outline-none focus:border-brand-pink"
              />
              {errors.phone && <span className="text-xs text-brand-pink">{errors.phone.message}</span>}
            </label>
            <label className="block text-sm">
              <span className="font-medium text-brand-navy">Email (optional)</span>
              <input
                type="email"
                {...register("email")}
                className="mt-1 w-full rounded-lg border border-brand-navy/15 px-3 py-2 outline-none focus:border-brand-pink"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-brand-navy">Message</span>
              <textarea
                rows={4}
                {...register("message")}
                className="mt-1 w-full rounded-lg border border-brand-navy/15 px-3 py-2 outline-none focus:border-brand-pink"
              />
              {errors.message && <span className="text-xs text-brand-pink">{errors.message.message}</span>}
            </label>
            {!submitted ? (
              <Button type="submit" className="bg-brand-pink hover:bg-brand-pink-deep text-white">
                Send Message
              </Button>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={buildWhatsAppUrl(buildBody(submitted))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <MessageCircle className="h-4 w-4" /> Send via WhatsApp
                </a>
                <a
                  href={buildMailtoUrl({
                    subject: "Tannjes Clinics — website message",
                    body: buildBody(submitted),
                  })}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy/90"
                >
                  <Mail className="h-4 w-4" /> Send via Email
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
