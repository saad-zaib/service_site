"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { sendQuote } from "../actions/sendQuote";

const services = [
  "Offensive Security",
  "Defensive Security",
  "GRC & Compliance",
  "Security Training",
  "Managed SOC",
  "Threat Intelligence",
  "AI & LLM Pentesting",
  "Multiple / Not sure yet",
];


type Status = "idle" | "sending" | "success" | "error";

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("service") ?? "";
  const defaultService = services.includes(preselected) ? preselected : "";

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  function validate(form: HTMLFormElement): boolean {
    const next: Partial<Record<string, string>> = {};
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();

    if (!name) next.name = "Name is required.";
    else if (name.length > 100) next.name = "Name is too long.";

    if (!email) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/.test(email))
      next.email = "Please enter a valid email address.";

    if (phone && !/^[\d\s+\-().]{0,20}$/.test(phone))
      next.phone = "Phone number contains invalid characters.";

    if (!message) next.message = "Please describe what you need.";
    else if (message.length > 3000) next.message = "Message is too long (max 3000 characters).";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!validate(form)) return;

    setStatus("sending");
    setErrorMsg("");

    const result = await sendQuote({
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      company: (form.elements.namedItem("company") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim(),
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
      honeypot: (form.elements.namedItem("website") as HTMLInputElement).value,
    });

    if (result.success) {
      setStatus("success");
      form.reset();
      setErrors({});
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-[#a78bfa33] bg-[#0c1221] p-10 text-center" role="status">
        <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-3">
          // Quote Received
        </p>
        <h3 className="text-xl font-bold text-white mb-3">
          We&apos;ll be in touch shortly.
        </h3>
        <p className="text-sm text-[#5a6a8a]">Expect a response within one business day.</p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-[#0c1221] border border-[#151f35] text-white placeholder-[#3a4a6a] px-4 py-3 text-sm focus:outline-none focus:border-[#a78bfa] transition-colors";
  const inputErrorClass =
    "w-full bg-[#0c1221] border border-red-500 text-white placeholder-[#3a4a6a] px-4 py-3 text-sm focus:outline-none focus:border-red-400 transition-colors";
  const labelClass = "block text-xs text-[#5a6a8a] uppercase tracking-widest mb-2";
  const fieldErrorClass = "mt-1 text-xs text-red-400 font-mono";

  return (
    <form onSubmit={handleSubmit} aria-label="Get a quote form" noValidate>
      {/* Honeypot — hidden from real users, filled by bots */}
      <div aria-hidden="true" style={{ display: "none" }}>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name <span className="text-[#a78bfa]" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            maxLength={100}
            aria-required="true"
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={!!errors.name}
            className={errors.name ? inputErrorClass : inputClass}
          />
          {errors.name && <p id="name-error" className={fieldErrorClass} role="alert">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Work Email <span className="text-[#a78bfa]" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            maxLength={254}
            aria-required="true"
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={!!errors.email}
            className={errors.email ? inputErrorClass : inputClass}
          />
          {errors.email && <p id="email-error" className={fieldErrorClass} role="alert">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>Company</label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Acme Corp"
            maxLength={150}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 555 000 0000"
            maxLength={20}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            aria-invalid={!!errors.phone}
            className={errors.phone ? inputErrorClass : inputClass}
          />
          {errors.phone && <p id="phone-error" className={fieldErrorClass} role="alert">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="service" className={labelClass}>Service / Solution</label>
          <select id="service" name="service" defaultValue={defaultService} className={inputClass}>
            <option value="">Select a service…</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

      </div>

      <div className="mt-6">
        <label htmlFor="message" className={labelClass}>
          Tell us what you need <span className="text-[#a78bfa]" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={3000}
          placeholder="Describe your environment, what you're trying to protect, any specific concerns, and timeline if relevant…"
          aria-required="true"
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={!!errors.message}
          className={(errors.message ? inputErrorClass : inputClass) + " resize-none"}
        />
        {errors.message && <p id="message-error" className={fieldErrorClass} role="alert">{errors.message}</p>}
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-red-400 font-mono">{errorMsg}</p>
      )}

      <div className="mt-8">
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-[#a78bfa] text-[#070b12] font-bold px-8 py-3 text-sm tracking-wide hover:bg-[#8b5cf6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Sending…" : "Submit Quote Request"}
        </button>
        <p className="mt-3 text-xs text-[#3a4a6a]">
          We respond within one business day. No spam, no unsolicited follow-ups.
        </p>
      </div>
    </form>
  );
}
