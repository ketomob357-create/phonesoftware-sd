import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "سوفت وير الهواتف SD | Phone Software Tools - أفضل أدوات صيانة الهواتف في السودان",
  description: "متجر متخصص في بيع أدوات السوفت وير للهواتف - Unlock Tool, Chimera, Z3X, Octoplus وأكثر من 25 أداة احترافية بأسعار منافسة. تصميم المهندس محمد عبدالقادر أحمد",
  keywords: ["سوفت وير", "هواتف", "أدوات", "صيانة", "فك قفل", "Unlock Tool", "Chimera", "Z3X", "software", "phone", "tools", "السودان"],
  authors: [{ name: "المهندس محمد عبدالقادر أحمد" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "سوفت وير الهواتف SD | Phone Software Tools",
    description: "أفضل أدوات السوفت وير لصيانة الهواتف في السودان - أكثر من 25 أداة احترافية",
    type: "website",
    images: ["/og-image.png"],
    locale: "ar_SD",
  },
  twitter: {
    card: "summary_large_image",
    title: "سوفت وير الهواتف SD",
    description: "أفضل أدوات السوفت وير لصيانة الهواتف في السودان",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
