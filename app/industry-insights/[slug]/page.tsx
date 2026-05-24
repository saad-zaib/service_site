import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  insights,
  getInsightBySlug,
  getAllInsightSlugs,
} from "../../lib/insights";
import type { BlogSection } from "../../lib/blog-posts";

export function generateStaticParams() {
  return getAllInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return {};
  const description =
    insight.excerpt.length > 160
      ? insight.excerpt.slice(0, 157) + "..."
      : insight.excerpt;
  return {
    title: `${insight.title} | ctfwithai Industry Insights`,
    description,
    alternates: {
      canonical: `https://ctfwithai.com/industry-insights/${insight.slug}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url: `https://ctfwithai.com/industry-insights/${insight.slug}`,
      siteName: "ctfwithai",
      title: insight.title,
      description,
      images: [{ url: insight.heroImage, alt: insight.heroImageAlt }],
      publishedTime: insight.isoDate,
    },
    twitter: {
      card: "summary_large_image",
      title: insight.title,
      description,
      creator: "@ctfwithai",
    },
  };
}

function renderSection(section: BlogSection, idx: number) {
  switch (section.type) {
    case "p":
      return (
        <p key={idx} className="text-[#8a9ab8] leading-relaxed text-[0.95rem]">
          {section.text}
        </p>
      );
    case "h2":
      return (
        <h2
          key={idx}
          className="text-xl font-bold text-white mt-10 mb-3 pt-4 border-t border-[#151f35]"
        >
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={idx} className="text-base font-bold text-white mt-6 mb-2">
          {section.text}
        </h3>
      );
    case "ul":
      return (
        <ul key={idx} className="space-y-2 my-2">
          {section.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[#8a9ab8] text-[0.95rem] leading-relaxed"
            >
              <span className="text-[#a78bfa] mt-1 shrink-0 font-mono text-xs">
                --
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={idx} className="space-y-2 my-2 list-none">
          {section.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[#8a9ab8] text-[0.95rem] leading-relaxed"
            >
              <span className="text-[#a78bfa] shrink-0 font-mono text-xs mt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case "code":
      return (
        <div key={idx} className="my-4">
          <div className="flex items-center px-4 py-1.5 bg-[#0c1221] border border-[#151f35] border-b-0">
            <span className="font-mono text-xs text-[#3a4a6a]">
              {section.lang}
            </span>
          </div>
          <pre className="overflow-x-auto bg-[#060a10] border border-[#151f35] p-5 text-xs text-[#8a9ab8] font-mono leading-relaxed">
            <code>{section.code}</code>
          </pre>
        </div>
      );
    case "image":
      return (
        <figure key={idx} className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={section.src}
            alt={section.alt}
            className="w-full object-cover border border-[#151f35]"
            loading="lazy"
          />
          {section.caption && (
            <figcaption className="mt-2 text-xs text-[#3a4a6a] font-mono text-center">
              {section.caption}
            </figcaption>
          )}
        </figure>
      );
    case "callout": {
      const variants = {
        info: {
          border: "border-[#3b82f6]",
          tag: "INFO",
          tagColor: "text-[#3b82f6]",
        },
        warn: {
          border: "border-[#f59e0b]",
          tag: "WARNING",
          tagColor: "text-[#f59e0b]",
        },
        tip: {
          border: "border-[#a78bfa]",
          tag: "TIP",
          tagColor: "text-[#a78bfa]",
        },
      };
      const v = variants[section.variant];
      return (
        <div
          key={idx}
          className={`my-4 border-l-2 ${v.border} bg-[#0c1221] px-5 py-4`}
        >
          <span
            className={`font-mono text-xs font-bold ${v.tagColor} block mb-2`}
          >
            {v.tag}
          </span>
          <p className="text-[#8a9ab8] text-[0.95rem] leading-relaxed">
            {section.text}
          </p>
        </div>
      );
    }
    case "table":
      return (
        <div key={idx} className="my-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#0c1221]">
                {section.headers.map((h, i) => (
                  <th
                    key={i}
                    className="text-left px-4 py-2 text-[#a78bfa] font-mono text-xs border border-[#151f35]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className={ri % 2 === 0 ? "bg-[#070b12]" : "bg-[#080d15]"}
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-4 py-2 text-[#8a9ab8] text-xs border border-[#151f35] leading-relaxed"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Report",
    headline: insight.title,
    description: insight.excerpt,
    datePublished: insight.isoDate,
    author: {
      "@type": "Organization",
      name: "ctfwithai",
      url: "https://ctfwithai.com",
    },
    publisher: {
      "@type": "Organization",
      name: "ctfwithai",
      url: "https://ctfwithai.com",
    },
    image: insight.heroImage,
    url: `https://ctfwithai.com/industry-insights/${insight.slug}`,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ctfwithai.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Industry Insights",
        item: "https://ctfwithai.com/industry-insights",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: insight.title,
        item: `https://ctfwithai.com/industry-insights/${insight.slug}`,
      },
    ],
  };

  const otherInsights = insights
    .filter((i) => i.slug !== insight.slug && i.year === insight.year)
    .slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <main>
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 pt-16 pb-10">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-[#3a4a6a] font-mono">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/industry-insights"
                  className="hover:text-white transition-colors"
                >
                  industry-insights
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#a78bfa] truncate max-w-[200px]">
                {insight.slug}
              </li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="font-mono text-xs border border-[#a78bfa33] text-[#a78bfa] px-2 py-0.5">
              {insight.tag}
            </span>
            <span className="font-mono text-xs border border-[#151f35] text-[#3a4a6a] px-2 py-0.5">
              Annual Report {insight.year}
            </span>
            <span className="text-xs text-[#3a4a6a] font-mono">
              {insight.publishedDate}
            </span>
            <span className="text-xs text-[#3a4a6a] font-mono">
              {insight.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
            {insight.title}
          </h1>
          <p className="text-[#5a6a8a] leading-relaxed text-lg mb-6">
            {insight.excerpt}
          </p>

          {/* Sources */}
          <div className="border border-[#151f35] px-5 py-4 mb-8">
            <p className="font-mono text-xs text-[#a78bfa] mb-3">
              // Source Reports
            </p>
            <ul className="space-y-1">
              {insight.sources.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <span className="text-[#3a4a6a] font-mono text-xs mt-0.5 shrink-0">
                    --
                  </span>
                  <span className="text-xs text-[#5a6a8a]">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-px bg-gradient-to-r from-[#a78bfa33] via-[#151f35] to-transparent mb-8" />

          {/* Hero image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={insight.heroImage}
            alt={insight.heroImageAlt}
            className="w-full object-cover border border-[#151f35] mb-2"
            style={{ maxHeight: "400px" }}
            loading="eager"
          />
          <p className="text-xs text-[#3a4a6a] font-mono mb-10">
            {insight.heroImageAlt}
          </p>
        </section>

        {/* Report body */}
        <article className="max-w-3xl mx-auto px-6 pb-20 space-y-5">
          {insight.content.map((section, idx) => renderSection(section, idx))}
        </article>

        {/* CTA */}
        <section className="border-t border-[#151f35]">
          <div className="max-w-3xl mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-2">
                // Apply These Findings
              </p>
              <h2 className="text-xl font-bold text-white mb-1">
                Assess your exposure against this year&#39;s threat landscape.
              </h2>
              <p className="text-sm text-[#5a6a8a]">
                Our team can run the engagements that turn this data into
                specific, actionable findings for your environment.
              </p>
            </div>
            <Link
              href="/get-a-quote"
              className="shrink-0 border border-[#a78bfa] text-[#a78bfa] font-bold px-6 py-3 text-sm hover:bg-[#a78bfa] hover:text-[#070b12] transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </section>

        {/* Other reports from the same year */}
        {otherInsights.length > 0 && (
          <section className="border-t border-[#151f35]">
            <div className="max-w-3xl mx-auto px-6 py-14">
              <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-6">
                // More from {insight.year}
              </p>
              <div className="grid md:grid-cols-2 gap-px bg-[#151f35]">
                {otherInsights.map((other) => (
                  <article
                    key={other.slug}
                    className="bg-[#070b12] p-6 group hover:bg-[#0c1221] transition-colors flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono text-[#a78bfa] border border-[#a78bfa33] px-2 py-0.5">
                        {other.tag}
                      </span>
                      <span className="text-xs text-[#3a4a6a]">
                        {other.readTime}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-[#a78bfa] transition-colors flex-1">
                      <Link href={`/industry-insights/${other.slug}`}>
                        {other.title}
                      </Link>
                    </h3>
                    <Link
                      href={`/industry-insights/${other.slug}`}
                      className="mt-3 text-xs text-[#a78bfa] font-mono group-hover:translate-x-1 transition-transform inline-block"
                    >
                      Read report →
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
