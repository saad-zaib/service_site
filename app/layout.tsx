import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ctfwithai.com"),
  title: {
    default: "ctfwithai: Full-Spectrum Cybersecurity Services",
    template: "%s | ctfwithai",
  },
  description:
    "Practitioner-led cybersecurity firm delivering penetration testing, red teaming, AI security, threat intelligence, GRC compliance, and security training.",
  keywords: [
    "penetration testing",
    "offensive security",
    "defensive security",
    "AI LLM pentesting",
    "threat intelligence",
    "red team assessment",
    "GRC compliance",
    "cybersecurity training",
    "incident response",
    "managed detection and response",
    "cybersecurity services",
    "ethical hacking",
  ],
  authors: [{ name: "ctfwithai" }],
  creator: "ctfwithai",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ctfwithai.com",
    siteName: "ctfwithai",
    title: "ctfwithai: Full-Spectrum Cybersecurity Services",
    description:
      "Practitioner-led cybersecurity firm. Penetration testing, red teaming, AI/LLM security, threat intelligence, GRC, and training from one accountable team.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ctfwithai: Full-Spectrum Cybersecurity Services",
    description:
      "Practitioner-led cybersecurity firm. Penetration testing, red teaming, AI/LLM security, threat intelligence, GRC, and training from one accountable team.",
    creator: "@ctfwithai",
  },
  alternates: {
    canonical: "https://ctfwithai.com",
  },
  icons: {
    icon: "/asset/logo.png",
    shortcut: "/asset/logo.png",
    apple: "/asset/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ctfwithai",
    url: "https://ctfwithai.com",
    description:
      "Full-spectrum cybersecurity services firm covering offensive security, defensive operations, AI/LLM pentesting, threat intelligence, GRC compliance, and training.",
    sameAs: ["https://twitter.com/ctfwithai"],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#070b12] text-[#e8edf5]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#151f35]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-5 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <Image
                src="/asset/logo.png"
                alt="ctfwithai logo"
                width={26}
                height={26}
              />
              <p className="font-mono text-base font-bold tracking-widest text-[#a78bfa] uppercase">
                ctfwithai
              </p>
            </div>
            <p className="text-sm text-[#3a4a6a] max-w-xs leading-relaxed">
              Full-spectrum cybersecurity services. Practitioner-led.
              Results-driven.
            </p>
          </div>
          <nav aria-label="Services footer links">
            <p className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
              Services
            </p>
            <ul className="space-y-2 text-sm text-[#3a4a6a]">
              {[
                ["Offensive Security", "/services/offensive-security"],
                ["Defensive Security", "/services/defensive-security"],
                ["GRC & Compliance", "/services/grc-compliance"],
                ["Security Training", "/services/security-training"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Solutions footer links">
            <p className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
              Solutions
            </p>
            <ul className="space-y-2 text-sm text-[#3a4a6a]">
              {[
                ["AI & LLM Pentesting", "/services/ai-llm-pentesting"],
                ["Threat Intelligence", "/services/threat-intelligence"],
                ["Managed SOC", "/services/managed-soc"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company footer links">
            <p className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
              Company
            </p>
            <ul className="space-y-2 text-sm text-[#3a4a6a]">
              {[
                ["About", "/#about"],
                ["The Bridge", "/the-bridge"],
                ["Blog", "/blog"],
                ["Industry Insights", "/industry-insights"],
                ["Get a Quote", "/get-a-quote"],
                ["Privacy Policy", "/privacy-policy"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="border-t border-[#151f35] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#3a4a6a]">
            &copy; {new Date().getFullYear()} ctfwithai. All rights reserved.
          </p>
          <p className="text-xs text-[#3a4a6a] font-mono">
            Practitioner-led. Accountable to results.
          </p>
        </div>
      </div>
    </footer>
  );
}
