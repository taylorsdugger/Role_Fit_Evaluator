import type { Metadata } from "next";
import { Geist } from "next/font/google";
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
        className={`${geistSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <InitColorSchemeScript attribute="class" defaultMode="dark" />
        <CSPostHogProvider>
          <ThemeRegistry>
            <SpeedInsights />
            <Layout>{children}</Layout>
          </ThemeRegistry>
        </CSPostHogProvider>
      </body>
    </html>
  );
}
