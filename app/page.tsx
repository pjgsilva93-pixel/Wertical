import Image from "next/image";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans">

      <Nav active="Home" />

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center gap-6 px-16 py-[120px] overflow-hidden min-h-[500px]">
        <Image src="/herobg.png" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-[rgba(142,158,171,0.6)]" />

        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <Image src="/Logo.svg" alt="Wertical" width={160} height={160} />
          <h1 className="text-[48px] font-bold tracking-[-1.2px] leading-[1.1] text-black">
            Wertical.
          </h1>
          <p className="text-xl font-light tracking-[-0.12px] text-white/80">
            UX / UI / GRAPHIC / VISUAL LAB
          </p>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="bg-white flex flex-col items-center justify-center gap-8 py-12">
        <p className="text-[36px] font-bold tracking-[-0.72px] text-black text-center">
          You think big. We design smart.
        </p>
        <button className="bg-black text-white font-medium text-[18px] tracking-[-0.09px] px-6 py-3 rounded-xl cursor-pointer hover:bg-black/80 transition-colors">
          Contact us
        </button>
      </section>

      {/* FEATURE CARDS */}
      <section className="bg-white flex flex-col md:flex-row gap-8 items-start justify-center pb-[120px] pt-10 px-8 md:px-16">

        {/* Card 1 — Branding */}
        <div className="flex w-full md:flex-1 flex-col gap-8 items-start md:min-w-[336px] md:max-w-[388px]">
          <div className="relative w-full h-[363px] rounded-2xl overflow-hidden shrink-0">
            <Image
              src="/brandingkinhausmockup.png"
              alt="Branding — Kin Haus"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="text-[24px] font-semibold tracking-[-0.48px] text-black leading-[1.2]">Branding</h5>
            <p className="text-[18px] font-medium tracking-[-0.09px] text-black/55 leading-[1.45]">
              We create clear and consistent visual identities that express the essence of a brand and make it recognizable across every touchpoint.
            </p>
          </div>
        </div>

        {/* Card 2 — UX/UI */}
        <div className="flex w-full md:flex-1 flex-col gap-8 items-start md:min-w-[336px] md:max-w-[388px]">
          <div className="relative w-full h-[363px] rounded-2xl overflow-hidden shrink-0">
            <Image
              src="/UXUIMockup.png"
              alt="UX / UI"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="text-[24px] font-semibold tracking-[-0.48px] text-black leading-[1.2]">UX / UI</h5>
            <p className="text-[18px] font-medium tracking-[-0.09px] text-black/55 leading-[1.45]">
              We design intuitive digital experiences and functional interfaces, focused on usability, clarity, and seamless interaction.
            </p>
          </div>
        </div>

        {/* Card 3 — Graphic Design */}
        <div className="flex w-full md:flex-1 flex-col gap-8 items-start md:min-w-[336px] md:max-w-[388px]">
          <div className="relative w-full h-[363px] rounded-2xl overflow-hidden shrink-0">
            <Image
              src="/GraphicDesignmockup.png"
              alt="Graphic Design"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="text-[24px] font-semibold tracking-[-0.48px] text-black leading-[1.2]">Graphic Design</h5>
            <p className="text-[18px] font-medium tracking-[-0.09px] text-black/55 leading-[1.45]">
              We develop visually impactful graphic solutions, combining concept, typography, and composition to communicate effectively.
            </p>
          </div>
        </div>

      </section>

      {/* VALUE PROP */}
      <section className="bg-[rgba(142,158,171,0.2)] px-8 py-20 md:px-16 md:py-24">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">

          <h2 className="max-w-xs text-3xl font-bold leading-tight tracking-tight text-black md:text-4xl">
            Ideas.<br />Designed.<br />Delivered.
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:max-w-2xl">

            <div className="rounded-2xl bg-black/5 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="size-3 rounded-full bg-[#08487e] shrink-0" />
                <h3 className="text-base font-semibold text-black">From idea to delivery</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/55">
                We help shape projects from early concepts to final execution, covering strategy, design, and everything in between, always with clarity and purpose.
              </p>
            </div>

            <div className="rounded-2xl bg-black/5 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="size-3 rounded-full bg-[#08487e] shrink-0" />
                <h3 className="text-base font-semibold text-black">From concept to launch</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/55">
                We support your project from ideation and concept development through to delivery, ensuring a clear direction at every stage.
              </p>
            </div>

            <div className="rounded-2xl bg-black/5 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="size-3 rounded-full bg-[#08487e] shrink-0" />
                <h3 className="text-base font-semibold text-black">Design & visual systems</h3>
              </div>
              <p className="text-sm leading-relaxed text-black/55">
                We create all visual assets from brand identity and UI design to complete websites, built to be consistent, functional, and scalable.
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
