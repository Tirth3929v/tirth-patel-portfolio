import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { CommandPalette } from "@/components/navigation/CommandPalette";
import { ScrollRestorationManager } from "@/components/navigation/ScrollRestorationManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tirth Patel | AI Engineer & Python Developer",
  description:
    "Production AI systems, applied machine learning pipelines, multi-agent frameworks, and 100 Days Python Lab by Tirth Patel. Built for engineering teams and graduate Computer Science / AI admissions.",
  keywords: [
    "Tirth Patel",
    "AI Engineer",
    "Python Developer",
    "Machine Learning",
    "FastAPI",
    "Next.js",
    "Scikit-Learn",
    "Multi-Agent AI",
    "BCA Graduate",
    "Master's AI Portfolio",
  ],
  authors: [{ name: "Tirth Patel" }],
  openGraph: {
    title: "Tirth Patel | AI Engineer & Python Developer",
    description:
      "Production-quality personal portfolio presenting machine learning systems, multi-agent architectures, 100 Days of Python Lab, and Master's research preparation.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tirth Patel | AI Engineer & Python Developer",
    description:
      "Production AI systems, applied machine learning pipelines, and 100 Days Python Lab by Tirth Patel.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200 selection:bg-cyan-500/20 selection:text-cyan-400"
      >
        <ThemeProvider>
          <ScrollRestorationManager />
          <Navbar />
          <CommandPalette />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
