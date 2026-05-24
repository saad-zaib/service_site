import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { services, servicesList, solutionsList, getServiceBySlug } from "../../lib/services";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} | ctfwithai`,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: `https://ctfwithai.com/services/${service.slug}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: `https://ctfwithai.com/services/${service.slug}`,
      title: `${service.title} | ctfwithai`,
      description: service.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | ctfwithai`,
      description: service.metaDescription,
      creator: "@ctfwithai",
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const peers = service.category === "solution" ? solutionsList : servicesList;
  const currentIndex = peers.findIndex((s) => s.slug === slug);
  const prevService = peers[currentIndex - 1] ?? null;
  const nextService = peers[currentIndex + 1] ?? null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    provider: {
      "@type": "Organization",
      name: "ctfwithai",
      url: "https://ctfwithai.com",
    },
    description: service.metaDescription,
    url: `https://ctfwithai.com/services/${service.slug}`,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ctfwithai.com" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://ctfwithai.com/#services" },
      { "@type": "ListItem", position: 3, name: service.title, item: `https://ctfwithai.com/services/${service.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <main>
        {/* ── BREADCRUMB ── */}
        <div className="border-b border-[#151f35]">
          <div className="max-w-6xl mx-auto px-6 py-3">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs text-[#3a4a6a] font-mono">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/#services"
                    className="hover:text-white transition-colors"
                  >
                    services
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-[#a78bfa]">{service.slug}</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* ── HERO ── */}
        <section
          className="max-w-6xl mx-auto px-6 pt-20 pb-16"
          aria-labelledby="service-heading"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-4">
            // {service.tag} — {service.category === "solution" ? "Solution" : "Service"}
          </p>
          <h1
            id="service-heading"
            className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white max-w-3xl mb-6"
          >
            {service.title}
          </h1>
          <p className="text-lg text-[#5a6a8a] max-w-2xl leading-relaxed mb-10">
            {service.heroDescription}
          </p>
          <Link
            href={`/get-a-quote?service=${encodeURIComponent(service.title)}`}
            className="inline-block bg-[#a78bfa] text-[#070b12] font-bold px-7 py-3 text-sm tracking-wide hover:bg-[#8b5cf6] transition-colors"
          >
            Discuss This Engagement
          </Link>
          <div className="mt-16 h-px bg-gradient-to-r from-[#a78bfa33] via-[#151f35] to-transparent" />
        </section>

        {/* ── SERVICE ITEMS ── */}
        <section
          className="max-w-6xl mx-auto px-6 pb-24"
          aria-labelledby="offerings-heading"
        >
          <h2
            id="offerings-heading"
            className="text-2xl font-bold text-white mb-12"
          >
            What&apos;s Included
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-[#151f35]">
            {service.items.map((item, i) => (
              <article
                key={item.title}
                className="bg-[#070b12] p-8 group hover:bg-[#0c1221] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs text-[#3a4a6a] mt-1 shrink-0 group-hover:text-[#a78bfa] transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white mb-3 group-hover:text-[#a78bfa] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#5a6a8a] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── OTHER SERVICES NAV ── */}
        <section
          className="border-t border-[#151f35] max-w-6xl mx-auto px-6 py-16"
          aria-label={`Other ${service.category === "solution" ? "solutions" : "services"}`}
        >
          <h2 className="text-xs font-mono text-[#3a4a6a] uppercase tracking-widest mb-8">
            // Other {service.category === "solution" ? "Solutions" : "Services"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#151f35]">
            {peers
              .filter((s) => s.slug !== slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="bg-[#070b12] px-6 py-5 group hover:bg-[#0c1221] transition-colors"
                >
                  <span className="font-mono text-xs text-[#3a4a6a] block mb-1 group-hover:text-[#a78bfa] transition-colors">
                    {s.tag}
                  </span>
                  <span className="text-sm font-semibold text-white group-hover:text-[#a78bfa] transition-colors">
                    {s.title}
                  </span>
                </Link>
              ))}
          </div>
        </section>

        {/* ── PREV / NEXT ── */}
        <div className="border-t border-[#151f35]">
          <div className="max-w-6xl mx-auto px-6 py-8 flex justify-between gap-4">
            {prevService ? (
              <Link
                href={`/services/${prevService.slug}`}
                className="group flex items-center gap-3 text-sm text-[#3a4a6a] hover:text-white transition-colors"
              >
                <span className="text-[#a78bfa] group-hover:translate-x-[-2px] transition-transform">
                  ←
                </span>
                <span>{prevService.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {nextService ? (
              <Link
                href={`/services/${nextService.slug}`}
                className="group flex items-center gap-3 text-sm text-[#3a4a6a] hover:text-white transition-colors"
              >
                <span>{nextService.title}</span>
                <span className="text-[#a78bfa] group-hover:translate-x-[2px] transition-transform">
                  →
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
