import type { Metadata } from "next";
import Link from "next/link";
import { servicesList, solutionsList } from "./lib/services";
import type { Service } from "./lib/services";
import GlobeWrapper from "./components/GlobeWrapper";
import { blogPosts } from "./lib/blog-posts";

export const metadata: Metadata = {
  title: "ctfwithai: Full-Spectrum Cybersecurity Services",
  description:
    "ctfwithai delivers offensive security, AI and LLM pentesting, threat intelligence, GRC compliance, and security training. Built by practitioners, accountable to results.",
  alternates: { canonical: "https://ctfwithai.com" },
  robots: { index: true, follow: true },
};

const stats = [
  { value: "6", label: "Domains" },
  { value: "25k+", label: "People Trained" },
  { value: "24/7", label: "SOC Coverage" },
  { value: "15 min", label: "Critical Response" },
];

const posts = [...blogPosts].reverse().slice(0, 3);

function ServiceGrid({ items }: { items: Service[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-px bg-[#151f35]">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={`/services/${item.slug}`}
          className="bg-[#070b12] p-8 group hover:bg-[#0c1221] transition-colors block"
        >
          <span className="font-mono text-xs text-[#3a4a6a] mb-4 block group-hover:text-[#a78bfa] transition-colors">
            {item.tag}
          </span>
          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#a78bfa] transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-[#5a6a8a] leading-relaxed mb-5">
            {item.shortDescription}
          </p>
          <ul className="space-y-1.5 mb-5">
            {item.items.map((sub) => (
              <li
                key={sub.title}
                className="flex items-start gap-2 text-xs text-[#3a4a6a]"
              >
                <span className="text-[#a78bfa] mt-0.5 shrink-0">—</span>
                <span>{sub.title}</span>
              </li>
            ))}
          </ul>
          <span className="text-xs text-[#a78bfa] font-mono group-hover:translate-x-1 transition-transform inline-block">
            View details →
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="relative z-10 flex-1">
      {/* ── HERO ── */}
      <section
        className="max-w-6xl mx-auto px-6 pt-24 pb-20"
        aria-labelledby="hero-heading"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-5">
              // Cybersecurity Services & Solutions
            </p>
            <h1
              id="hero-heading"
              className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-white"
            >
              Precision Security.
              <br />
              <span className="text-[#a78bfa]">Real-World Results.</span>
            </h1>
            <p className="mt-6 text-lg text-[#5a6a8a] leading-relaxed">
              ctfwithai is a practitioner-led cybersecurity firm delivering
              offensive testing, defensive operations, AI security, threat
              intelligence, GRC advisory, and training, end to end, from a
              single accountable team.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#services"
                className="bg-[#a78bfa] text-[#070b12] font-bold px-7 py-3 text-sm tracking-wide hover:bg-[#8b5cf6] transition-colors"
              >
                Explore Services
              </a>
              <Link
                href="/get-a-quote"
                className="border border-[#151f35] text-[#5a6a8a] font-semibold px-7 py-3 text-sm tracking-wide hover:border-[#a78bfa] hover:text-white transition-colors"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>

          {/* Right — interactive globe */}
          <div className="relative h-[420px] md:h-[500px] select-none">
            <GlobeWrapper />
          </div>
        </div>

        <div className="mt-20 h-px bg-gradient-to-r from-[#a78bfa33] via-[#151f35] to-transparent" />
      </section>

      {/* ── STATS ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20" aria-label="Key numbers">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#151f35]">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[#070b12] px-8 py-8 text-center">
              <dt className="text-3xl font-bold font-mono text-[#a78bfa]">
                {stat.value}
              </dt>
              <dd className="mt-1 text-xs text-[#5a6a8a] uppercase tracking-widest">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── SERVICES ── */}
      <section
        id="services"
        className="border-t border-[#151f35] max-w-6xl mx-auto px-6 py-24"
        aria-labelledby="services-heading"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-3">
          // Services
        </p>
        <h2
          id="services-heading"
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Core Security Services
        </h2>
        <p className="text-[#5a6a8a] max-w-2xl mb-14">
          Hands-on security engagements and advisory programmes delivered by
          certified senior practitioners with proven operational track records.
        </p>
        <ServiceGrid items={servicesList} />
      </section>

      {/* ── SOLUTIONS ── */}
      <section
        id="solutions"
        className="border-t border-[#151f35] max-w-6xl mx-auto px-6 py-24"
        aria-labelledby="solutions-heading"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-3">
          // Solutions
        </p>
        <h2
          id="solutions-heading"
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Specialist Security Solutions
        </h2>
        <p className="text-[#5a6a8a] max-w-2xl mb-14">
          Targeted solutions for emerging and complex threat vectors: AI systems,
          adversary intelligence, and next-generation attack surfaces.
        </p>
        <ServiceGrid items={solutionsList} />
      </section>

      {/* ── BLOG ── */}
      <section
        id="blog"
        className="border-t border-[#151f35] max-w-6xl mx-auto px-6 py-24"
        aria-labelledby="blog-heading"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-3">
          // Latest Thinking
        </p>
        <div className="flex items-end justify-between mb-14">
          <h2
            id="blog-heading"
            className="text-3xl md:text-4xl font-bold text-white"
          >
            From the Blog
          </h2>
          <Link
            href="/blog"
            className="text-sm text-[#a78bfa] font-mono hover:underline hidden sm:block"
          >
            All posts →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-[#151f35]">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-[#070b12] p-8 group hover:bg-[#0c1221] transition-colors flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-mono text-[#a78bfa] border border-[#a78bfa33] px-2 py-0.5">
                  {post.tag}
                </span>
                <span className="text-xs text-[#3a4a6a]">{post.date}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-3 leading-snug group-hover:text-[#a78bfa] transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="text-sm text-[#5a6a8a] leading-relaxed flex-1">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 text-xs text-[#a78bfa] font-mono group-hover:translate-x-1 transition-transform inline-block"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link href="/blog" className="text-sm text-[#a78bfa] font-mono hover:underline">
            All posts →
          </Link>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        id="about"
        className="border-t border-[#151f35] max-w-6xl mx-auto px-6 py-24"
        aria-labelledby="about-heading"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-3">
              // Who We Are
            </p>
            <h2
              id="about-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Built by Practitioners.
              <br />
              Accountable to Results.
            </h2>
            <p className="text-[#5a6a8a] leading-relaxed mb-4">
              ctfwithai was founded by security engineers who had seen too many
              engagements delivered by junior staff and outsourced offshore.
              Every assessment, every advisory, every training session is led by
              certified senior professionals with operational track records.
            </p>
            <p className="text-[#5a6a8a] leading-relaxed">
              We don&apos;t sell you a report. We reduce your actual exposure.
              We can demonstrate the difference.
            </p>
          </div>
          <div className="border border-[#151f35] p-8 font-mono text-sm space-y-4">
            <div>
              <p className="text-[#a78bfa] mb-1">$ cat approach.txt</p>
              <p className="text-white leading-relaxed">
                Every engagement scoped and executed by certified senior practitioners.
              </p>
            </div>
            <div>
              <p className="text-[#a78bfa] mb-1">$ cat sla.txt</p>
              <p className="text-white leading-relaxed">
                Median 15-minute response on critical incidents. Measured, not
                promised.
              </p>
            </div>
            <div>
              <p className="text-[#a78bfa] mb-1">$ cat scope.txt</p>
              <p className="text-white">
                Offensive · Defensive · AI · TI · GRC · Training
              </p>
              <span className="inline-block w-2 h-4 bg-[#a78bfa] animate-pulse mt-1" />
            </div>
          </div>
        </div>
      </section>

      {/* ── THE BRIDGE ── */}
      <section
        id="the-bridge"
        className="border-t border-[#151f35]"
        aria-labelledby="bridge-home-heading"
      >
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-3">
                // Free Tool
              </p>
              <h2
                id="bridge-home-heading"
                className="text-3xl md:text-4xl font-bold text-white mb-5"
              >
                The Bridge
                <span className="block text-[#a78bfa] mt-1">Passive Threat Intelligence</span>
              </h2>
              <p className="text-[#5a6a8a] leading-relaxed mb-8">
                Look up any public IP, domain, URL, email, file hash, ASN, or
                Bitcoin address against multiple threat intelligence databases.
                No login. No active scanning. Free.
              </p>
              <Link
                href="/the-bridge"
                className="inline-block bg-[#a78bfa] text-[#070b12] font-bold px-8 py-3 text-sm tracking-wide hover:bg-[#8b5cf6] transition-colors"
              >
                Try The Bridge
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-px bg-[#151f35]">
              {[
                { label: "IP Address", desc: "Ports, CVEs, abuse score, noise classification, fraud scoring" },
                { label: "Domain & URL", desc: "Detection verdicts, phishing flags, malware distribution, IOC matches" },
                { label: "File Hash", desc: "Detection engine results, malware family, delivery method, first seen" },
                { label: "Email · ASN · BTC", desc: "Breach exposure, disposable check, ASN prefixes, wallet attribution" },
              ].map((item) => (
                <div key={item.label} className="bg-[#070b12] p-6">
                  <p className="text-sm font-bold text-white mb-2">{item.label}</p>
                  <p className="text-xs text-[#5a6a8a] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        id="contact"
        className="border-t border-[#151f35]"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-4">
            // Start a Conversation
          </p>
          <h2
            id="cta-heading"
            className="text-3xl md:text-5xl font-bold text-white mb-5"
          >
            Know Your Exposure.
            <br />
            Fix What Matters.
          </h2>
          <p className="text-[#5a6a8a] max-w-md mx-auto mb-10">
            Tell us what you&apos;re protecting. We&apos;ll scope the right
            engagement and give you an honest assessment. No upsell, no
            bloated retainer.
          </p>
          <Link
            href="/get-a-quote"
            className="inline-block bg-[#a78bfa] text-[#070b12] font-bold px-10 py-4 text-sm tracking-wide hover:bg-[#8b5cf6] transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
