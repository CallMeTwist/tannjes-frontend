import { trustPoints } from "@/data/careHome";

export const CareTrustStrip = () => (
  <section aria-label="Why families trust us" className="px-4 pt-16 sm:px-6 lg:px-8">
    <dl className="mx-auto grid max-w-7xl gap-y-6 border-y border-care-sand py-8 sm:grid-cols-3">
      {trustPoints.map((t) => (
        <div key={t.label} className="px-2 sm:px-4">
          <div className="flex flex-col-reverse">
            <dt className="mt-1 text-sm text-care-ink/70">{t.label}</dt>
            <dd className="font-serif text-2xl font-semibold text-care-primary sm:text-3xl">{t.value}</dd>
          </div>
        </div>
      ))}
    </dl>
  </section>
);

export default CareTrustStrip;
