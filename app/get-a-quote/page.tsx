import type { Metadata } from "next";
import { Suspense } from "react";
import QuoteForm from "../components/QuoteForm";

export const metadata: Metadata = {
  title: "Get a Cybersecurity Quote | ctfwithai",
  description:
    "Request a quote for penetration testing, red team operations, managed SOC, threat intelligence, or GRC advisory. ctfwithai responds within one business day.",
  alternates: { canonical: "https://ctfwithai.com/get-a-quote" },
  robots: { index: true, follow: true },
  keywords: [
    "get a penetration testing quote",
    "cybersecurity quote",
    "pentest pricing",
    "red team quote",
    "managed SOC pricing",
    "security assessment quote",
  ],
  openGraph: {
    type: "website",
    url: "https://ctfwithai.com/get-a-quote",
    siteName: "ctfwithai",
    title: "Get a Cybersecurity Quote | ctfwithai",
    description:
      "Tell us what you need to protect. We will scope the right engagement and respond within one business day.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get a Cybersecurity Quote | ctfwithai",
    description:
      "Tell us what you need to protect. We will scope the right engagement and respond within one business day.",
    creator: "@ctfwithai",
  },
};

const reasons = [
  {
    tag: "01",
    title: "No Bloated Retainers",
    body: "We scope what you actually need. If a smaller engagement solves the problem, that is what we recommend.",
  },
  {
    tag: "02",
    title: "15-Minute Critical Response",
    body: "Managed SOC clients get a median 15-minute response on critical incidents. Measured, not promised.",
  },
  {
    tag: "03",
    title: "One Accountable Team",
    body: "Offensive, defensive, intelligence, compliance, and training from a single team that owns the outcome.",
  },
  {
    tag: "04",
    title: "Response Within One Day",
    body: "Every quote request receives a personalised response within one business day. No automated templates.",
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://ctfwithai.com" },
    { "@type": "ListItem", position: 2, name: "Get a Quote", item: "https://ctfwithai.com/get-a-quote" },
  ],
};

export default function GetAQuotePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <main>
        {/* ── HERO ── */}
        <section
          className="max-w-6xl mx-auto px-6 pt-20 pb-16 border-b border-[#151f35]"
          aria-labelledby="quote-heading"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-4">
            // Get a Quote
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-end">
            <div>
              <h1
                id="quote-heading"
                className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5"
              >
                Tell Us What
                <br />
                <span className="text-[#a78bfa]">You Need to Protect.</span>
              </h1>
              <p className="text-[#5a6a8a] leading-relaxed">
                Fill in the form and we will scope the right engagement for your
                environment. Expect a response within one business day. No
                upsell, no generic proposal templates.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-px bg-[#151f35]">
              {reasons.map((r) => (
                <div key={r.tag} className="bg-[#070b12] p-5">
                  <dt className="font-mono text-xs text-[#a78bfa] mb-2">{r.tag}</dt>
                  <dd>
                    <p className="text-sm font-bold text-white mb-1">{r.title}</p>
                    <p className="text-xs text-[#5a6a8a] leading-relaxed">{r.body}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── FORM ── */}
        <section className="max-w-4xl mx-auto px-6 py-20" aria-labelledby="form-heading">
          <h2 id="form-heading" className="sr-only">Quote request form</h2>
          <Suspense fallback={null}>
            <QuoteForm />
          </Suspense>
        </section>
      </main>
    </>
  );
}
