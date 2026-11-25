import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { skillDomains } from "@/lib/portfolio-data";

export default function SkillsPage() {
  return (
    <div className="page-enter space-y-6">
      <header className="warm-card rounded-[28px] border border-white/10 p-7 sm:p-10">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-sky-300 uppercase">03 / Areas of expertise</p>
        <h1 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">Skills &amp; capabilities</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
          A blend of commercial leadership, digital communication, creative production, and hands-on ICT support.
        </p>
      </header>

      <section aria-label="Professional skills" className="grid gap-4 md:grid-cols-2">
        {skillDomains.map((domain, index) => (
          <article key={domain.title} className="rounded-[24px] border border-white/10 bg-[#1b2b39]/85 p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.18em] text-sky-300 uppercase">Domain 0{index + 1}</p>
                <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">{domain.title}</h2>
              </div>
              <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-sky-300/20 bg-sky-300/10 text-sky-300">
                <Check size={17} />
              </span>
            </div>
            <ul className="mt-5 space-y-3">
              {domain.skills.map((skill) => (
                <li key={skill} className="flex items-start gap-3 text-sm leading-6 text-white/65">
                  <Check size={14} className="mt-1 shrink-0 text-sky-300" />
                  {skill}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <div className="flex flex-col justify-between gap-4 rounded-[22px] border border-sky-300/15 bg-sky-300/[0.06] p-6 sm:flex-row sm:items-center sm:px-8">
        <div>
          <p className="text-xs text-sky-300">Have a role or project in mind?</p>
          <h2 className="mt-1 text-lg font-semibold text-white">Let&apos;s talk about what you need.</h2>
        </div>
        <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-200">
          Get in touch <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
