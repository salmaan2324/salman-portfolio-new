"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import {
  Award,
  Briefcase,
  Clapperboard,
  Code2,
  CheckCircle,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Monitor,
  Moon,
  PanelsTopLeft,
  Phone,
  Send,
  Shield,
  Sun,
  TrendingUp,
} from "lucide-react";

const emailAddress = "Hzalmaan@gmail.com";
const contactLinks = [
  {
    label: "Email",
    detail: emailAddress,
    href: `mailto:${emailAddress}`,
    icon: Mail,
    external: false,
  },
  {
    label: "WhatsApp",
    detail: "+252 634877968",
    href: "https://wa.me/252634877968",
    icon: Send,
    external: true,
  },
  {
    label: "Facebook",
    detail: "Visit my profile",
    href: "https://www.facebook.com/share/1A1vPxVEmP/?mibextid=wwXIfr",
    icon: Award,
    external: true,
  },
  {
    label: "Instagram",
    detail: "Visit my profile",
    href: "https://www.instagram.com/zalmn021?hvrq=cHRzMGR1b3B2dmd3&utm_source=qr",
    icon: Monitor,
    external: true,
  },
  {
    label: "LinkedIn",
    detail: "Visit my profile",
    href: "https://www.linkedin.com/in/salman-hussein-187287396?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    icon: Briefcase,
    external: true,
  },
];
const navigation = [
  ["HOME", "home"],
  ["PORTFOLIO", "portfolio"],
  ["SERVICES", "services"],
  ["SOLUTIONS", "solutions"],
  ["RESUME", "experience"],
  ["SKILLS", "skills"],
  ["CONTACT", "contact"],
] as const;

