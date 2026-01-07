import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { thTH } from "@clerk/localizations";
import { Toaster } from "@/components/ui/sonner";
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
  title: "Nail Salon | ร้านทำเล็บ จองคิวออนไลน์",
  description: "ระบบจองคิวทำเล็บออนไลน์ บริการทำเล็บมืออาชีพ ดีไซน์สวยทันสมัย การันตีความพึงพอใจ",
  keywords: ["nail salon", "ทำเล็บ", "จองคิว", "ร้านทำเล็บ", "manicure", "pedicure"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={thTH}>
      <html lang="th" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen`}
        >
          {children}
          <Toaster position="top-right" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
