import type { Metadata } from "next";
import PortfolioNav from "@/components/portfolio-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salman Abdikarim Hussein | Portfolio",
  description:
    "Explore the experience, skills, and professional profile of Salman Abdikarim Hussein.",
  icons: {
    icon: "/images/salman-profile.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className="antialiased">
        <PortfolioNav />
        <main className="mx-auto w-full max-w-[1240px] px-4 pt-7 pb-32 sm:px-7 sm:pt-10 sm:pb-36">
          {children}
        </main>
        <footer className="border-t border-white/[0.07] px-4 pt-6 pb-28 text-center text-xs text-white/40">
          © {new Date().getFullYear()} {`Salman Abdikarim Hussein`} · Professional portfolio
        </footer>
      </body>
    </html>
  );
}
