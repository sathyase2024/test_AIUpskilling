import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

/* -------------------------------------------------------
   Font loading — self-hosted via next/font/google
   Inter        : primary sans-serif for body/UI text
   Fira Code    : monospace for code blocks & labels
------------------------------------------------------- */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

/* -------------------------------------------------------
   Static metadata
------------------------------------------------------- */
export const metadata: Metadata = {
  title: {
    default: "SkillVeris — Personalized Upskilling Platform",
    template: "%s | SkillVeris",
  },
  description:
    "SkillVeris, powered by Sri Hayavadhana, is an AI-powered personalized upskilling platform that crafts custom learning paths in programming, cloud, AI/ML, and more — tailored to your career goals and learning style.",
  keywords: [
    "AI learning",
    "personalized upskilling",
    "career paths",
    "programming courses",
    "machine learning",
    "full stack development",
    "DevOps",
    "cloud computing",
    "skill development",
    "SkillVeris",
  ],
  authors: [{ name: "SkillVeris Team" }],
  creator: "SkillVeris",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "SkillVeris — Personalized Upskilling Platform",
    description:
      "AI-powered learning paths tailored to your career goals. Master programming, cloud, AI/ML, and more.",
    siteName: "SkillVeris",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillVeris — Personalized Upskilling Platform",
    description:
      "AI-powered learning paths tailored to your career goals. Master programming, cloud, AI/ML, and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* -------------------------------------------------------
   Root layout
------------------------------------------------------- */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${firaCode.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col relative">

        {/*
          Fixed full-screen ambient background layers.
          These sit behind all page content via z-index layering.
        */}

        {/* Base dark gradient */}
        <div
          className="fixed inset-0 -z-30"
          style={{
            background:
              "radial-gradient(ellipse 120% 80% at 50% -10%, rgba(124,58,237,0.18) 0%, transparent 60%), #0a0a0f",
          }}
          aria-hidden="true"
        />

        {/* Subtle grid overlay */}
        <div
          className="fixed inset-0 -z-20 bg-grid opacity-60"
          aria-hidden="true"
        />

        {/* Ambient purple orb — top-left */}
        <div
          className="fixed -top-32 -left-32 -z-10 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          aria-hidden="true"
        />

        {/* Ambient cyan orb — bottom-right */}
        <div
          className="fixed -bottom-32 -right-32 -z-10 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          aria-hidden="true"
        />

        {/* Ambient accent orb — top-right */}
        <div
          className="fixed top-1/3 -right-40 -z-10 h-[400px] w-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          aria-hidden="true"
        />

        {/* Page content */}
        {children}

      </body>
    </html>
  );
}
