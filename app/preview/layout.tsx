import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "../globals.css";
import "./preview.css";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Preview - Thousand Madleens",
  description: "Preview mode",
};

export default function PreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
