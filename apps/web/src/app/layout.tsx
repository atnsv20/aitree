import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SITE_URL } from "@/lib/api";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AI Progress Map — A Capability Index Tech Tree",
    template: "%s | AI Progress Map",
  },
  description:
    "An interactive, evidence-based tech tree tracking AI capability progress across development routes. Scores are a Capability Index, not a percentage to AGI.",
  keywords: [
    "AI progress",
    "AI tech tree",
    "Capability Index",
    "AI agents",
    "AI coding",
    "AI reasoning",
    "AI robotics",
  ],
  openGraph: {
    type: "website",
    siteName: "AI Progress Map",
    title: "AI Progress Map — A Capability Index Tech Tree",
    description:
      "Track AI capability progress across development routes with an evidence-based Capability Index.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Progress Map",
    description:
      "An evidence-based tech tree tracking AI capability progress across development routes.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
