import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  message: z.string().trim().min(5, "Tell us a bit more").max(1000),
});

export const Contact = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const r = schema.safeParse(data);
    if (!r.success) {
      toast.error(r.error.issues[0].message);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Thank you! We'll be in touch shortly.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <section id="contact" className="section-padding bg-gradient-soft">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-4">Get in touch</p>
            <h2 className="text-4xl md:text-5xl font-display font-semibold leading-tight">
              Let's talk about <span className="gradient-text">your care.</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-md">
              Reach us 24/7 — book a visit, ask a question, or request a quote.
            </p>
          </div>

          <div className="space-y-5">
            {[
              { icon: MapPin, label: "Visit", value: "Drive 2, 1st Crescent, 3rd Avenue, House 38, Prince and Princess Estate, Kaura District, Abuja" },
              { icon: Phone, label: "Call", value: "+234 800 000 0000  ·  +234 901 000 0000" },
              { icon: Mail, label: "Email", value: "care@tannjesclinics.com" },
              { icon: Clock, label: "Hours", value: "Available 24 hours, 7 days a week" },
            ].map((it) => (
              <div key={it.label} className="flex gap-4 p-4 rounded-2xl bg-card border border-border">
                <div className="h-11 w-11 rounded-xl bg-primary-soft flex items-center justify-center flex-shrink-0">
                  <it.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{it.label}</p>
                  <p className="font-medium text-foreground/90">{it.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl overflow-hidden border border-border shadow-soft">
            <iframe
              title="Tannjes Clinics location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=7.39%2C8.97%2C7.50%2C9.04&amp;layer=mapnik"
              className="w-full h-64"
              loading="lazy"
            />
          </div>
        </div>

        <form onSubmit={onSubmit} className="glass-card rounded-[2rem] p-8 md:p-10 space-y-5 h-fit">
          <h3 className="font-display text-2xl font-semibold">Book an appointment</h3>
          <p className="text-sm text-muted-foreground -mt-3">We respond within 30 minutes.</p>

          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" placeholder="Jane Doe" maxLength={100} required />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="jane@email.com" maxLength={255} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" placeholder="+234..." maxLength={30} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">How can we help?</Label>
            <Textarea id="message" name="message" rows={5} maxLength={1000}
              placeholder="Tell us about the care you need..." required />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Request Appointment"}
          </Button>
        </form>
      </div>
    </section>
  );
};
