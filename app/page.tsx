"use client";

import Image from "next/image";
import Link from "next/link";
import Nav from "./components/Nav";
import AnimateIn from "./components/AnimateIn";
import { useLang } from "./context/LanguageContext";

/* ─── Big logo + wordmark hero visual ─────────────────────── */
function LogoHero() {
  return (
    <div className="flex flex-col items-center justify-center w-full" style={{ gap: 20 }}>
      {/* Logo */}
      <div style={{
        width: "clamp(100px, 20vw, 200px)",
        height: "clamp(100px, 20vw, 200px)",
        filter: "drop-shadow(0 16px 32px rgba(34,34,34,0.14)) drop-shadow(0 4px 12px rgba(0,0,0,0.07))",
      }}>
        <Image
          src="/Logo.svg"
          alt="Wertical"
          width={200}
          height={200}
          className="hero-logo-entrance hero-logo-float w-full h-full"
        />
      </div>
      {/* Wordmark */}
      <div style={{ textAlign: "center" }}>
        <div style={{
          fontSize: "clamp(36px, 6vw, 72px)",
          fontWeight: 800,
          letterSpacing: "-2.5px",
          lineHeight: 1,
          color: "#0A0909",
        }}>
          Wertical
        </div>
      </div>
    </div>
  );
}

