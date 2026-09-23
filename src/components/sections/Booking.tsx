"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CalendarCheck2, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FormField, inputClasses } from "@/components/ui/FormField";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";
import { barbers } from "@/data/barbers";
import { timeSlots } from "@/data/booking";

export function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      serviceId: formData.get("service"),
      barberId: formData.get("barber"),
      date: formData.get("date"),
      time: formData.get("time"),
      notes: formData.get("notes"),
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="booking" className="bg-surface py-24 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Book a Seat"
            title="Reserve your chair in under a minute."
            description="Pick your service, favorite barber, and preferred time. Our team confirms every booking personally."
          />

          <dl className="mt-10 space-y-6 border-t border-line pt-8">
            <div className="flex items-start gap-3">
              <CalendarCheck2
                size={18}
                className="mt-0.5 shrink-0 text-accent-dark"
              />
              <div>
                <dt className="text-sm font-semibold text-ink">
                  Instant confirmation
                </dt>
                <dd className="mt-1 text-sm text-ink-muted">
                  We&apos;ll reach out via WhatsApp or phone to confirm your slot.
                </dd>
              </div>
            </div>
          </dl>
        </Reveal>

        <Reveal
          delay={0.15}
          className="rounded-[1.75rem] border border-line bg-background p-6 shadow-xl shadow-ink/5 sm:p-9"
        >
          <AnimatePresence mode="wait" initial={false}>
            {submitted ? (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent-dark">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                  Booking request received
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
                  We&apos;ve saved your request — our team will reach out via
                  WhatsApp or phone shortly to confirm your slot.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-medium text-accent-dark underline underline-offset-4"
                >
                  Fill the form again
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Full Name">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className={inputClasses}
                  />
                </FormField>
                <FormField label="Phone Number">
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+62 812 3456 7890"
                    className={inputClasses}
                  />
                </FormField>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Select Service">
                  <select
                    name="service"
                    required
                    defaultValue=""
                    className={inputClasses}
                  >
                    <option value="" disabled>
                      Choose a service
                    </option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} — {service.price}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Preferred Barber">
                  <select
                    name="barber"
                    defaultValue=""
                    className={inputClasses}
                  >
                    <option value="">No preference</option>
                    {barbers.map((barber) => (
                      <option key={barber.id} value={barber.id}>
                        {barber.name}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Preferred Date">
                  <input
                    type="date"
                    name="date"
                    required
                    className={inputClasses}
                  />
                </FormField>
                <FormField label="Preferred Time">
                  <select
                    name="time"
                    required
                    defaultValue=""
                    className={inputClasses}
                  >
                    <option value="" disabled>
                      Choose a time
                    </option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>

              <FormField label="Notes (optional)">
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Anything our barber should know?"
                  className={inputClasses}
                />
              </FormField>

              {error && (
                <p className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertCircle size={16} className="shrink-0" />
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-ink px-7 py-3.5 text-sm font-medium tracking-wide text-background transition-colors duration-200 hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Request Booking"}
              </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </Container>
    </section>
  );
}
