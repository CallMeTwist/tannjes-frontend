import { useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";

const items = [
  { name: "Adaeze O.", role: "Patient, Abuja", img: t1,
    quote: "Tannjes brought a doctor to my home within 25 minutes. The care was warm, professional and reassuring. They truly treat you like family." },
  { name: "Chinedu A.", role: "Family member", img: t2,
    quote: "After my father's surgery, the nursing team made his recovery at home seamless. Their compassion gave our family so much peace of mind." },
  { name: "Mama Ngozi", role: "Geriatric care client", img: t3,
    quote: "I look forward to every visit. They listen, they remember, and they always make me smile. God bless Tannjes." },
];

export const Testimonials = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, []);
  const cur = items[i];

  return (
    <section className="section-padding bg-gradient-aurora relative overflow-hidden">
      <div className="blob bg-primary-soft w-[400px] h-[400px] top-10 -left-20" />
      <div className="container mx-auto relative">
        <div className="max-w-2xl mb-14">
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold leading-tight">
            Loved by the families <span className="gradient-text">we care for.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          <div key={i} className="glass-card rounded-[2rem] p-8 md:p-12 animate-fade-in">
            <Quote className="h-10 w-10 text-primary mb-6" />
            <p className="text-2xl md:text-3xl font-display font-light leading-relaxed text-foreground/90">
              "{cur.quote}"
            </p>
            <div className="flex items-center gap-4 mt-8">
              <img src={cur.img} alt={cur.name} loading="lazy" width={64} height={64}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/30" />
              <div>
                <p className="font-display font-semibold">{cur.name}</p>
                <p className="text-sm text-muted-foreground">{cur.role}</p>
              </div>
              <div className="flex ml-auto">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
            </div>
          </div>

          <div className="flex lg:flex-col gap-3">
            <button onClick={() => setI((p) => (p - 1 + items.length) % items.length)}
              className="h-12 w-12 rounded-full glass-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => setI((p) => (p + 1) % items.length)}
              className="h-12 w-12 rounded-full glass-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-2 mt-8">
          {items.map((_, k) => (
            <button key={k} onClick={() => setI(k)}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-10 bg-primary" : "w-4 bg-primary/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};
