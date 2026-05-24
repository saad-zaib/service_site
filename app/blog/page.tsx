import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "../lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog: Cybersecurity Insights and Research | ctfwithai",
  description:
    "Practical cybersecurity writing from the ctfwithai team covering penetration testing, AI security, threat intelligence, GRC, and hands-on research.",
  keywords: [
    "cybersecurity blog",
    "penetration testing articles",
    "AI security research",
    "threat intelligence insights",
    "GRC guidance",
    "offensive security writing",
  ],
  alternates: { canonical: "https://ctfwithai.com/blog" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://ctfwithai.com/blog",
    siteName: "ctfwithai",
    title: "Blog: Cybersecurity Insights and Research | ctfwithai",
    description:
      "Practical cybersecurity writing from the ctfwithai team covering penetration testing, AI security, threat intelligence, GRC, and hands-on research.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | ctfwithai",
    description: "Practical cybersecurity writing from the ctfwithai team.",
    creator: "@ctfwithai",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "ctfwithai Blog",
  description:
    "Practical cybersecurity writing covering penetration testing, AI security, threat intelligence, GRC, and hands-on research.",
  url: "https://ctfwithai.com/blog",
  publisher: {
    "@type": "Organization",
    name: "ctfwithai",
    url: "https://ctfwithai.com",
  },
};

const allTags = Array.from(new Set(blogPosts.map((p) => p.tag)));

export default function BlogPage() {
  const sorted = [...blogPosts].reverse();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <section
          className="max-w-6xl mx-auto px-6 pt-20 pb-16"
          aria-labelledby="blog-heading"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-[#a78bfa] uppercase mb-4">
            // Latest Thinking
          </p>
          <h1
            id="blog-heading"
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            From the Blog
          </h1>
          <p className="text-lg text-[#5a6a8a] max-w-xl leading-relaxed">
            Practical research, technical breakdowns, and field notes from the
            ctfwithai team.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {allTags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs border border-[#a78bfa33] text-[#a78bfa] px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 h-px bg-gradient-to-r from-[#a78bfa33] via-[#151f35] to-transparent" />
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid md:grid-cols-3 gap-px bg-[#151f35]">
            {sorted.map((post) => (
              <article
                key={post.slug}
                className="bg-[#070b12] p-8 group hover:bg-[#0c1221] transition-colors flex flex-col"
              >
                {/* Thumbnail */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${post.heroImage}`}
                  alt={post.heroImageAlt}
                  className="w-full h-40 object-cover mb-5 border border-[#151f35]"
                  loading="lazy"
                />
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-[#a78bfa] border border-[#a78bfa33] px-2 py-0.5">
                    {post.tag}
                  </span>
                  <span className="text-xs text-[#3a4a6a]">{post.date}</span>
                </div>
                <h2 className="text-base font-bold text-white mb-3 leading-snug group-hover:text-[#a78bfa] transition-colors flex-1">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-sm text-[#5a6a8a] leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs text-[#a78bfa] font-mono group-hover:translate-x-1 transition-transform inline-block"
                  >
                    Read more →
                  </Link>
                  <span className="text-xs text-[#3a4a6a] font-mono">{post.readingTime}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
