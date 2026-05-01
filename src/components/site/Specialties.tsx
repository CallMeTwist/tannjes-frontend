const specialties = [
  "General Medicine", "General Surgery", "Neurology", "Haematology",
  "Endocrinology", "Paediatrics", "Urology", "Nephrology",
  "Gastroenterology", "Dermatology", "ENT", "Obstetrics & Gynaecology",
  "Laboratory", "Radiology Diagnostics", "Mental Health & Counselling", "Pharmacy",
];

export const Specialties = () => {
  return (
    <section id="specialties" className="section-padding relative">
      <div className="container mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-4">Medical specialties</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold leading-tight">
            A full spectrum of <span className="gradient-text">expert care.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {specialties.map((s, i) => (
            <div
              key={s}
              className="group relative rounded-2xl p-5 bg-card border border-border hover:border-primary/40 hover:shadow-soft transition-all duration-300"
            >
              <div className="absolute top-3 right-3 text-xs text-muted-foreground/60 font-mono">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="h-1.5 w-8 rounded-full bg-gradient-primary mb-4 group-hover:w-12 transition-all" />
              <p className="font-display font-medium text-foreground/90">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
