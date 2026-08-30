import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoVault — Make Carbon Count",
  description: "India's trust-first voluntary carbon credit marketplace. Access verified credits and secure escrow transactions.",
  icons: {
    icon: "/favicon.ico",
  }
};

import OrganicFlowBackground from "@/components/OrganicFlowBackground";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8FAF9] text-[#1E293B] relative">
        <AppProvider>
          {/* Continuous Organic Flow Background Canvas (Of The Oak style Lidar contours & bio-luminescence) */}
          <OrganicFlowBackground />
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
