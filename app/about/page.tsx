import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About ctfwithai | Practitioner-Led Cybersecurity",
  description:
    "ctfwithai is a practitioner-led cybersecurity firm built by engineers from offensive security, threat intelligence, cloud, and GRC backgrounds. Meet the team.",
  alternates: { canonical: "https://ctfwithai.com/about" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://ctfwithai.com/about",
    siteName: "ctfwithai",
    title: "About ctfwithai | Practitioner-Led Cybersecurity",
    description:
      "ctfwithai is a practitioner-led cybersecurity firm built by engineers from offensive security, threat intelligence, cloud, and GRC backgrounds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About ctfwithai",
    description:
      "Practitioner-led cybersecurity firm built by engineers from offensive security, threat intelligence, cloud, and GRC backgrounds.",
    creator: "@ctfwithai",
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://ctfwithai.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://ctfwithai.com/about" },
  ],
};

const values = [
  {
    tag: "01",
    title: "Practitioners First",
    body: "Every engagement is run by the person who scoped it. We do not hand work off to junior staff after the sales call. The person you speak to is the person doing the work.",
  },
  {
    tag: "02",
    title: "Honest Scoping",
    body: "If a smaller engagement solves the problem, that is what we recommend. We have turned down larger contracts because the client did not need them. That reputation is worth more to us than short-term revenue.",
  },
  {
    tag: "03",
    title: "Measured, Not Promised",
    body: "Our SLAs are based on what we have consistently delivered, not what sounds good in a proposal. Median 15-minute response on critical SOC incidents. We can show you the data.",
  },
  {
    tag: "04",
    title: "One Accountable Team",
    body: "Offensive, defensive, AI, intelligence, compliance, and training from a single team. No coordination overhead, no blame between vendors, one point of accountability for outcomes.",
  },
];

const team = [
  {
    name: "Saad Khattak",
    role: "Founder & Lead Security Engineer",
    expertise: ["Offensive Security", "AI/LLM Pentesting", "Red Team Operations"],
    background:
      "Saad founded ctfwithai after a decade in offensive security, having run red team operations for financial institutions and critical infrastructure operators. His focus on AI security began with some of the earliest LLM deployments in production environments, where he identified the gap between how AI systems were being built and how they could be attacked.",
    certs: ["OSCP", "CRTO", "CEH"],
    tag: "01",
  },
  {
    name: "Aryan Malik",
    role: "Head of Threat Intelligence",
    expertise: ["Threat Intelligence", "OSINT", "Dark Web Operations", "APT Profiling"],
    background:
      "Aryan spent seven years in government threat intelligence before joining ctfwithai. He built the team's threat intelligence capability from the ground up, establishing the monitoring infrastructure, source network, and analytical methodology that now underpins client intelligence programmes and The Bridge platform.",
    certs: ["GCTI", "GCFE", "Security+"],
    tag: "02",
  },
  {
    name: "Priya Nair",
    role: "Cloud Security Lead",
    expertise: ["Cloud Security", "IAM Architecture", "DevSecOps", "Kubernetes Hardening"],
    background:
      "Priya came to security from a software engineering background, which shapes how she approaches cloud assessments: she looks for what developers actually build rather than what security checklists assume. She has run cloud security programmes for SaaS companies scaling from startup to enterprise and holds deep expertise in AWS, GCP, and Azure identity and access management.",
    certs: ["AWS Security Specialty", "CCSP", "CKS"],
    tag: "03",
  },
  {
    name: "James Okafor",
    role: "GRC and Compliance Lead",
    expertise: ["ISO 27001", "NIS2", "DORA", "SOC 2", "GDPR"],
    background:
      "James has led compliance programmes at organisations ranging from regulated financial services firms to early-stage SaaS companies. His approach is to build controls into operational processes rather than treat compliance as a documentation exercise. He has guided clients through ISO 27001 certification, SOC 2 Type II audits, and NIS2 readiness reviews across multiple EU jurisdictions.",
    certs: ["CISM", "ISO 27001 Lead Auditor", "CRISC"],
    tag: "04",
  },
  {
    name: "Leila Haddad",
    role: "Defensive Security and Detection Engineer",
    expertise: ["SIEM Engineering", "EDR Tuning", "Incident Response", "Threat Hunting"],
    background:
      "Leila built and ran SOC teams at a managed security service provider before moving to consultancy. She specialises in detection engineering: building rule sets that fire on real attacks rather than generating alert noise, and in incident response for organisations that do not have an internal capability when something goes wrong. She has responded to ransomware incidents across manufacturing, healthcare, and retail.",
    certs: ["GCIH", "GCIA", "BTL2"],
    tag: "05",
  },
  {
    name: "Marcus Webb",
    role: "Security Training Lead",
    expertise: ["Developer Security Training", "CTF Design", "Phishing Simulation", "SAST/DAST"],
    background:
      "Marcus has trained over 25,000 developers, security engineers, and non-technical staff across financial services, technology, and public sector organisations. He designs training programmes grounded in real attack scenarios rather than compliance checkboxes, and leads our CTF competition design work which underpins the ctfwithai name.",
    certs: ["GWEB", "GSEC", "CEH"],
    tag: "06",
  },
];

