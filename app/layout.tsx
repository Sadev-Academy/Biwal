import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "@/components/providers/session-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Biwal | Premium Sustainable Essentials",
  description: "Experience the ultimate in comfort and sustainability with Biwal's premium clothing collection. Minimalist designs for a modern lifestyle.",
  keywords: ["sustainable fashion", "minimalist clothing", "premium essentials", "eco-friendly apparel"],
  openGraph: {
    title: "Biwal | Premium Sustainable Essentials",
    description: "Experience the ultimate in comfort and sustainability with Biwal's premium clothing collection.",
    url: "https://biwal-demo.vercel.app",
    siteName: "Biwal",
    images: [
      {
        url: "/biwal_hero_image.png",
        width: 1200,
        height: 630,
        alt: "Biwal Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#212121]">
        <SessionProvider>
          <Toaster position="bottom-right" />
          <Navbar />
          <CartDrawer />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </SessionProvider>
      </body>
    </html>
  );
}
