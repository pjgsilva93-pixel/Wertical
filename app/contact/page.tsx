"use client";

import { useState } from "react";
import Nav from "../components/Nav";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans flex flex-col">

      <Nav active="Contact" />

      <div className="flex flex-1 flex-col items-center justify-center px-8 py-24">
        <div className="w-full max-w-lg">

          <h1 className="text-[40px] font-bold tracking-[-0.96px] text-black mb-2">
            Get in touch.
          </h1>
          <p className="text-lg font-medium text-black/50 mb-10">
            Tell us about your project and we'll get back to you.
          </p>

          {status === "success" ? (
            <div className="rounded-2xl bg-black p-8 text-center">
              <p className="text-xl font-bold text-white mb-2">Message sent!</p>
              <p className="text-white/60 text-sm">We'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-black/60">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="rounded-xl border border-black/10 bg-[#f7f7f7] px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-black/60">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="rounded-xl border border-black/10 bg-[#f7f7f7] px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-black/60">Message</label>
                <textarea
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="rounded-xl border border-black/10 bg-[#f7f7f7] px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 rounded-xl bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/80 transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Send message"}
              </button>

            </form>
          )}
        </div>
      </div>

    </main>
  );
}
