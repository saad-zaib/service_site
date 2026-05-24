import type { Metadata } from "next";
import Link from "next/link";
import BridgeSearch from "../components/BridgeSearch";

export const metadata: Metadata = {
  title: "The Bridge: Passive Threat Intelligence | ctfwithai",
  description:
    "Free passive threat intelligence tool by ctfwithai. Look up any IP, domain, URL, email, file hash, ASN, or Bitcoin address. No active scanning, no registration required.",
  keywords: [
    "passive threat intelligence",
    "IP reputation lookup",
    "domain threat lookup",
    "file hash lookup",
    "free threat intel tool",
    "malware hash checker",
    "IP abuse check",
    "passive OSINT",
    "email threat intelligence",
    "bitcoin wallet threat intel",
    "ASN lookup",
    "URL threat scan",
  ],
  alternates: { canonical: "https://ctfwithai.com/the-bridge" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://ctfwithai.com/the-bridge",
    siteName: "ctfwithai",
    title: "The Bridge: Passive Threat Intelligence | ctfwithai",
    description:
      "Free passive threat intelligence for IPs, domains, URLs, emails, file hashes, ASNs, and Bitcoin addresses. No login required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Bridge: Passive Threat Intelligence | ctfwithai",
    description:
      "Free passive threat intelligence for IPs, domains, URLs, emails, file hashes, ASNs, and Bitcoin addresses.",
    creator: "@ctfwithai",
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",       item: "https://ctfwithai.com" },
    { "@type": "ListItem", position: 2, name: "The Bridge", item: "https://ctfwithai.com/the-bridge" },
  ],
};

const appLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "The Bridge",
  applicationCategory: "SecurityApplication",
  operatingSystem: "All",
  url: "https://ctfwithai.com/the-bridge",
  description:
    "Passive threat intelligence tool for IP addresses, domains, URLs, emails, file hashes, ASNs, and Bitcoin addresses.",
  provider: {
    "@type": "Organization",
    name: "ctfwithai",
    url: "https://ctfwithai.com",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const inputTypes = [
  {
    tag: "01",
    label: "IP Address",
    formats: "IPv4 or IPv6",
    example: "8.8.8.8",
    description:
      "Reputation, abuse reports, open ports, CVEs, noise classification, fraud/proxy scoring, ASN, and geolocation. Private ranges blocked.",
  },
  {
    tag: "02",
    label: "Domain Name",
    formats: "Any valid FQDN",
    example: "example.com",
    description:
      "Detection verdicts, phishing/malware flags, category, reputation score, malware distribution history, and IOC matches.",
  },
  {
    tag: "03",
    label: "URL",
    formats: "https:// or http://",
    example: "https://example.com/path",
    description:
      "Full URL scan for phishing, malware hosting, redirect chains, and active threat status.",
  },
  {
    tag: "04",
    label: "File Hash",
    formats: "MD5 · SHA1 · SHA256",
    example: "d41d8cd98f00b204e9800998ecf8427e",
    description:
      "Detection engine results, malware family, file type, delivery method, and first/last seen timestamps.",
  },
  {
    tag: "05",
    label: "Email Address",
    formats: "user@domain.tld",
    example: "test@example.com",
    description:
      "Validates the address, checks for disposable providers, data breach exposure, spam trap status, and recent abuse history.",
  },
  {
    tag: "06",
    label: "ASN",
    formats: "AS + number",
    example: "AS15169",
    description:
      "Organisation name, country, and all IP prefixes announced by the autonomous system.",
  },
  {
    tag: "07",
    label: "Bitcoin Address",
    formats: "P2PKH · P2SH · Bech32",
    example: "1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf",
    description:
      "Checks the wallet address against threat intelligence databases for ransomware payment tracking and threat actor association.",
  },
];

export default function TheBridgePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }}
      />

      <main>
        {/* ── HERO ── */}
        <section
          className="max-w-4xl mx-auto px-6 pt-20 pb-12"
          aria-labelledby="bridge-heading"
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-[#3a4a6a] font-mono">
              <li><Link href="/" className="hover:text-white transition-colors">home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-[#a78bfa]">the-bridge</li>
            </ol>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase">
              // Free Tool
            </p>
            <span className="font-mono text-xs border border-[#a78bfa33] text-[#a78bfa] px-2 py-0.5">
              Passive · No Login Required
            </span>
          </div>

          <h1
            id="bridge-heading"
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-5"
          >
            The Bridge
          </h1>
          <p className="text-lg text-[#5a6a8a] leading-relaxed max-w-2xl">
            Passive threat intelligence for IPs, domains, URLs, emails, file hashes,
            ASNs, and Bitcoin addresses. No active probing. No registration required.
          </p>

          <div className="mt-6 h-px bg-gradient-to-r from-[#a78bfa33] via-[#151f35] to-transparent" />
        </section>

        {/* ── SEARCH ── */}
        <section
          className="max-w-4xl mx-auto px-6 pb-16"
          aria-label="Threat intelligence lookup"
        >
          <BridgeSearch />
        </section>

        {/* ── WHAT CAN YOU LOOK UP ── */}
        <section
          className="border-t border-[#151f35] max-w-4xl mx-auto px-6 py-16"
          aria-labelledby="lookup-types-heading"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-3">
            // Supported Input Types
          </p>
          <h2
            id="lookup-types-heading"
            className="text-2xl font-bold text-white mb-10"
          >
            What Can You Look Up?
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-[#151f35]">
            {inputTypes.map((t) => (
              <article
                key={t.tag}
                className="bg-[#070b12] p-7 group hover:bg-[#0c1221] transition-colors"
              >
                <span className="font-mono text-xs text-[#3a4a6a] block mb-3">
                  {t.tag}
                </span>
                <h3 className="text-base font-bold text-white mb-1">{t.label}</h3>
                <p className="font-mono text-xs text-[#a78bfa] mb-3">{t.formats}</p>
                <p className="text-sm text-[#5a6a8a] leading-relaxed mb-4">
                  {t.description}
                </p>
                <code className="block font-mono text-xs text-[#3a4a6a] border border-[#151f35] px-3 py-1.5 truncate">
                  {t.example}
                </code>
              </article>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t border-[#151f35] max-w-4xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-2">
                // Need Deeper Analysis?
              </p>
              <h2 className="text-2xl font-bold text-white mb-2">
                The Bridge shows you what&apos;s already known.
              </h2>
              <p className="text-[#5a6a8a] text-sm max-w-lg">
                For active assessments, adversary attribution, or a full threat
                intelligence programme, our senior team goes further with dark web
                coverage, APT profiling, and bespoke reporting.
              </p>
            </div>
            <Link
              href="/services/threat-intelligence"
              className="shrink-0 border border-[#a78bfa] text-[#a78bfa] font-bold px-7 py-3 text-sm tracking-wide hover:bg-[#a78bfa] hover:text-[#070b12] transition-colors"
            >
              Threat Intel Services →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
