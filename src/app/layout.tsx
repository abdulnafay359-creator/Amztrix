import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components";
import { AstraBackground } from "@/components/astra-background";
import "./globals.css";
import "@/components/Brand/Brand.css";
import "@/components/Header/Header.css";
import "@/components/Footer/Footer.css";
import "@/components/AuditBanner/AuditBanner.css";
import "@/components/PageIntro/PageIntro.css";
import "@/components/ServiceGrid/ServiceGrid.css";
import "@/components/WorkGrid/WorkGrid.css";
import "@/components/Theme/Theme.css";
import "@/components/Motion/Motion.css";
import "@/components/Buttons/Buttons.css";
import "@/components/Scale/Scale.css";
import "@/components/ScrollReveal/ScrollReveal.css";

export const metadata: Metadata = {
  title: { default: "AMZTRIX | Amazon Account Management", template: "%s | AMZTRIX" },
  description: "Hands-on Amazon Seller Central management for advertising, catalog, inventory, account health, and growth.",
};

export const viewport: Viewport = {
  themeColor: "#080b08",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AstraBackground />
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main" data-astra-story>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
