import Link from "next/link";
import FloatingFeatures from "@/components/FloatingFeatures";
import LandingHeader from "@/components/LandingHeader";

export default function Home(): React.ReactElement {
  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      <div className="absolute inset-0 bg-gradient-to-br from-[#524E75] via-[#3d3958] to-[#78516D]" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10v40M10 30h40' stroke='%23FFEECB' stroke-width='1' fill='none'/%3E%3Cpath d='M25 15l10 10 10-10M25 45l10-10 10 10' stroke='%23FFEECB' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-[#B75D49]/10" />

      <main className="relative z-10 mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4 py-4">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-cream"
          >
            MedCare
          </Link>
          <LandingHeader />
        </header>

        <section className="flex flex-col items-center py-16 text-center sm:py-24">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-cream sm:text-5xl lg:text-6xl">
            Care for your grandparents, one dose at a time
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-graphite-slate">
            Upload a prescription or add medicines manually. Our AI helps you
            keep track and never miss a reminder.
          </p>
          <Link
            href="/login"
            className="mt-10 inline-flex rounded-2xl border border-glass bg-goldenrod/40 px-8 py-4 text-lg font-semibold text-cream shadow-diffuse backdrop-blur-md transition-colors hover:bg-goldenrod/60"
          >
            Get started
          </Link>
        </section>

        <section className="relative">
          <FloatingFeatures />
        </section>

        <section id="about" className="scroll-mt-24 py-16">
          <h2 className="mb-6 text-2xl font-bold text-cream">
            About Us
          </h2>
          <div className="rounded-2xl border border-glass bg-glass p-8 shadow-soft backdrop-blur-md">
            <p className="leading-relaxed text-graphite-slate">
              MedCare helps families keep their grandparents on track with
              medications. Upload a prescription for AI-powered extraction, or
              add medicines and times manually. View and manage schedules by
              person in your caregiver dashboard, and never miss a dose.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
