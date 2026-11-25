import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, GraduationCap, MapPin } from "lucide-react";
import { experience } from "@/lib/portfolio-data";

export default function ExperiencePage() {
  return (
    <div className="page-enter space-y-6">
      <header className="warm-card rounded-[28px] border border-white/10 p-7 sm:p-10">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-sky-300 uppercase">02 / Career history</p>
        <h1 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">Experience</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
          A record of commercial, marketing, and technical roles built around people, service, and execution.
        </p>
      </header>

      <section aria-label="Employment history" className="space-y-4">
        {experience.map((role, index) => (
          <article key={`${role.company}-${role.title}`} className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#1b2b39]/85 p-6 sm:p-8">
            <span className="absolute inset-y-7 left-0 w-0.5 bg-sky-300/80" />
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div className="flex gap-4">
                <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-xl border border-sky-300/20 bg-sky-300/10 text-sky-300">
                  <BriefcaseBusiness size={17} />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-semibold text-white">{role.title}</h2>
                    {index === 0 && <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-medium text-emerald-300">Current role</span>}
                  </div>
                  <p className="mt-1 text-sm text-sky-200/90">{role.company}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-white/45"><MapPin size={13} /> {role.location}</p>
                </div>
              </div>
              <span className="shrink-0 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60">{role.dates}</span>
            </div>
            <ul className="mt-6 grid gap-x-8 gap-y-3 border-t border-white/[0.08] pt-5 text-sm leading-6 text-white/60 md:grid-cols-2">
              {role.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sky-300" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <div className="flex flex-col justify-between gap-4 rounded-[22px] border border-white/10 bg-white/[0.035] p-6 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-4">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-sky-300/10 text-sky-300"><GraduationCap size={19} /></span>
          <div>
            <h2 className="font-semibold text-white">Bachelor of Science in ICT</h2>
            <p className="mt-1 text-xs text-white/50">University of Burao · 2017–2021</p>
          </div>
        </div>
        <Link href="/skills" className="inline-flex items-center gap-2 text-sm font-medium text-sky-300 hover:text-sky-200">
          View professional skills <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
