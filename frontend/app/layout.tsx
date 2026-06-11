import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import BottomNav from "@/components/BottomNav";
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
      suppressHydrationWarning
    >
      <head>
        {/* Resolve the theme before paint: stored choice, else system preference */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('sv-theme');if(!t)t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark'}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col relative">

        {/*
          Fixed full-screen ambient background layers (theme-aware via the
          --app-bg / --app-orb-* tokens defined in globals.css).
        */}
        <div
          className="fixed inset-0 -z-30"
          style={{ background: "var(--app-bg)" }}
          aria-hidden="true"
        />
        <div
          className="fixed -top-32 -left-32 -z-10 h-[500px] w-[500px] rounded-full"
          style={{ background: "var(--app-orb-1)", filter: "blur(40px)" }}
          aria-hidden="true"
        />
        <div
          className="fixed -bottom-32 -right-32 -z-10 h-[500px] w-[500px] rounded-full"
          style={{ background: "var(--app-orb-2)", filter: "blur(40px)" }}
          aria-hidden="true"
        />

        {/* Page content */}
        {children}

        {/* Mobile bottom navigation (hidden on immersive workspaces) */}
        <BottomNav />

      </body>
    </html>
  );
}
