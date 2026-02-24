import Image from "next/image";
import Link from "next/link";
import Nav from "../components/Nav";

export default function About() {
  return (
    <main className="min-h-screen bg-white font-sans flex flex-col">

      <Nav active="About us" />

      {/* CONTENT */}
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-8 py-32 text-center">
        <Image src="/Logo.svg" alt="Wertical" width={64} height={64} />
        <div className="flex flex-col gap-3">
          <h1 className="text-[40px] font-bold tracking-[-0.96px] text-black">
            We're working on it.
          </h1>
          <p className="text-lg font-medium text-black/50 max-w-sm">
            This page is coming soon. Check back later for more about Wertical.
          </p>
        </div>
        <Link
          href="/"
          className="mt-4 rounded-xl bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/80 transition-colors"
        >
          ← Back to home
        </Link>
      </div>

    </main>
  );
}
