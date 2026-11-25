"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  Home,
  Mail,
  Moon,
  Sparkles,
  Sun,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { navigation, profile } from "@/lib/portfolio-data";

const navigationIcons: Record<(typeof navigation)[number]["href"], LucideIcon> = {
  "/": Home,
  "/summary": UserRound,
  "/experience": BriefcaseBusiness,
  "/skills": Sparkles,
  "/contact": Mail,
};

export default function PortfolioNav() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("light");

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#101820]/85 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[72px] max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-7">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${profile.fullName} home`}>
            <span className="grid size-10 place-items-center rounded-full border border-sky-300/30 bg-sky-300/10 text-[11px] font-semibold tracking-wide text-sky-300">
              SA
            </span>
            <span>
              <span className="block text-xs font-semibold tracking-wide text-white sm:text-sm">SALMAN ABDIKARIM</span>
              <span className="hidden text-[10px] tracking-[0.16em] text-white/45 uppercase sm:block">Executive portfolio</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              aria-pressed={theme === "light"}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs text-white/75 transition hover:border-sky-300/30 hover:text-sky-200"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              <span className="hidden sm:inline">{theme === "dark" ? "Day mode" : "Night mode"}</span>
            </button>
          </div>
        </div>
      </header>

      <nav
        aria-label="Portfolio pages"
        className="bottom-navigation fixed inset-x-0 bottom-[calc(14px+env(safe-area-inset-bottom))] z-50 mx-auto flex w-fit max-w-[calc(100vw-20px)] items-center gap-0.5 overflow-x-auto rounded-full border border-white/10 bg-[#1d2935]/90 p-1.5 shadow-[0_12px_42px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:bottom-6 sm:gap-1 sm:p-2"
      >
        {navigation.map((item) => {
          const active = pathname === item.href;
          const Icon = navigationIcons[item.href];

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-w-[57px] shrink-0 flex-col items-center justify-center gap-1 rounded-full px-2.5 py-2 text-[10px] font-medium transition-colors sm:min-w-0 sm:flex-row sm:gap-2 sm:px-4 sm:py-2.5 sm:text-xs ${
                active ? "bg-white text-[#171313]" : "text-white/65 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
