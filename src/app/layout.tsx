import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { Layout } from "@/components/Layout";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import { CSPostHogProvider } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taylor Dugger — Senior Software Engineer",
  description: "Personal site and role fit evaluator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <InitColorSchemeScript attribute="class" defaultMode="dark" />
        <CSPostHogProvider>
          <ThemeRegistry>
            <Analytics />
            <SpeedInsights />
            <Layout>{children}</Layout>
          </ThemeRegistry>
        </CSPostHogProvider>
      </body>
    </html>
  );
}
