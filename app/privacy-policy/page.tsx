import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | ctfwithai Cybersecurity",
  description:
    "How ctfwithai collects, uses, and protects personal data. Covers our website, quote form, and The Bridge threat intelligence tool.",
  alternates: { canonical: "https://ctfwithai.com/privacy-policy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "24 May 2026";
const CONTACT_EMAIL = "privacy@ctfwithai.com";
const COMPANY = "ctfwithai";
const SITE = "https://ctfwithai.com";

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${SITE}/privacy-policy` },
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <main className="max-w-3xl mx-auto px-6 pt-20 pb-24">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex items-center gap-2 text-xs text-[#3a4a6a] font-mono">
            <li><Link href="/" className="hover:text-white transition-colors">home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-[#a78bfa]">privacy-policy</li>
          </ol>
        </nav>

        {/* Header */}
        <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-4">
          // Legal
        </p>
        <h1 className="text-4xl font-bold text-white mb-3">Privacy Policy</h1>
        <p className="text-sm text-[#3a4a6a] font-mono mb-12">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="space-y-10 text-[#5a6a8a] leading-relaxed text-sm">

          {/* 1 */}
          <section aria-labelledby="pp-scope">
            <h2 id="pp-scope" className="text-base font-bold text-white mb-3">1. Who We Are and Scope of This Policy</h2>
            <p>
              This Privacy Policy describes how {COMPANY} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects,
              uses, stores, and protects personal data when you visit{" "}
              <span className="text-[#a78bfa] font-mono">{SITE}</span> or contact us about our
              cybersecurity services.
            </p>
            <p className="mt-3">
              We are a practitioner-led cybersecurity firm. We are committed to handling personal
              data responsibly, in compliance with applicable data protection laws including the
              General Data Protection Regulation (GDPR) where applicable.
            </p>
          </section>

          {/* 2 */}
          <section aria-labelledby="pp-collect">
            <h2 id="pp-collect" className="text-base font-bold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-3">We collect information in the following ways:</p>

            <h3 className="text-sm font-semibold text-white mb-2">Information you provide directly</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Name, email address, phone number, and company name submitted through our quote request form.</li>
              <li>The content of any message or enquiry you send us.</li>
              <li>Service preferences you select in contact or quote forms.</li>
            </ul>

            <h3 className="text-sm font-semibold text-white mb-2">Information collected automatically</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>IP addresses, browser type, operating system, referring URL, and pages visited, collected through standard server logs.</li>
              <li>We do not use tracking cookies or third-party analytics scripts on this website.</li>
            </ul>

            <h3 className="text-sm font-semibold text-white mb-2">The Bridge threat intelligence tool</h3>
            <p>
              When you use The Bridge, the indicator you submit (IP address, domain, file hash, URL,
              email address, ASN, or Bitcoin address) is processed server-side to query third-party
              threat intelligence APIs. We apply per-IP rate limiting to prevent abuse. We do not
              store submitted indicators or link them to your identity after the query is resolved.
            </p>
          </section>

          {/* 3 */}
          <section aria-labelledby="pp-use">
            <h2 id="pp-use" className="text-base font-bold text-white mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We use the personal data we collect for the following purposes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>To respond to quote requests and service enquiries.</li>
              <li>To scope and deliver the cybersecurity services you have requested.</li>
              <li>To prevent abuse of our free tools (rate limiting).</li>
              <li>To comply with legal obligations.</li>
              <li>To protect the security and integrity of our systems.</li>
            </ul>
            <p className="mt-3">
              We do not use your personal data for marketing purposes without your explicit consent.
              We do not sell, rent, or trade your personal data to any third party.
            </p>
          </section>

          {/* 4 */}
          <section aria-labelledby="pp-legal">
            <h2 id="pp-legal" className="text-base font-bold text-white mb-3">4. Legal Basis for Processing (GDPR)</h2>
            <p className="mb-3">
              Where the GDPR applies, our legal bases for processing personal data are:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><span className="text-white">Legitimate interests</span> &mdash; responding to your enquiry and operating our website securely.</li>
              <li><span className="text-white">Contract performance</span> &mdash; processing data necessary to deliver services you have engaged us for.</li>
              <li><span className="text-white">Legal obligation</span> &mdash; retaining certain records as required by applicable law.</li>
              <li><span className="text-white">Consent</span> &mdash; where you have explicitly opted in to a specific use.</li>
            </ul>
          </section>

          {/* 5 */}
          <section aria-labelledby="pp-sharing">
            <h2 id="pp-sharing" className="text-base font-bold text-white mb-3">5. Sharing of Personal Data</h2>
            <p className="mb-3">We do not sell or disclose your personal data to third parties except:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <span className="text-white">Service providers</span> we engage to operate our infrastructure (for example, our email delivery provider for sending quote responses). These providers are contractually bound to process data only on our instructions.
              </li>
              <li>
                <span className="text-white">Third-party threat intelligence APIs</span> used by The Bridge tool. When you submit an indicator, that indicator is transmitted to the relevant external APIs. No personally identifying data about you is included in those requests.
              </li>
              <li>
                <span className="text-white">Law enforcement or regulators</span> where we are legally compelled to disclose.
              </li>
            </ul>
          </section>

          {/* 6 */}
          <section aria-labelledby="pp-retention">
            <h2 id="pp-retention" className="text-base font-bold text-white mb-3">6. Data Retention</h2>
            <p>
              We retain contact and quote enquiry data for up to 24 months from the date of last
              contact, or longer if required for an ongoing client relationship or legal obligation.
              Server log data is retained for up to 90 days.
              The Bridge query data is not retained beyond the duration of a single server request.
            </p>
          </section>

          {/* 7 */}
          <section aria-labelledby="pp-security">
            <h2 id="pp-security" className="text-base font-bold text-white mb-3">7. Security of Your Data</h2>
            <p>
              We implement appropriate technical and organisational measures to protect personal data
              against unauthorised access, disclosure, alteration, or destruction. These include
              encrypted transmission (TLS), access controls, and server-side input sanitisation on
              all form submissions.
            </p>
            <p className="mt-3">
              No method of transmission over the internet is entirely secure. In the event of a
              personal data breach that is likely to result in a high risk to your rights and
              freedoms, we will notify affected individuals and relevant supervisory authorities as
              required by applicable law.
            </p>
          </section>

          {/* 8 */}
          <section aria-labelledby="pp-rights">
            <h2 id="pp-rights" className="text-base font-bold text-white mb-3">8. Your Rights</h2>
            <p className="mb-3">
              Subject to applicable law, you have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><span className="text-white">Access</span> &mdash; request a copy of the personal data we hold about you.</li>
              <li><span className="text-white">Rectification</span> &mdash; request that inaccurate or incomplete data be corrected.</li>
              <li><span className="text-white">Erasure</span> &mdash; request deletion of your personal data where there is no legal basis for continued processing.</li>
              <li><span className="text-white">Restriction</span> &mdash; request that we limit processing of your data in certain circumstances.</li>
              <li><span className="text-white">Portability</span> &mdash; receive your data in a structured, machine-readable format where technically feasible.</li>
              <li><span className="text-white">Objection</span> &mdash; object to processing based on legitimate interests.</li>
              <li><span className="text-white">Withdraw consent</span> &mdash; where processing is based on consent, withdraw it at any time without affecting prior lawful processing.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#a78bfa] hover:underline font-mono">
                {CONTACT_EMAIL}
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          {/* 9 */}
          <section aria-labelledby="pp-cookies">
            <h2 id="pp-cookies" className="text-base font-bold text-white mb-3">9. Cookies and Tracking</h2>
            <p>
              This website does not use advertising cookies, tracking pixels, or third-party
              analytics services. We do not build profiles of visitors or share browsing data with
              advertising networks.
            </p>
            <p className="mt-3">
              Session-related cookies may be set by the web framework for standard operation.
              These are strictly necessary and do not track you across other websites.
            </p>
          </section>

          {/* 10 */}
          <section aria-labelledby="pp-transfers">
            <h2 id="pp-transfers" className="text-base font-bold text-white mb-3">10. International Transfers</h2>
            <p>
              Some of the third-party threat intelligence APIs used by The Bridge are operated by
              companies based outside the European Economic Area. Where such transfers occur, we
              rely on the service provider&apos;s standard contractual clauses or equivalent
              safeguards as recognised under applicable data protection law.
            </p>
          </section>

          {/* 11 */}
          <section aria-labelledby="pp-minors">
            <h2 id="pp-minors" className="text-base font-bold text-white mb-3">11. Children</h2>
            <p>
              Our services are directed at businesses and professionals. We do not knowingly collect
              personal data from individuals under the age of 16. If you believe a minor has
              submitted personal data to us, please contact us and we will delete it promptly.
            </p>
          </section>

          {/* 12 */}
          <section aria-labelledby="pp-changes">
            <h2 id="pp-changes" className="text-base font-bold text-white mb-3">12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo;
              date at the top of this page will reflect any changes. We encourage you to review
              this page periodically. Continued use of our website after a change constitutes
              acceptance of the updated policy.
            </p>
          </section>

          {/* 13 */}
          <section aria-labelledby="pp-contact">
            <h2 id="pp-contact" className="text-base font-bold text-white mb-3">13. Contact Us</h2>
            <p>
              For any questions about this Privacy Policy or to exercise your data rights, contact:
            </p>
            <div className="mt-4 border border-[#151f35] p-5 font-mono text-sm space-y-1">
              <p className="text-white">{COMPANY}</p>
              <p>
                Email:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#a78bfa] hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p>Website: <span className="text-[#a78bfa]">{SITE}</span></p>
            </div>
            <p className="mt-4">
              You also have the right to lodge a complaint with your local data protection
              supervisory authority if you believe we have not handled your personal data lawfully.
            </p>
          </section>

        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-[#151f35]">
          <Link href="/" className="text-sm text-[#a78bfa] font-mono hover:underline">
            &larr; Back to home
          </Link>
        </div>
      </main>
    </>
  );
}
