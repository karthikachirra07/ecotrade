import type { Metadata, Viewport } from "next";
import { Nunito, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/header";
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

import { Providers } from "@/components/providers";

export default function RootLayout({ children }: any) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}


export const metadata: Metadata = {
  title: "EcoTrade - Farm to Consumer Marketplace",
  description:
    "Connect directly with local farmers. Buy fresh, organic produce while reducing your carbon footprint. Transparent pricing, eco-friendly delivery.",
  generator: "v0.app",
  keywords: [
    "organic food",
    "local farmers",
    "farm to table",
    "sustainable shopping",
    "eco-friendly",
    "carbon footprint",
    "organic produce",
    "farmers market online",
  ],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2D6A4F",
};



