"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "../context/LanguageContext";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { lang, toggle, t } = useLang();

  const links = [
    { href: "/",      label: t.nav.home },
    { href: "/works", label: t.nav.works },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav className="flex items-center justify-between px-8 py-4 md:px-16 bg-white relative z-50" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/Logo.svg" alt="Wertical" width={32} height={32} />
        </Link>

        {/* Desktop links — center */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                isActive(link.href)
                  ? "text-black bg-black/6"
                  : "text-black/40 hover:text-black hover:bg-black/4"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="hidden md:flex items-center gap-1 text-xs font-semibold text-black/25 hover:text-black/60 transition-colors"
          >
            <span className={lang === "en" ? "text-black/60" : ""}>EN</span>
            <span className="text-black/15">/</span>
            <span className={lang === "pt" ? "text-black/60" : ""}>PT</span>
          </button>

          <Link
            href="/contact"
            className="hidden md:flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-colors text-white"
            style={{ background: "#222222" }}
          >
            {t.nav.contact}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="flex md:hidden flex-col items-center justify-center gap-[5px] w-9 h-9"
            aria-label="Toggle menu"
          >
            <span className={`block h-[1.5px] bg-black transition-all duration-300 origin-center ${open ? "w-5 rotate-45 translate-y-[3.5px]" : "w-5"}`} />
            <span className={`block h-[1.5px] bg-black transition-all duration-300 ${open ? "w-0 opacity-0" : "w-3.5"}`} />
            <span className={`block h-[1.5px] bg-black transition-all duration-300 origin-center ${open ? "w-5 -rotate-45 -translate-y-[3.5px]" : "w-5"}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Mobile slide-in */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white z-50 flex flex-col transition-transform duration-300 ease-in-out md:hidden ${open ? "translate-x-0" : "translate-x-full"}`} style={{ borderLeft: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between px-8 py-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          <Link href="/" onClick={() => setOpen(false)}>
            <Image src="/Logo.svg" alt="Wertical" width={28} height={28} />
          </Link>
          <button onClick={() => setOpen(false)} className="relative w-8 h-8">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block h-[1.5px] w-5 bg-black rotate-45" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block h-[1.5px] w-5 bg-black -rotate-45" />
          </button>
        </div>

        <div className="flex flex-col px-8 py-10 gap-1">
          {[...links, { href: "/contact", label: t.nav.contact }].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-lg font-semibold tracking-[-0.3px] py-2 transition-colors ${
                isActive(link.href) ? "text-black" : "text-black/25 hover:text-black"
              }`}
              style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-auto px-8 py-8 flex items-center justify-between" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          <p className="text-[10px] text-black/25 tracking-widest uppercase">{t.nav.tagline}</p>
          <button
            onClick={toggle}
            className="flex items-center gap-1 text-xs font-semibold text-black/30 hover:text-black transition-colors"
          >
            <span className={lang === "en" ? "text-black/70" : ""}>EN</span>
            <span className="text-black/15">/</span>
            <span className={lang === "pt" ? "text-black/70" : ""}>PT</span>
          </button>
        </div>
      </div>
    </>
  );
}