export default function PortfolioHome() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copyError, setCopyError] = useState("");

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  }

  async function handleCopyEmail() {
    if (!navigator.clipboard) {
      setCopyError("Copy is unavailable in this browser. Email: " + emailAddress);
      return;
    }

    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopiedEmail(true);
      setCopyError("");
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopyError("Could not copy the email address. You can email " + emailAddress);
    }
  }

  function handleSendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const senderEmail = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !senderEmail || !message) return;

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${senderEmail}\n\n${message}`,
    );
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  }

  return (
    <div
      id="portfolio-theme"
      data-theme={theme}
      className="portfolio-theme min-h-screen bg-[#070b14] font-sans text-slate-100 selection:bg-cyan-500 selection:text-black"
    >
      <header id="home" className="no-print sticky top-0 z-50 border-b border-slate-800/80 bg-[#070b14]/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#home" className="text-xl font-bold tracking-wider text-white">
            SALMAN ABDIKARIM
          </a>
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-8 text-sm font-medium text-slate-400 md:flex"
          >
            {navigation.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="py-2 transition-colors hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              aria-pressed={theme === "light"}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="theme-toggle relative flex h-10 w-[76px] shrink-0 cursor-pointer items-center justify-between rounded-full border border-slate-700 bg-slate-900 px-2.5 text-slate-300 transition-colors duration-300 hover:border-cyan-400/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              <Sun
                size={16}
                aria-hidden="true"
                className={`relative z-10 ${theme === "light" ? "text-slate-500" : "text-slate-950"}`}
              />
              <Moon
                size={16}
                aria-hidden="true"
                className={`relative z-10 ${theme === "dark" ? "text-slate-500" : "text-slate-950"}`}
              />
              <span
                className={`theme-toggle-thumb absolute top-1 left-1 h-8 w-8 rounded-full bg-cyan-400 shadow-md shadow-cyan-500/30 transition-transform duration-300 ${
                  theme === "light" ? "translate-x-[34px]" : "translate-x-0"
                }`}
              />
            </button>
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-400/20 transition-all hover:bg-cyan-300"
            >
              <Send size={15} /> HIRE ME
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-6 py-10 lg:grid-cols-12">
        <aside className="relative space-y-6 rounded-3xl border border-slate-800/80 bg-[#0c1222] p-6 shadow-2xl lg:sticky lg:top-28 lg:col-span-4">
          <div className="flex flex-col items-center border-b border-slate-800/80 pb-6 text-center">
            <h2 className="text-xl font-bold text-white">Salman A. Hussein</h2>
            <p className="mt-1 text-xs font-semibold tracking-wider text-cyan-300 uppercase">
              Sales Manager &amp; Business Manager
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-[11px] font-medium text-slate-100">
              <span>ICT GRADUATE</span> • <span>MARKETING</span> •{" "}
              <span>CCTV &amp; SECURITY</span>
            </div>
          </div>

          <div className="space-y-3 border-b border-slate-800/80 pb-6">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-100 transition-all hover:border-cyan-500/50 hover:text-cyan-300"
            >
              <Mail size={15} className="text-cyan-400" />
              {copiedEmail ? "Email Copied!" : emailAddress}
            </button>
            {copyError && (
              <p role="status" className="text-center text-xs text-amber-300">
                {copyError}
              </p>
            )}
            <a
              href="tel:+252634877968"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-100"
            >
              <Phone size={15} className="text-cyan-400" /> +252 634877968
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:opacity-90"
            >
              <Download size={16} /> SAVE CV AS PDF
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-semibold text-slate-300">RESIDENCE:</span>
              <span>Burao, Somaliland</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-semibold text-slate-300">NATIONALITY:</span>
              <span>Somali</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-semibold text-slate-300">GENDER / DOB:</span>
              <span>Male / August 22, 2000</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-semibold text-slate-300">LICENSE:</span>
              <span>Valid Driver&apos;s License</span>
            </div>
          </div>
        </aside>

        <main className="space-y-8 lg:col-span-8">
          <section
            id="portfolio"
            className="relative isolate min-h-[480px] overflow-hidden rounded-[2rem] border border-sky-400/20 bg-[#080e19] shadow-2xl shadow-sky-950/30 sm:min-h-[520px]"
          >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_74%_20%,rgba(14,165,233,0.28),transparent_42%),radial-gradient(ellipse_at_6%_84%,rgba(37,99,235,0.2),transparent_44%),linear-gradient(115deg,#070b13_8%,#0b1421_58%,#101927)]" />
            <div className="absolute top-0 left-0 h-32 w-32 border-t border-l border-sky-400/40" />
            <div className="absolute top-0 right-0 h-32 w-32 border-t border-r border-sky-400/40" />
            <div className="absolute right-0 bottom-0 h-32 w-32 border-r border-b border-sky-400/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080e19] via-[#080e19]/95 to-[#080e19]/15" />
            <div className="absolute right-0 bottom-0 top-0 w-[58%]">
              <Image
                src="/images/salman-portrait.png"
                alt="Salman Abdikarim Hussein wearing a fedora"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-contain object-bottom opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#080e19] via-[#080e19]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#080e19] to-transparent" />
            </div>

            <div className="relative z-10 flex min-h-[480px] items-center p-7 sm:min-h-[520px] sm:p-10 lg:p-12">
              <div className="max-w-[62%] space-y-6 sm:max-w-[58%]">
                <div>
                  <h1 className="leading-[0.98] font-black tracking-tight text-white">
                    <span className="mb-2 block text-xs font-medium tracking-[0.25em] text-slate-300 uppercase sm:text-sm">
                      Welcome to my
                    </span>
                    <span className="block text-4xl sm:text-5xl lg:text-6xl">
                      PORTFOLIO
                    </span>
                  </h1>
                  <div className="mt-4 h-1 w-32 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 shadow-lg shadow-sky-500/40" />
                </div>
                <div className="space-y-2 border-l-2 border-sky-400/70 pl-4">
                  <h2 className="text-base leading-tight font-extrabold tracking-tight text-white sm:text-xl lg:text-2xl">
                    SALMAN ABDIKARIM HUSSEIN
                  </h2>
                  <p className="text-[10px] leading-relaxed font-semibold tracking-[0.14em] text-cyan-200 uppercase sm:text-xs sm:tracking-[0.18em]">
                    Sales Manager - Business Manager - ICT
                  </p>
                </div>
                <div className="space-y-2 pt-2 text-xs text-slate-200 sm:text-sm">
                  <p className="flex items-center gap-2">
                    <Phone size={15} className="shrink-0 text-cyan-300" />
                    <a href="tel:+252634877968" className="hover:text-cyan-200">
                      +252 634877968
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={15} className="shrink-0 text-cyan-300" />
                    Burao, Somaliland
                  </p>
                  <p className="flex items-center gap-2 break-all">
                    <Mail size={15} className="shrink-0 text-cyan-300" />
                    <a
                      href={`mailto:${emailAddress}`}
                      className="hover:text-cyan-200"
                    >
                      {emailAddress}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="services" className="space-y-7 py-2">
            <div className="grid gap-4 border-b border-slate-800/80 pb-6 md:grid-cols-[1.1fr_0.9fr] md:items-end">
              <h2 className="max-w-xl text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl">
                Design that feels simple and intentional.
              </h2>
              <p className="text-sm leading-relaxed text-slate-300 md:pb-1">
                I help businesses and leaders communicate with clarity through
                refined visuals, professional strategy, and modern execution.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <ServiceCard
                icon={<Award size={21} />}
                number="01"
                title="Brand Identity / Marketing"
                description="Build a distinctive, consistent brand and turn its story into focused marketing that connects with the right audience."
                tags={["Brand direction", "Campaigns"]}
              />
              <ServiceCard
                icon={<Briefcase size={21} />}
                number="02"
                title="Web & Sales Management"
                description="Bring digital experiences and sales operations together to support customer relationships and measurable business growth."
                tags={["Sales strategy", "Digital presence"]}
              />
              <ServiceCard
                icon={<Monitor size={21} />}
                number="03"
                title="Motion & Content / Graphic Design"
                description="Create polished visual content, graphics, and motion-led assets that make complex messages clear and memorable."
                tags={["Visual content", "Graphic design"]}
              />
            </div>
          </section>

          <section id="solutions" className="space-y-7 py-2">
            <div className="flex flex-col justify-between gap-3 border-b border-slate-800/80 pb-5 sm:flex-row sm:items-end">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase">
                  What I deliver
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Comprehensive Solutions
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-300">
                Creative, technical, and strategic services to help your business
                make a confident impression.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <SolutionCard
                icon={<Clapperboard size={21} />}
                number="01"
                title="Multimedia Production"
                offerings={["Graphic Design", "Video Editing", "Motion Graphics"]}
              />
              <SolutionCard
                icon={<PanelsTopLeft size={21} />}
                number="02"
                title="UI/UX & Presentation"
                offerings={["UI Design", "UX Experience", "Presentation Design"]}
              />
              <SolutionCard
                icon={<Code2 size={21} />}
                number="03"
                title="Websites & Systems"
                offerings={["Websites", "Custom Systems", "Frontend Architecture"]}
              />
            </div>
          </section>

          <section id="experience" className="space-y-6">
            <SectionHeading icon={<Briefcase />} title="Work Experience & Internships" />
            <div className="space-y-6">
              <ExperienceCard
                title="Sales Manager"
                dates="Feb 2024 - Present"
                company="ISRC Construction & Contracting Company, Burao"
                responsibilities={[
                  "Built and maintained professional relationships with clients, developers, and property owners.",
                  "Supported contract discussions and helped clarify client requirements and project scope.",
                  "Contributed to sales planning and promotion of construction services.",
                  "Coordinated with technical and project teams on proposals, cost estimates, and client presentations.",
                ]}
              />
              <ExperienceCard
                title="Online Marketer"
                dates="Mar 2022 - Jul 2023"
                company="Haqabtire Technology, Burao"
                responsibilities={[
                  "Managed social media channels to improve online visibility and audience engagement.",
                  "Created promotional graphics and digital content using Adobe Photoshop.",
                  "Supported online marketing campaigns for electronics and technology products.",
                ]}
              />
              <ExperienceCard
                title="Network Technician Trainee (Internship)"
                dates="Aug 2023 - Dec 2023"
                company="Dahabshiil Group (Bluekom Telecommunication Company), Burao"
                responsibilities={[
                  "Assisted with internet installation for homes and offices.",
                  "Installed and configured network equipment under supervision.",
                  "Supported server-room operations and basic maintenance.",
                ]}
              />
            </div>
          </section>

          <section id="education" className="space-y-6">
            <SectionHeading icon={<GraduationCap />} title="Education" />
            <article className="space-y-2 rounded-2xl border border-slate-800/80 bg-[#0c1222] p-6 shadow-xl">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-lg font-bold text-white">
                  Bachelor of Science in ICT
                </h3>
                <span className="font-mono text-xs text-cyan-400">
                  Oct 2017 - Sep 2021
                </span>
              </div>
              <p className="text-xs font-medium text-cyan-400">
                University of Burao, Burao
              </p>
              <p className="text-xs leading-relaxed text-slate-300">
                Coursework and practical learning included computing, digital
                technologies, network administration, system analysis,
                troubleshooting, and database management.
              </p>
            </article>
          </section>

          <section id="skills" className="space-y-6">
            <SectionHeading icon={<Award />} title="Core Skills & Capabilities" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SkillCard
                icon={<TrendingUp size={16} />}
                title="Sales & Marketing"
                description="Sales support, client negotiation, social media management, and online product promotion."
              />
              <SkillCard
                icon={<Monitor size={16} />}
                title="Design & Digital"
                description="Graphic design using Adobe Photoshop, content creation, and e-commerce platform support."
              />
              <SkillCard
                icon={<Shield size={16} />}
                title="ICT & Support"
                description="Network equipment configuration, troubleshooting, and technical assistance."
              />
              <SkillCard
                icon={<CheckCircle size={16} />}
                title="Management"
                description="Customer relationship management (CRM), organization, task coordination, and teamwork."
              />
            </div>
          </section>

          <section id="contact" className="space-y-6 pt-4">
            <SectionHeading icon={<Mail />} title="Get In Touch / Send Message" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {contactLinks.map(({ label, detail, href, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="contact-channel-card group flex min-w-0 items-center gap-4 rounded-2xl border border-slate-800/80 bg-[#0c1222] p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-cyan-950/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                >
                  <span className="contact-channel-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 transition-colors duration-300 group-hover:bg-cyan-400/20">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-white">
                      {label}
                    </span>
                    <span className="mt-1 block break-all text-xs text-slate-300 transition-colors group-hover:text-cyan-200">
                      {detail}
                    </span>
                  </span>
                </a>
              ))}
            </div>
            <form
              onSubmit={handleSendMessage}
              className="space-y-4 rounded-3xl border border-slate-800/80 bg-[#0c1222] p-6 shadow-xl md:p-8"
            >
              <p className="text-xs leading-relaxed text-slate-400">
                Submitting opens your email app with the message filled in; review
                and send it there.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1 block text-xs font-semibold text-slate-300"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1 block text-xs font-semibold text-slate-300"
                  >
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={emailAddress}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1 block text-xs font-semibold text-slate-300"
                >
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Write your message or job inquiry here..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-cyan-400 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-400/20 transition-all hover:bg-cyan-300"
              >
                <Send size={15} /> SEND MESSAGE TO SALMAN
              </button>
            </form>
          </section>
        </main>
      </div>

      <footer className="mt-20 border-t border-slate-800/80 bg-[#070b14] py-8 text-center text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <p>© {new Date().getFullYear()} Salman Abdikarim Hussein. All Rights Reserved.</p>
          <p className="font-medium text-cyan-400">
            Professional Executive CV &amp; Portfolio
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-slate-800/80 pb-4">
      <span className="text-cyan-400">{icon}</span>
      <h2 className="text-xl font-bold tracking-wide text-white">{title}</h2>
    </div>
  );
}

function ExperienceCard({
  title,
  dates,
  company,
  responsibilities,
}: {
  title: string;
  dates: string;
  company: string;
  responsibilities: string[];
}) {
  return (
    <article className="space-y-3 rounded-2xl border border-slate-800/80 bg-[#0c1222] p-6 shadow-xl">
      <div className="flex flex-col items-start justify-between gap-1 sm:flex-row sm:items-center">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
          {dates}
        </span>
      </div>
      <p className="text-xs font-medium text-cyan-400">{company}</p>
      <ul className="list-inside list-disc space-y-1.5 text-xs leading-relaxed text-slate-300">
        {responsibilities.map((responsibility) => (
          <li key={responsibility}>{responsibility}</li>
        ))}
      </ul>
    </article>
  );
}

function SkillCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="space-y-2 rounded-2xl border border-slate-800/80 bg-[#0c1222] p-5">
      <h3 className="flex items-center gap-2 text-sm font-bold text-white">
        <span className="text-cyan-400">{icon}</span> {title}
      </h3>
      <p className="text-xs text-slate-400">{description}</p>
    </article>
  );
}

function ServiceCard({
  icon,
  number,
  title,
  description,
  tags,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
  tags: string[];
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0c1222] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-cyan-950/20">
      <div className="absolute -top-14 -right-14 h-36 w-36 rounded-full bg-cyan-400/5 blur-3xl transition-colors duration-300 group-hover:bg-cyan-400/10" />
      <div className="relative flex items-start justify-between">
        <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-300">
          {icon}
        </div>
        <span className="font-mono text-xs tracking-widest text-slate-500">
          {number}
        </span>
      </div>
      <h3 className="relative mt-6 text-lg leading-snug font-semibold text-white">
        {title}
      </h3>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-slate-300">
        {description}
      </p>
      <div className="relative mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1 text-[11px] font-medium text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

function SolutionCard({
  icon,
  number,
  title,
  offerings,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  offerings: string[];
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0c1222] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-cyan-950/20">
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl transition-colors group-hover:bg-cyan-400/10" />
      <div className="relative flex items-center justify-between">
        <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-300">
          {icon}
        </div>
        <span className="font-mono text-xs tracking-widest text-slate-500">
          {number}
        </span>
      </div>
      <h3 className="relative mt-6 text-lg font-semibold text-white">{title}</h3>
      <ul className="relative mt-4 space-y-3">
        {offerings.map((offering) => (
          <li
            key={offering}
            className="flex items-center gap-3 text-sm text-slate-300"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
            {offering}
          </li>
        ))}
      </ul>
    </article>
  );
}
