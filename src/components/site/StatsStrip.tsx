import { Counter } from "@/components/shared/Counter";
import { stats } from "@/data/stats";

export const StatsStrip = () => (
  <section className="bg-brand-navy py-12 text-white">
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <p className="font-display text-4xl font-extrabold text-brand-pink sm:text-5xl">
            <Counter to={s.value} suffix={s.suffix ?? ""} />
          </p>
          <p className="mt-2 text-sm text-white/80">{s.label}</p>
        </div>
      ))}
    </div>
  </section>
);

export default StatsStrip;
