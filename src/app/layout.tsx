import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chittety Construction | Construction Materials, Procurement & Vendor Solutions",
  description:
    "Trusted sourcing, construction materials, vendor partnerships and project support for residential, commercial, industrial and infrastructure projects across Dallas–Fort Worth and beyond.",
  keywords: [
    "construction materials",
    "wholesale supply",
    "vendor sourcing",
    "project procurement",
    "Dallas Fort Worth",
    "Texas construction",
    "plumbing supplies",
    "electrical supplies",
    "building materials",
  ],
  authors: [{ name: "Chittety Construction" }],
  openGraph: {
    title: "Chittety Construction | Construction Materials & Procurement",
    description:
      "Trusted sourcing, construction materials, vendor partnerships and project support across Texas.",
    siteName: "Chittety Construction",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chittety Construction",
    description:
      "Construction materials, wholesale supply, and project procurement solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${manrope.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}