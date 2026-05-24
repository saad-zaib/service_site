import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug, getAllSlugs, type BlogSection } from "../../lib/blog-posts";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const description =
    post.excerpt.length > 160 ? post.excerpt.slice(0, 157) + "..." : post.excerpt;
  return {
    title: `${post.title} | ctfwithai Blog`,
    description,
    alternates: { canonical: `https://ctfwithai.com/blog/${post.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url: `https://ctfwithai.com/blog/${post.slug}`,
      siteName: "ctfwithai",
      title: post.title,
      description,
      images: [{ url: post.heroImage, alt: post.heroImageAlt }],
      publishedTime: post.isoDate,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
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
              <span className="text-[#a78bfa] mt-1 shrink-0 font-mono text-xs">--</span>
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
            <span className="font-mono text-xs text-[#3a4a6a]">{section.lang}</span>
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
        info: { border: "border-[#3b82f6]", tag: "INFO", tagColor: "text-[#3b82f6]" },
        warn: { border: "border-[#f59e0b]", tag: "WARNING", tagColor: "text-[#f59e0b]" },
        tip: { border: "border-[#a78bfa]", tag: "TIP", tagColor: "text-[#a78bfa]" },
      };
      const v = variants[section.variant];
      return (
        <div key={idx} className={`my-4 border-l-2 ${v.border} bg-[#0c1221] px-5 py-4`}>
          <span className={`font-mono text-xs font-bold ${v.tagColor} block mb-2`}>
            {v.tag}
          </span>
          <p className="text-[#8a9ab8] text-[0.95rem] leading-relaxed">{section.text}</p>
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
                <tr key={ri} className={ri % 2 === 0 ? "bg-[#070b12]" : "bg-[#080d15]"}>
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.isoDate,
    author: { "@type": "Organization", name: "ctfwithai", url: "https://ctfwithai.com" },
    publisher: { "@type": "Organization", name: "ctfwithai", url: "https://ctfwithai.com" },
    image: post.heroImage,
    url: `https://ctfwithai.com/blog/${post.slug}`,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ctfwithai.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://ctfwithai.com/blog" },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://ctfwithai.com/blog/${post.slug}`,
      },
    ],
  };

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.tag === post.tag)
    .slice(0, 3);
  const otherPosts =
    relatedPosts.length < 3
      ? [
          ...relatedPosts,
          ...blogPosts.filter((p) => p.slug !== post.slug && p.tag !== post.tag),
        ].slice(0, 3)
      : relatedPosts;

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
                <Link href="/blog" className="hover:text-white transition-colors">
                  blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#a78bfa] truncate max-w-[200px]">{post.slug}</li>
            </ol>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs border border-[#a78bfa33] text-[#a78bfa] px-2 py-0.5">
              {post.tag}
            </span>
            <span className="text-xs text-[#3a4a6a] font-mono">{post.date}</span>
            <span className="text-xs text-[#3a4a6a] font-mono">{post.readingTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
            {post.title}
          </h1>
          <p className="text-[#5a6a8a] leading-relaxed text-lg mb-8">{post.excerpt}</p>

          <div className="h-px bg-gradient-to-r from-[#a78bfa33] via-[#151f35] to-transparent mb-8" />

          {/* Hero image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.heroImage}
            alt={post.heroImageAlt}
            className="w-full object-cover border border-[#151f35] mb-2"
            style={{ maxHeight: "420px" }}
            loading="eager"
          />
          <p className="text-xs text-[#3a4a6a] font-mono mb-10">{post.heroImageAlt}</p>
        </section>

        {/* Article body */}
        <article className="max-w-3xl mx-auto px-6 pb-20 space-y-5">
          {post.content.map((section, idx) => renderSection(section, idx))}
        </article>

        {/* CTA */}
        <section className="border-t border-[#151f35]">
          <div className="max-w-3xl mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-2">
                // Need Help?
              </p>
              <h2 className="text-xl font-bold text-white mb-1">
                Talk to the team that wrote this.
              </h2>
              <p className="text-sm text-[#5a6a8a]">
                Every article reflects real-world experience. Our team is available to help you
                apply it.
              </p>
            </div>
            <Link
              href={`/get-a-quote?service=${encodeURIComponent(post.tag)}`}
              className="shrink-0 border border-[#a78bfa] text-[#a78bfa] font-bold px-6 py-3 text-sm hover:bg-[#a78bfa] hover:text-[#070b12] transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </section>

        {/* Related posts */}
        {otherPosts.length > 0 && (
          <section className="border-t border-[#151f35]">
            <div className="max-w-3xl mx-auto px-6 py-14">
              <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-6">
                // More from the Blog
              </p>
              <div className="grid md:grid-cols-3 gap-px bg-[#151f35]">
                {otherPosts.map((related) => (
                  <article
                    key={related.slug}
                    className="bg-[#070b12] p-6 group hover:bg-[#0c1221] transition-colors flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono text-[#a78bfa] border border-[#a78bfa33] px-2 py-0.5">
                        {related.tag}
                      </span>
                      <span className="text-xs text-[#3a4a6a]">{related.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-[#a78bfa] transition-colors flex-1">
                      <Link href={`/blog/${related.slug}`}>{related.title}</Link>
                    </h3>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="mt-3 text-xs text-[#a78bfa] font-mono group-hover:translate-x-1 transition-transform inline-block"
                    >
                      Read more →
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
