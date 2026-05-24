import type { Metadata } from "next";
import Link from "next/link";
import { insights } from "../lib/insights";

export const metadata: Metadata = {
  title: "Industry Insights: Annual Cybersecurity Research | ctfwithai",
  description:
    "ctfwithai publishes annual industry insights covering the evolving threat landscape, emerging attack techniques, regulatory shifts, and defensive trends across cybersecurity.",
  alternates: { canonical: "https://ctfwithai.com/industry-insights" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://ctfwithai.com/industry-insights",
    siteName: "ctfwithai",
    title: "Industry Insights | ctfwithai",
    description:
      "Annual cybersecurity research and threat landscape reporting from the ctfwithai practitioner team.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry Insights | ctfwithai",
    description:
      "Annual cybersecurity research and threat landscape reporting from the ctfwithai practitioner team.",
    creator: "@ctfwithai",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Industry Insights by ctfwithai",
  description:
    "Annual cybersecurity industry insights published by ctfwithai covering threat trends, attack techniques, and defensive strategy.",
  url: "https://ctfwithai.com/industry-insights",
  publisher: {
    "@type": "Organization",
    name: "ctfwithai",
    url: "https://ctfwithai.com",
  },
};

const years = [...new Set(insights.map((i) => i.year))].sort((a, b) => b - a);

export default function IndustryInsightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* ── HERO ── */}
        <section
          className="max-w-6xl mx-auto px-6 pt-20 pb-16"
          aria-labelledby="insights-heading"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-4">
            // Annual Research
          </p>
          <h1
            id="insights-heading"
            className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-3xl"
          >
            Industry Insights
          </h1>
          <p className="text-lg text-[#5a6a8a] max-w-2xl leading-relaxed">
            Each year the ctfwithai team publishes research drawn from live
            engagements, threat intelligence operations, and incident response
            cases, covering the shifts that matter most to defenders and
            decision-makers. Reports synthesise findings from the major
            industry publications alongside our own practitioner observations.
          </p>
          <div className="mt-16 h-px bg-gradient-to-r from-[#a78bfa33] via-[#151f35] to-transparent" />
        </section>

        {/* ── INSIGHTS BY YEAR ── */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          {years.map((year) => {
            const yearInsights = insights.filter((i) => i.year === year);
            return (
              <div key={year} className="mb-20">
                <div className="flex items-center gap-6 mb-10">
                  <h2 className="font-mono text-3xl font-bold text-[#a78bfa]">
                    {year}
                  </h2>
                  <div className="flex-1 h-px bg-[#151f35]" />
                  <span className="font-mono text-xs text-[#3a4a6a]">
                    {yearInsights.length} report
                    {yearInsights.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-px bg-[#151f35]">
                  {yearInsights.map((insight) => (
                    <article
                      key={insight.slug}
                      className="bg-[#070b12] p-8 group hover:bg-[#0c1221] transition-colors flex flex-col"
                    >
                      {/* Thumbnail */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={insight.heroImage}
                        alt={insight.heroImageAlt}
                        className="w-full h-36 object-cover mb-5 border border-[#151f35]"
                        loading="lazy"
                      />
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-mono text-[#a78bfa] border border-[#a78bfa33] px-2 py-0.5">
                          {insight.tag}
                        </span>
                        <span className="text-xs text-[#3a4a6a]">
                          {insight.readTime}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-3 leading-snug group-hover:text-[#a78bfa] transition-colors flex-1">
                        <Link href={`/industry-insights/${insight.slug}`}>
                          {insight.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-[#5a6a8a] leading-relaxed mb-6 line-clamp-3">
                        {insight.excerpt}
                      </p>
                      <Link
                        href={`/industry-insights/${insight.slug}`}
                        className="text-xs text-[#a78bfa] font-mono group-hover:translate-x-1 transition-transform inline-block mt-auto"
                        aria-label={`Read ${insight.title}`}
                      >
                        Read report →
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* ── CTA ── */}
        <section
          className="border-t border-[#151f35]"
          aria-labelledby="insights-cta"
        >
          <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2
                id="insights-cta"
                className="text-2xl font-bold text-white mb-2"
              >
                Want these reports in your inbox?
              </h2>
              <p className="text-[#5a6a8a] text-sm">
                We publish once a year. No newsletters, no marketing. Just the
                annual report.
              </p>
            </div>
            <Link
              href="/get-a-quote"
              className="shrink-0 bg-[#a78bfa] text-[#070b12] font-bold px-7 py-3 text-sm tracking-wide hover:bg-[#8b5cf6] transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