/* ─── Marquee ──────────────────────────────────────────────── */
function Marquee() {
  const items = [
    "Brand Identity", "UX / UI Design", "Web Development",
    "Graphic Design", "AI Automation", "Visual Systems",
    "Product Design", "Motion & Print",
  ];
  const all = [...items, ...items];

  return (
    <div style={{
      overflow: "hidden",
      borderTop: "1px solid rgba(0,0,0,0.06)",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
      padding: "13px 0",
      background: "#fff",
    }}>
      <div className="marquee-track">
        {all.map((item, i) => (
          <span key={i} style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "rgba(0,0,0,0.25)",
            padding: "0 28px", whiteSpace: "nowrap",
          }}>
            {item}&nbsp;&nbsp;·
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Home page ────────────────────────────────────────────── */
export default function Home() {
  const { t } = useLang();
  const h = t.home;

  const [headingA, headingB] = h.ctaHeading.includes(",")
    ? [h.ctaHeading.split(",")[0] + ",", h.ctaHeading.split(",").slice(1).join(",").trim()]
    : [h.ctaHeading, ""];

  return (
    <main className="min-h-screen font-sans" style={{ background: "#FAFAF8" }}>
      <Nav />

      {/* ── HERO ────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col justify-center px-10 md:px-28 py-32 md:py-0 md:min-h-[92vh] overflow-hidden"
        style={{ background: "#FAFAF8" }}
      >
        {/* Subtle dot grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }} />
        {/* Accent glow top-left */}
        <div className="absolute" style={{
          top: -120, left: -120, width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,34,34,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        {/* Warm glow bottom-right */}
        <div className="absolute" style={{
          bottom: -80, right: -80, width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,166,66,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-14 md:gap-8">

          {/* Logo — first on mobile, right side on desktop */}
          <div className="w-full md:w-[460px] lg:w-[500px] shrink-0 order-first md:order-last">
            <LogoHero />
          </div>

          {/* Copy — second on mobile, left side on desktop */}
          <div className="flex flex-col gap-10 max-w-[520px] w-full order-last md:order-first">

            {/* Label pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(34,34,34,0.08)",
              border: "1px solid rgba(34,34,34,0.15)",
              borderRadius: 99, padding: "6px 14px 6px 10px", width: "fit-content",
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#222222", flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "#222222" }}>
                {h.heroBadge}
              </span>
            </div>

            {/* Editorial headline */}
            <h1 style={{ lineHeight: 1.0, letterSpacing: "-2px" }}>
              <span style={{
                display: "block",
                fontSize: "clamp(40px, 5.5vw, 68px)",
                fontWeight: 300,
                color: "rgba(10,9,9,0.55)",
                lineHeight: 1.1,
                letterSpacing: "-1.5px",
              }}>
                {headingA}
              </span>
              <span style={{
                display: "block",
                fontSize: "clamp(46px, 6.5vw, 80px)",
                fontWeight: 800,
                color: "#0A0909",
                lineHeight: 1.0,
                letterSpacing: "-3px",
              }}>
                {headingB}
              </span>
            </h1>

            {/* Sub */}
            <p style={{ fontSize: 15, color: "rgba(10,9,9,0.45)", lineHeight: 1.78, maxWidth: 360 }}>
              From brand identity to shipping code — a studio that does both with intention.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <Link href="/contact" style={{
                background: "#0A0909", color: "#fff",
                fontSize: 13, fontWeight: 700, letterSpacing: "-0.1px",
                padding: "12px 22px", borderRadius: 10,
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7,
              }}>
                {h.ctaBtn}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/works" style={{
                background: "transparent",
                border: "1px solid rgba(10,9,9,0.14)",
                color: "rgba(10,9,9,0.6)",
                fontSize: 13, fontWeight: 600,
                padding: "12px 22px", borderRadius: 10,
                textDecoration: "none",
              }}>
                View our work
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 28, paddingTop: 8, borderTop: "1px solid rgba(0,0,0,0.07)" }}>
              {[
                { num: "20+", label: "Projects" },
                { num: "4",   label: "Services" },
                { num: "2",   label: "Certifications" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#222222", letterSpacing: "-1px", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: 11, color: "rgba(10,9,9,0.4)", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.12))" }} />
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────── */}
      <Marquee />

      {/* ── SERVICES ────────────────────────────────────────── */}
      <section className="px-8 md:px-16 py-28 md:py-32" style={{ background: "#fff" }}>
        <AnimateIn delay={0} duration={600}>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.3)", marginBottom: 8 }}>
                What we do
              </p>
              <h2 style={{ fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 800, letterSpacing: "-1.2px", lineHeight: 1.05, color: "#0A0909" }}>
                Design-led,{" "}
                <span style={{ fontWeight: 300, fontStyle: "italic" }}>code-ready.</span>
              </h2>
            </div>
            <Link href="/works" style={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.35)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5 }}>
              See all work
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </AnimateIn>

        {/* Bento: 2/3 + 1/3 top, 1/3 + 2/3 bottom — single col on mobile */}
        <div className="services-grid">

          {/* Branding — tall left */}
          <AnimateIn delay={0} duration={650}>
            <div className="service-card group relative rounded-2xl overflow-hidden" style={{ height: 420 }}>
              <Image src="/brandingkinhausmockup.png" alt="Branding" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }} />
              <div style={{ position: "absolute", inset: 0, padding: "24px 24px 28px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>01</span>
                <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: "#fff", lineHeight: 1.15 }}>{h.brandingTitle}</h3>
                <p className="translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out"
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 8, lineHeight: 1.7, maxWidth: 400 }}>
                  {h.brandingDesc}
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* UX/UI — right */}
          <AnimateIn delay={60} duration={650}>
            <div className="service-card group relative rounded-2xl overflow-hidden" style={{ height: 420 }}>
              <Image src="/UXUIMockup.png" alt="UX/UI" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }} />
              <div style={{ position: "absolute", inset: 0, padding: "20px 20px 24px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>02</span>
                <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.4px", color: "#fff", lineHeight: 1.2 }}>{h.uxuiTitle}</h3>
                <p className="translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out"
                  style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 8, lineHeight: 1.65 }}>
                  {h.uxuiDesc}
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Graphic — bottom left */}
          <AnimateIn delay={120} duration={650}>
            <div className="service-card group relative rounded-2xl overflow-hidden" style={{ height: 380 }}>
              <Image src="/GraphicDesignmockup.png" alt="Graphic" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }} />
              <div style={{ position: "absolute", inset: 0, padding: "20px 20px 24px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>03</span>
                <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.4px", color: "#fff", lineHeight: 1.2 }}>{h.graphicTitle}</h3>
                <p className="translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out"
                  style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 8, lineHeight: 1.65 }}>
                  {h.graphicDesc}
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Dev/AI — bottom right, accent bg */}
          <AnimateIn delay={180} duration={650}>
            <div className="service-card group relative rounded-2xl overflow-hidden" style={{ height: 380, background: "#708090" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.12) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", inset: 0, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ fontFamily: "'JetBrains Mono','Menlo',monospace", fontSize: 11, lineHeight: 2 }}>
                  {[
                    { c: "rgba(255,255,255,0.5)", t: "// ai-powered" },
                    { c: "rgba(255,255,255,0.85)", t: "const flow = await" },
                    { c: "rgba(255,255,255,0.65)", t: "  ai.design(brief)" },
                    { c: "rgba(255,255,255,0.65)", t: "    .build().ship();" },
                    { c: "", t: "" },
                    { c: "rgba(255,255,255,0.5)", t: "// ✓ delivered." },
                  ].map((l, i) => <div key={i} style={{ color: l.c, minHeight: "1.9em" }}>{l.t || "\u00a0"}</div>)}
                </div>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", display: "block", marginBottom: 8 }}>04</span>
                  <h3 style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.4px", color: "#fff", lineHeight: 1.2 }}>{h.aiTitle}</h3>
                  <p className="translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out"
                    style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)", marginTop: 8, lineHeight: 1.7 }}>
                    {h.aiDesc}
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── VALUE PROPS ─────────────────────────────────────── */}
      <section className="px-8 md:px-16 py-28 md:py-32" style={{ background: "#F5F4F0" }}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-14">
          <AnimateIn delay={0} duration={600}>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 48px)", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.0, color: "#0A0909" }}>
              <span style={{ fontStyle: "italic", fontWeight: 300 }}>{h.valueHeading[0]}</span><br />
              {h.valueHeading[1]}<br />
              {h.valueHeading[2]}
            </h2>
          </AnimateIn>
          <AnimateIn delay={100} duration={600}>
            <p style={{ fontSize: 14, color: "rgba(10,9,9,0.45)", lineHeight: 1.78, maxWidth: 320 }}>
              Every project gets the same care — from the first sketch to the final pixel.
            </p>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {([
            { title: h.v1title, desc: h.v1desc },
            { title: h.v2title, desc: h.v2desc },
            { title: h.v3title, desc: h.v3desc },
          ] as const).map((v, i) => (
            <AnimateIn key={i} delay={i * 80} duration={600}>
              <div style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", border: "1px solid rgba(0,0,0,0.06)", height: "100%" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#222222", marginBottom: 18 }} />
                <h3 style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.4px", marginBottom: 10, color: "#0A0909" }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(10,9,9,0.45)", lineHeight: 1.78 }}>{v.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────────── */}
      <section className="px-8 md:px-16 py-24 md:py-32 flex flex-col items-center text-center gap-6 relative overflow-hidden" style={{ background: "#708090" }}>
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.12) 0%, transparent 60%)",
        }} />

        <AnimateIn delay={0} duration={600}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", position: "relative", zIndex: 1 }}>
            Let&apos;s work together
          </p>
        </AnimateIn>
        <AnimateIn delay={80} duration={600}>
          <h2 style={{ fontSize: "clamp(32px, 5.5vw, 72px)", fontWeight: 800, letterSpacing: "-2.5px", color: "#fff", lineHeight: 1.0, position: "relative", zIndex: 1 }}>
            <span style={{ fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}>{headingA}</span><br />
            {headingB}
          </h2>
        </AnimateIn>
        <AnimateIn delay={180} duration={600}>
          <Link href="/contact" style={{
            marginTop: 16, background: "#222222", color: "#fff",
            fontSize: 14, fontWeight: 700,
            padding: "14px 32px", borderRadius: 12,
            textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
            position: "relative", zIndex: 1,
            boxShadow: "0 8px 32px rgba(34,34,34,0.4)",
          }}>
            {h.ctaBtn}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </AnimateIn>
      </section>

    </main>
  );
}
