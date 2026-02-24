"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Nav({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About us" },
    { href: "/works", label: "Works" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="flex items-center justify-between px-8 py-5 md:px-16 bg-white border-b border-black/5 relative z-50">
        <Link href="/">
          <Image src="/Logo.svg" alt="Wertical" width={32} height={32} />
        </Link>

        {/* Hamburger button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col items-center justify-center gap-[6px] w-10 h-10 group"
          aria-label="Toggle menu"
        >
          <span className={`block h-[2px] bg-black transition-all duration-300 origin-center ${open ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
          <span className={`block h-[2px] bg-black transition-all duration-300 ${open ? "w-0 opacity-0" : "w-4"}`} />
          <span className={`block h-[2px] bg-black transition-all duration-300 origin-center ${open ? "w-6 -rotate-45 -translate-y-2" : "w-6"}`} />
        </button>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Slide-in menu */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-400 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}>

        {/* Close button */}
        <div className="flex items-center justify-end px-8 py-5 border-b border-black/5">
          <button
            onClick={() => setOpen(false)}
            className="flex flex-col items-center justify-center gap-[6px] w-10 h-10"
            aria-label="Close menu"
          >
            <span className="block h-[2px] w-6 bg-black rotate-45 translate-y-[1px]" />
            <span className="block h-[2px] w-6 bg-black -rotate-45 -translate-y-[1px]" />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col px-8 py-12 gap-2">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-[32px] font-bold tracking-tight leading-tight transition-colors hover:text-black ${
                active === link.label ? "text-black" : "text-black/25"
              }`}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-auto px-8 py-8 border-t border-black/5">
          <p className="text-xs text-black/30 tracking-widest uppercase">UX / UI / Graphic / Visual Lab</p>
        </div>
      </div>
    </>
  );
}
