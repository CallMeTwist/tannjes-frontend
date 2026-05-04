import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle, Mail } from "lucide-react";
import { services } from "@/data/services";
import { buildWhatsAppUrl, buildMailtoUrl } from "@/lib/contact";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(7, "Phone is required").regex(/^[+\d\s-]+$/i, "Use digits and + only"),
  service: z.string().min(1, "Service is required"),
  notes: z.string().optional(),
});
type FormVals = z.infer<typeof schema>;

export const AppointmentStrip = () => {
  const [submitted, setSubmitted] = useState<FormVals | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormVals>({ resolver: zodResolver(schema) });

  const buildMessage = (v: FormVals) => {
    const svc = services.find((s) => s.slug === v.service)?.title ?? v.service;
    return `Hello Tannjes Clinics,\n\nI'd like to book an appointment.\n\nName: ${v.name}\nPhone: ${v.phone}\nService: ${svc}\nNotes: ${v.notes ?? "—"}`;
  };

  return (
    <section id="book" className="relative overflow-hidden bg-gradient-to-br from-brand-pink via-brand-pink-deep to-[#7a0f44] py-16 text-white">
      <div className="absolute inset-0 texture-cross-light opacity-90" aria-hidden />
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" aria-hidden />
      <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Book a doctor in under 60 seconds.</h2>
            <p className="mt-3 text-white/85">Tell us who you are and what you need. We respond in minutes.</p>
          </div>
          <form
            className="md:col-span-3 grid gap-4 rounded-2xl bg-white p-6 text-brand-navy shadow-xl"
            onSubmit={handleSubmit((v) => setSubmitted(v))}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="font-medium">Full name</span>
                <input
                  {...register("name")}
                  className="mt-1 w-full rounded-lg border border-brand-navy/15 px-3 py-2 outline-none focus:border-brand-pink"
                />
                {errors.name && <span className="text-xs text-brand-pink">{errors.name.message}</span>}
              </label>
              <label className="block text-sm">
                <span className="font-medium">Phone</span>
                <input
                  {...register("phone")}
                  className="mt-1 w-full rounded-lg border border-brand-navy/15 px-3 py-2 outline-none focus:border-brand-pink"
                />
                {errors.phone && <span className="text-xs text-brand-pink">{errors.phone.message}</span>}
              </label>
            </div>
            <label className="block text-sm">
              <span className="font-medium">Service</span>
              <select
                {...register("service")}
                className="mt-1 w-full rounded-lg border border-brand-navy/15 bg-white px-3 py-2 outline-none focus:border-brand-pink"
              >
                <option value="">Select a service…</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.title}</option>
                ))}
              </select>
              {errors.service && <span className="text-xs text-brand-pink">{errors.service.message}</span>}
            </label>
            <label className="block text-sm">
              <span className="font-medium">Notes (optional)</span>
              <textarea
                {...register("notes")}
                rows={3}
                className="mt-1 w-full rounded-lg border border-brand-navy/15 px-3 py-2 outline-none focus:border-brand-pink"
              />
            </label>
            {!submitted ? (
              <Button type="submit" className="bg-brand-pink hover:bg-brand-pink-deep text-white">
                Request Booking
              </Button>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={buildWhatsAppUrl(buildMessage(submitted))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <MessageCircle className="h-4 w-4" /> Send via WhatsApp
                </a>
                <a
                  href={buildMailtoUrl({
                    subject: "Tannjes appointment request",
                    body: buildMessage(submitted),
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

export default AppointmentStrip;
