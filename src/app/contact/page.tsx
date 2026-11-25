import { ArrowDownToLine, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { profile, socialLinks } from "@/lib/portfolio-data";

const directLinks = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phonePrimary, href: "tel:+252634877968" },
  { icon: Phone, label: "Alternative phone", value: profile.phoneSecondary, href: "tel:+252659112232" },
  { icon: MapPin, label: "Location", value: profile.location, href: null },
];

export default function ContactPage() {
  return (
    <div className="page-enter space-y-6">
      <header className="warm-card rounded-[28px] border border-white/10 p-7 sm:p-10">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-sky-300 uppercase">04 / Direct contact</p>
        <h1 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">Let&apos;s connect.</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
          For opportunities, business inquiries, or collaborations, reach me through any of the channels below.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <section aria-label="Direct contact information" className="rounded-[25px] border border-white/10 bg-[#1b2b39]/85 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white">Contact details</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {directLinks.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-sky-300/20 bg-sky-300/10 text-sky-300">
                    <Icon size={17} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-medium tracking-wide text-white/40 uppercase">{label}</span>
                    <span className="mt-1 block truncate text-sm font-medium text-white/85">{value}</span>
                  </span>
                </>
              );
              return href ? (
                <a key={label} href={href} className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.08] bg-black/20 p-4 transition hover:border-sky-300/30">
                  {content}
                </a>
              ) : (
                <div key={label} className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.08] bg-black/20 p-4">
                  {content}
                </div>
              );
            })}
          </div>
        </section>

        <section aria-label="Social profiles and CV download" className="flex flex-col rounded-[25px] border border-white/10 bg-[#1b2b39]/85 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white">Elsewhere online</h2>
          <div className="mt-4 grid gap-2">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 transition hover:border-sky-300/30"
              >
                <span>
                  <span className="block text-sm font-medium text-white/85">{item.label}</span>
                  <span className="text-xs text-white/40">{item.detail}</span>
                </span>
                <ArrowUpRight size={15} className="shrink-0 text-sky-300" />
              </a>
            ))}
          </div>
          <div className="mt-auto pt-6">
            <a
              href="/api/cv"
              download
              className="flex w-full items-center justify-center gap-2 rounded-full bg-sky-400 px-5 py-3.5 text-sm font-semibold text-[#17334a] transition hover:bg-sky-300"
            >
              <ArrowDownToLine size={17} /> Download CV
            </a>
            <p className="mt-3 text-center text-[11px] leading-5 text-white/40">Download a PDF copy of my professional profile.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
