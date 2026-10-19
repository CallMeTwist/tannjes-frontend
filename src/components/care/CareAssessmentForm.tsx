import { useState } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/useSettings";
import { buildMailtoUrl, buildWhatsAppUrl } from "@/lib/contact";
import {
  buildCareRequestMessage,
  careRequestSchema,
  careTypeOptions,
  settingOptions,
  urgencyOptions,
  whoOptions,
  type CareRequest,
} from "@/lib/careRequest";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-care-sand bg-white px-3.5 py-2.5 text-care-ink outline-none transition placeholder:text-care-ink/40 focus:border-care-primary focus:ring-2 focus:ring-care-primary/15";
const labelClass = "block text-sm font-medium text-care-ink";
const errorClass = "mt-1 block text-xs text-care-accent";

type Option = { value: string; label: string };

const PillGroup = ({
  legend,
  name,
  options,
  register,
  error,
}: {
  legend: string;
  name: "who" | "setting" | "urgency";
  options: readonly Option[];
  register: UseFormRegister<CareRequest>;
  error?: string;
}) => (
  <fieldset>
    <legend className={labelClass}>{legend}</legend>
    <div className="mt-2 flex flex-wrap gap-2">
      {options.map((o) => (
        <label key={o.value} className="cursor-pointer">
          <input type="radio" value={o.value} {...register(name)} className="peer sr-only" />
          <span className="inline-block rounded-full border border-care-sand bg-white px-4 py-2 text-sm text-care-ink/80 transition peer-checked:border-care-primary peer-checked:bg-care-primary peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-care-primary/30 hover:border-care-secondary">
            {o.label}
          </span>
        </label>
      ))}
    </div>
    {error && <span className={errorClass}>{error}</span>}
  </fieldset>
);

type Props = { defaultCareType?: string };

export const CareAssessmentForm = ({ defaultCareType }: Props) => {
  const settings = useSettings();
  const [submitted, setSubmitted] = useState<CareRequest | null>(null);
  const careType = careTypeOptions.some((o) => o.value === defaultCareType) ? defaultCareType! : "not-sure";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CareRequest>({
    resolver: zodResolver(careRequestSchema),
    defaultValues: { careType, setting: "unsure", urgency: "this-week" },
  });

  if (submitted) {
    const message = buildCareRequestMessage(submitted);
    return (
      <div className="rounded-3xl bg-white p-6 ring-1 ring-care-sand sm:p-8" role="status">
        <CheckCircle2 className="h-10 w-10 text-care-secondary" aria-hidden />
        <h2 className="mt-4 text-3xl text-care-ink">Almost done. Send your request</h2>
        <p className="mt-3 leading-relaxed text-care-ink/70">
          Your details are already filled in. Press send in WhatsApp or your email app and a member of our care team
          will contact you.
        </p>
        {submitted.urgency === "today" && (
          <p className="mt-5 rounded-2xl bg-care-accent-soft p-4 text-sm text-care-ink">
            You said care is needed today. For the quickest response, please also call us on{" "}
            <a href={`tel:${settings.phone_primary}`} className="font-semibold text-care-primary underline">
              {settings.phone_primary}
            </a>
            .
          </p>
        )}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button asChild size="lg" className="rounded-full bg-care-primary text-white hover:bg-care-primary-deep">
            <a href={buildWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" /> Send via WhatsApp
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-care-primary/30 text-care-primary hover:bg-care-secondary-soft hover:text-care-primary"
          >
            <a href={buildMailtoUrl({ subject: "Care assessment request", body: message })}>
              <Mail className="mr-2 h-5 w-5" /> Send via email
            </a>
          </Button>
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(null)}
          className="mt-5 text-sm font-medium text-care-ink/60 underline-offset-4 hover:text-care-primary hover:underline"
        >
          Edit my details
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(setSubmitted)}
      className="grid gap-6 rounded-3xl bg-white p-6 ring-1 ring-care-sand sm:p-8"
      aria-label="Request a care assessment"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Your name
          <input {...register("name")} autoComplete="name" className={inputClass} aria-invalid={!!errors.name} />
          {errors.name && <span className={errorClass}>{errors.name.message}</span>}
        </label>
        <label className={labelClass}>
          Phone number
          <input
            {...register("phone")}
            type="tel"
            autoComplete="tel"
            className={inputClass}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <span className={errorClass}>{errors.phone.message}</span>}
        </label>
        <label className={cn(labelClass, "sm:col-span-2")}>
          Email <span className="font-normal text-care-ink/50">(optional)</span>
          <input {...register("email")} type="email" autoComplete="email" className={inputClass} />
          {errors.email && <span className={errorClass}>{errors.email.message}</span>}
        </label>
      </div>

      <PillGroup legend="Who needs care?" name="who" options={whoOptions} register={register} error={errors.who?.message} />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Patient's name <span className="font-normal text-care-ink/50">(if not you)</span>
          <input {...register("patientName")} className={inputClass} />
        </label>
        <label className={labelClass}>
          Type of care
          <select {...register("careType")} className={inputClass}>
            {careTypeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <PillGroup legend="Where would you like care?" name="setting" options={settingOptions} register={register} />
      <PillGroup legend="How soon is care needed?" name="urgency" options={urgencyOptions} register={register} />

      <label className={labelClass}>
        Tell us a little about the situation
        <textarea
          {...register("details")}
          rows={5}
          placeholder="For example: the illness, how things are at the moment, and what help would make the biggest difference."
          className={inputClass}
          aria-invalid={!!errors.details}
        />
        {errors.details && <span className={errorClass}>{errors.details.message}</span>}
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Area in Abuja <span className="font-normal text-care-ink/50">(optional)</span>
          <input {...register("area")} placeholder="e.g. Kaura, Gwarinpa, Wuse" className={inputClass} />
        </label>
        <label className={labelClass}>
          Best time to call <span className="font-normal text-care-ink/50">(optional)</span>
          <input {...register("callTime")} placeholder="e.g. Weekday mornings" className={inputClass} />
        </label>
      </div>

      <div className="flex flex-col gap-4 border-t border-care-sand pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-care-ink/60">
          We only use these details to respond to your request. Need to talk now?{" "}
          <a href={`tel:${settings.phone_primary}`} className="inline-flex items-center gap-1 font-medium text-care-primary">
            <Phone className="h-3 w-3" aria-hidden /> {settings.phone_primary}
          </a>
        </p>
        <Button type="submit" size="lg" className="shrink-0 rounded-full bg-care-primary text-white hover:bg-care-primary-deep">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default CareAssessmentForm;