const stats = [
  { value: "6", label: "Practice Areas" },
  { value: "25k+", label: "People Trained" },
  { value: "24/7", label: "SOC Coverage" },
  { value: "15 min", label: "Critical Response" },
];

export default function AboutPage() {
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
          aria-labelledby="about-heading"
        >
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-2 text-xs text-[#3a4a6a] font-mono">
              <li><Link href="/" className="hover:text-white transition-colors">home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-[#a78bfa]">about</li>
            </ol>
          </nav>

          <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-4">
            // Who We Are
          </p>
          <div className="grid md:grid-cols-2 gap-14 items-end">
            <div>
              <h1
                id="about-heading"
                className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
              >
                Built by Practitioners.
                <br />
                <span className="text-[#a78bfa]">Accountable to Results.</span>
              </h1>
              <p className="text-[#5a6a8a] leading-relaxed mb-4">
                ctfwithai is a practitioner-led cybersecurity firm. We were founded
                by engineers who had spent years running engagements delivered by
                other firms and consistently found the same problem: the people who
                sold the work were not the people doing it.
              </p>
              <p className="text-[#5a6a8a] leading-relaxed">
                We built ctfwithai to operate differently. Every engagement is owned
                end-to-end by the practitioner who scoped it. Our team spans
                offensive security, threat intelligence, cloud architecture, compliance,
                detection engineering, and training. That breadth is not a marketing
                claim — it reflects the actual expertise of the people on the team.
              </p>
            </div>

            {/* Stats */}
            <dl className="grid grid-cols-2 gap-px bg-[#151f35]">
              {stats.map((s) => (
                <div key={s.label} className="bg-[#070b12] px-8 py-8 text-center">
                  <dt className="text-3xl font-bold font-mono text-[#a78bfa]">{s.value}</dt>
                  <dd className="mt-1 text-xs text-[#5a6a8a] uppercase tracking-widest">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── WHAT WE DO ── */}
        <section
          className="max-w-6xl mx-auto px-6 py-20 border-b border-[#151f35]"
          aria-labelledby="what-we-do-heading"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-3">
            // What We Do
          </p>
          <h2
            id="what-we-do-heading"
            className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-2xl"
          >
            Full-Spectrum Security from One Team
          </h2>
          <p className="text-[#5a6a8a] leading-relaxed max-w-3xl mb-14">
            Most security firms are either offensive shops or compliance consultancies.
            We cover the full spectrum because real security problems rarely stay in
            one lane. A red team finding that requires a cloud IAM fix, a compliance
            programme that needs threat modelling input, a SOC alert that turns into
            an incident response — these cross disciplines, and so do we.
          </p>

          <div className="grid md:grid-cols-3 gap-px bg-[#151f35]">
            {[
              {
                tag: "Offensive",
                title: "Find What Attackers Would Find",
                items: ["Penetration testing", "Red team operations", "AI/LLM security assessments", "Social engineering"],
              },
              {
                tag: "Defensive",
                title: "Detect and Respond",
                items: ["Managed SOC (24/7)", "Detection engineering", "Incident response", "Threat hunting"],
              },
              {
                tag: "Intelligence",
                title: "Know Your Adversary",
                items: ["Threat intelligence programmes", "Dark web monitoring", "APT profiling", "The Bridge (free tool)"],
              },
              {
                tag: "Cloud",
                title: "Secure Modern Infrastructure",
                items: ["Cloud security assessments", "IAM architecture review", "DevSecOps integration", "Kubernetes hardening"],
              },
              {
                tag: "GRC",
                title: "Meet Obligations, Build Controls",
                items: ["ISO 27001", "SOC 2", "NIS2 and DORA", "GDPR and data protection"],
              },
              {
                tag: "Training",
                title: "Build Internal Capability",
                items: ["Developer security training", "Security awareness", "Phishing simulation", "CTF competitions"],
              },
            ].map((area) => (
              <div key={area.tag} className="bg-[#070b12] p-8 hover:bg-[#0c1221] transition-colors">
                <span className="font-mono text-xs text-[#a78bfa] block mb-3">{area.tag}</span>
                <h3 className="text-base font-bold text-white mb-4">{area.title}</h3>
                <ul className="space-y-2">
                  {area.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[#5a6a8a]">
                      <span className="text-[#a78bfa] shrink-0 mt-0.5">--</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── VALUES ── */}
        <section
          className="max-w-6xl mx-auto px-6 py-20 border-b border-[#151f35]"
          aria-labelledby="values-heading"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-3">
            // How We Work
          </p>
          <h2
            id="values-heading"
            className="text-3xl md:text-4xl font-bold text-white mb-14"
          >
            What We Hold Ourselves To
          </h2>
          <dl className="grid md:grid-cols-2 gap-px bg-[#151f35]">
            {values.map((v) => (
              <div key={v.tag} className="bg-[#070b12] p-10">
                <dt>
                  <span className="font-mono text-xs text-[#3a4a6a] block mb-3">{v.tag}</span>
                  <span className="text-lg font-bold text-white block mb-3">{v.title}</span>
                </dt>
                <dd className="text-sm text-[#5a6a8a] leading-relaxed">{v.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── TEAM ── */}
        <section
          className="max-w-6xl mx-auto px-6 py-20 border-b border-[#151f35]"
          aria-labelledby="team-heading"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-3">
            // The Team
          </p>
          <h2
            id="team-heading"
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            The People Behind the Work
          </h2>
          <p className="text-[#5a6a8a] max-w-2xl leading-relaxed mb-14">
            Our team is deliberately small and deliberately senior. Every person
            listed here is an active practitioner, not a manager. They hold
            certifications in their discipline but more importantly they hold
            track records of doing the work.
          </p>

          <div className="grid md:grid-cols-2 gap-px bg-[#151f35]">
            {team.map((member) => (
              <article
                key={member.tag}
                className="bg-[#070b12] p-10 hover:bg-[#0c1221] transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <span className="font-mono text-xs text-[#3a4a6a] block mb-2">
                      {member.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white">{member.name}</h3>
                    <p className="text-sm text-[#a78bfa] mt-0.5">{member.role}</p>
                  </div>
                  {/* Avatar placeholder — monogram */}
                  <div className="shrink-0 w-12 h-12 border border-[#151f35] bg-[#0c1221] flex items-center justify-center font-mono text-sm font-bold text-[#a78bfa]">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                </div>

                <p className="text-sm text-[#5a6a8a] leading-relaxed mb-5">
                  {member.background}
                </p>

                {/* Expertise chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.expertise.map((e) => (
                    <span
                      key={e}
                      className="font-mono text-xs border border-[#151f35] text-[#3a4a6a] px-2 py-0.5"
                    >
                      {e}
                    </span>
                  ))}
                </div>

                {/* Certs */}
                <div className="flex flex-wrap gap-2">
                  {member.certs.map((c) => (
                    <span
                      key={c}
                      className="font-mono text-xs border border-[#a78bfa33] text-[#a78bfa] px-2 py-0.5"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── TERMINAL IDENTITY ── */}
        <section className="max-w-6xl mx-auto px-6 py-20 border-b border-[#151f35]">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-3">
                // The Name
              </p>
              <h2 className="text-3xl font-bold text-white mb-5">
                Why ctfwithai?
              </h2>
              <p className="text-[#5a6a8a] leading-relaxed mb-4">
                CTF stands for Capture the Flag — the competitive security challenges
                that most practitioners use to sharpen their skills. They require
                the same thinking as real attacks: patience, lateral reasoning, and
                deep technical knowledge applied under pressure.
              </p>
              <p className="text-[#5a6a8a] leading-relaxed mb-4">
                The AI component reflects where security is heading. AI systems
                introduce attack surfaces that conventional tools were not built for.
                We started working on LLM security assessments before most firms
                knew what prompt injection was, and that early investment in
                understanding the new attack surface is now a core part of what we offer.
              </p>
              <p className="text-[#5a6a8a] leading-relaxed">
                The name also reflects how we approach problems: like a CTF challenge,
                with curiosity, rigour, and the expectation that the answer is there
                if you are methodical enough to find it.
              </p>
            </div>
            <div className="border border-[#151f35] p-8 font-mono text-sm space-y-4">
              <div>
                <p className="text-[#a78bfa] mb-1">$ whoami</p>
                <p className="text-white">ctfwithai — full-spectrum cybersecurity</p>
              </div>
              <div>
                <p className="text-[#a78bfa] mb-1">$ cat mission.txt</p>
                <p className="text-white leading-relaxed">
                  Reduce actual exposure. Demonstrate the difference.
                  No bloated retainers. No off-shore hand-offs.
                </p>
              </div>
              <div>
                <p className="text-[#a78bfa] mb-1">$ cat team.txt</p>
                <p className="text-white leading-relaxed">
                  6 practitioners. 6 disciplines. One accountable team.
                </p>
              </div>
              <div>
                <p className="text-[#a78bfa] mb-1">$ cat scope.txt</p>
                <p className="text-white">
                  Offensive · Defensive · AI · Intelligence · GRC · Training
                </p>
                <span className="inline-block w-2 h-4 bg-[#a78bfa] animate-pulse mt-1" />
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-4">
            // Work With Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Tell us what you need to protect.
          </h2>
          <p className="text-[#5a6a8a] max-w-md mx-auto mb-10 leading-relaxed">
            We scope every engagement from scratch. No templates, no upsell. Just
            an honest assessment of what your environment needs.
          </p>
          <Link
            href="/get-a-quote"
            className="inline-block bg-[#a78bfa] text-[#070b12] font-bold px-10 py-4 text-sm tracking-wide hover:bg-[#8b5cf6] transition-colors"
          >
            Get a Quote
          </Link>
        </section>

      </main>
    </>
  );
}
