import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      className={`${plusJakartaSans.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F6F9F8] text-[#0F172A] relative font-sans selection:bg-emerald-500/20 selection:text-emerald-900">
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
