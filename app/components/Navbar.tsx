"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { servicesList, solutionsList } from "../lib/services";
import type { Service } from "../lib/services";

type DropdownKey = "services" | "solutions" | null;

function Dropdown({ items, onClose }: { items: Service[]; onClose: () => void }) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 border border-[#151f35] bg-[#070b12] shadow-xl shadow-black/60"
      role="menu"
      aria-label="Dropdown menu"
    >
      <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 border-l border-t border-[#151f35] bg-[#070b12]" />
      <ul className="py-2">
        {items.map((item) => (
          <li key={item.slug} role="none">
            <Link
              href={`/services/${item.slug}`}
              role="menuitem"
              className="flex items-start gap-3 px-5 py-3 hover:bg-[#0c1221] group transition-colors"
              onClick={onClose}
            >
              <span className="font-mono text-xs text-[#3a4a6a] mt-0.5 shrink-0 group-hover:text-[#a78bfa] transition-colors">
                {item.tag}
              </span>
              <span>
                <span className="block text-sm font-semibold text-white group-hover:text-[#a78bfa] transition-colors">
                  {item.title}
                </span>
                <span className="block text-xs text-[#3a4a6a] mt-0.5 leading-relaxed">
                  {item.shortDescription}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState<DropdownKey>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function enter(key: DropdownKey) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  }

  function leave() {
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  }

  return (
    <header className="relative z-50 border-b border-[#151f35] sticky top-0 bg-[#070b12]/95 backdrop-blur-sm">
      <nav
        className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="ctfwithai home"
        >
          <Image
            src="/asset/logo.png"
            alt="ctfwithai logo"
            width={28}
            height={28}
            priority
          />
          <span className="font-mono text-base font-bold tracking-widest text-[#a78bfa] uppercase">
            ctfwithai
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm text-[#5a6a8a]">
          {/* Services dropdown */}
          <li
            className="relative"
            onMouseEnter={() => enter("services")}
            onMouseLeave={leave}
          >
            <button
              className="flex items-center gap-1 hover:text-white transition-colors py-1"
              aria-haspopup="true"
              aria-expanded={open === "services"}
            >
              Services
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${open === "services" ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open === "services" && (
              <Dropdown
                items={servicesList}
                onClose={() => setOpen(null)}
              />
            )}
          </li>

          {/* Solutions dropdown */}
          <li
            className="relative"
            onMouseEnter={() => enter("solutions")}
            onMouseLeave={leave}
          >
            <button
              className="flex items-center gap-1 hover:text-white transition-colors py-1"
              aria-haspopup="true"
              aria-expanded={open === "solutions"}
            >
              Solutions
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${open === "solutions" ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open === "solutions" && (
              <Dropdown
                items={solutionsList}
                onClose={() => setOpen(null)}
              />
            )}
          </li>

          <li>
            <Link href="/industry-insights" className="hover:text-white transition-colors">
              Insights
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/#about" className="hover:text-white transition-colors">
              About
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/the-bridge"
            className="text-sm font-semibold border border-[#a78bfa] text-[#a78bfa] px-4 py-2 hover:bg-[#a78bfa] hover:text-[#070b12] transition-colors"
          >
            Try The Bridge
          </Link>
          <Link
            href="/get-a-quote"
            className="text-sm font-semibold border border-[#a78bfa] text-[#a78bfa] px-4 py-2 hover:bg-[#a78bfa] hover:text-[#070b12] transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      </nav>
    </header>
  );
}
