import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HIDDEN CLAW — Solana Market Intelligence",
    template: "%s · HIDDEN CLAW",
  },
  description:
    "Solana intelligence terminal. Watch Pump.fun launches, deployer wallets, curves, and signals before the crowd. Intelligence first. Execution optional.",
  keywords: ["Solana", "Pump.fun", "market intelligence", "memecoin", "on-chain", "HIDDEN CLAW"],
  openGraph: {
    title: "HIDDEN CLAW — Solana Market Intelligence",
    description: "Watch launches, wallets, and curves before the crowd. Evidence over prediction.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)]">{children}</body>
    </html>
  );
}
