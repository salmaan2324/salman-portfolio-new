import Link from "next/link";
import { ArrowRight, GraduationCap, Languages, MapPin, Target } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

const facts = [
  { label: "Focus", value: "Sales & Business Management" },
  { label: "Education", value: "BSc in Information & Communications Technology" },
  { label: "Based in", value: profile.location },
  { label: "Languages", value: "Somali · English · Arabic" },
];

export default function SummaryPage() {
  return (
    <div className="page-enter space-y-6">
      <header className="warm-card rounded-[28px] border border-white/10 p-7 sm:p-10">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-sky-300 uppercase">01 / Professional summary</p>
        <h1 className="max-w-3xl text-4xl leading-tight font-semibold tracking-[-0.05em] text-white sm:text-6xl">
          Commercial leadership. Practical technical perspective.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
          {profile.biography}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[26px] border border-white/10 bg-white/[0.035] p-7 sm:p-9">
          <div className="mb-5 flex size-11 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-300">
            <Target size={19} />
          </div>
          <p className="text-xs font-semibold tracking-[0.18em] text-sky-300 uppercase">My focus</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Turning opportunities into steady growth.</h2>
          <p className="mt-4 text-sm leading-7 text-white/60">{profile.focus}</p>
          <Link href="/experience" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-sky-300 transition hover:text-sky-200">
            Explore my experience <ArrowRight size={16} />
          </Link>
        </section>

        <section aria-label="Profile details" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {facts.map(({ label, value }, index) => {
            const Icon = [Target, GraduationCap, MapPin, Languages][index];
            return (
              <article key={label} className="flex items-start gap-4 rounded-2xl border border-white/[0.09] bg-[#1b2b39]/80 p-5">
                <span className="mt-0.5 text-sky-300"><Icon size={17} /></span>
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-white/40 uppercase">{label}</p>
                  <p className="mt-1 text-sm leading-6 text-white/85">{value}</p>
                </div>
              </article>
            );
          })}
        </section>
      </div>

      <section className="rounded-[26px] border border-white/10 bg-[#1b2b39]/80 p-7 sm:p-9">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-sky-300 uppercase">Academic background</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Education &amp; languages</h2>
          </div>
          <p className="text-xs text-white/45">A foundation in information and communications technology.</p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/[0.08] bg-black/20 p-5">
            <p className="text-xs text-sky-300">October 2017 – September 2021</p>
            <h3 className="mt-2 font-semibold text-white">Bachelor of Science in ICT</h3>
            <p className="mt-1 text-sm text-white/55">University of Burao · Burao</p>
          </article>
          <article className="rounded-2xl border border-white/[0.08] bg-black/20 p-5">
            <p className="text-xs text-sky-300">Languages</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Somali · Native / Fluent", "English · Professional", "Arabic · Moderate"].map((item) => (
                <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/70">{item}</span>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
