import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

const contactItems = [
  { icon: Mail, text: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, text: profile.phonePrimary, href: "tel:+252634877968" },
  { icon: MapPin, text: profile.location, href: "/contact" },
  {
    icon: BriefcaseBusiness,
    text: "LinkedIn · Professional profile",
    href: "https://www.linkedin.com/in/salman-hussein-187287396",
  },
];

export default function PortfolioHome() {
  return (
    <section className="portfolio-hero page-enter warm-card relative isolate min-h-[min(760px,calc(100svh-210px))] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_35px_110px_rgba(0,0,0,0.42)] sm:rounded-[34px]">
      <div className="portfolio-hero-backdrop absolute inset-0 -z-10" />
      <div className="absolute -right-4 top-[8%] -z-10 h-[66%] w-[56%] rounded-full warm-portrait-glow sm:right-[4%] sm:w-[48%]" />
      <div className="portfolio-hero-bottom-fade absolute inset-x-0 bottom-0 -z-10 h-40" />

      <div className="absolute inset-y-0 right-0 -z-10 w-[65%] sm:w-[59%]">
        <Image
          src={profile.portrait}
          alt={`Portrait of ${profile.fullName}`}
          fill
          priority
          sizes="(max-width: 640px) 65vw, 59vw"
          className="object-contain object-bottom opacity-95"
        />
        <div className="portfolio-portrait-fade absolute inset-0" />
        <div className="portfolio-portrait-bottom-fade absolute inset-x-0 bottom-0 h-1/4" />
      </div>

      <div className="relative flex min-h-[min(760px,calc(100svh-210px))] flex-col justify-between p-6 sm:p-10 lg:p-14">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] text-white/75 backdrop-blur">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
            Open to work
          </span>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-sky-400 px-3 py-2.5 text-xs font-semibold text-[#17334a] shadow-lg shadow-sky-950/15 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:px-5 sm:py-3 sm:text-sm"
          >
            Hire Me <ArrowRight size={15} />
          </Link>
        </div>

        <div className="portfolio-hero-copy max-w-[680px] shrink-0 pb-8 pt-10 sm:pt-12">
          <p className="mb-4 text-sm font-semibold tracking-wide text-sky-300 sm:text-base">
            Sales &amp; Business Manager
          </p>
          <h1 aria-label="Salman Abdikarim Hussein" className="portfolio-hero-name max-w-[680px] text-[clamp(2.3rem,12vw,7.375rem)] leading-[0.86] font-extrabold tracking-[-0.08em] text-white uppercase">
            Salman
            <span className="mt-2 block">Abdikarim</span>
          </h1>
          <p className="mt-6 max-w-[410px] text-sm leading-7 text-white/65 sm:text-base">
            Commercial leadership grounded in ICT, digital marketing, and practical technical experience.
          </p>

          <div className="mt-7 grid max-w-[500px] gap-x-7 gap-y-3 sm:grid-cols-2">
            {contactItems.map(({ icon: Icon, text, href }) => (
              <a
                key={text}
                href={href}
                className="inline-flex min-w-0 items-center gap-2 text-xs text-white/75 transition hover:text-sky-200 sm:text-[13px]"
              >
                <Icon size={15} className="shrink-0 text-sky-300" />
                <span className="truncate">{text}</span>
              </a>
            ))}
          </div>
          <Link href="/summary" className="mt-7 inline-flex items-center gap-2 text-xs font-semibold text-sky-300 transition hover:text-sky-200 sm:text-sm">
            More about me <ArrowRight size={15} />
          </Link>
        </div>
      </div>
      <span className="sr-only">{profile.headline}</span>
    </section>
  );
}
