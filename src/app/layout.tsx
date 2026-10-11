import type { Metadata, Viewport } from "next";

import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";

import "./globals.css";

import { SiteChrome } from "@/components/chrome/SiteChrome";

const SITE_URL = "https://tahseenjaber.example";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tahseen Jaber Cold Storage & Logistics",
    template: "%s · Tahseen Jaber Cold Storage & Logistics",
  },
  description:
    "Premium cold storage and temperature-controlled logistics in Baghdad, Iraq. Precision cooling, continuous monitoring and controlled handling from arrival to delivery.",
  applicationName: "Tahseen Jaber Cold Storage & Logistics",
  keywords: [
    "cold storage Iraq",
    "cold chain Baghdad",
    "refrigerated warehouse",
    "temperature controlled logistics",
    "Tahseen Jaber",
  ],
  openGraph: {
    type: "website",
    siteName: "Tahseen Jaber Cold Storage & Logistics",
    locale: "en_US",
    title: "Tahseen Jaber Cold Storage & Logistics",
    description:
      "Precision storage. Temperature-controlled logistics. Controlled from cold to delivery.",
    images: [{ url: "/images/hero-facility.jpg", width: 1915, height: 821, alt: "Cold storage facility at night" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tahseen Jaber Cold Storage & Logistics",
    description: "Precision storage and temperature-controlled logistics in Baghdad, Iraq.",
    images: ["/images/hero-facility.jpg"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6fafd" },
    { media: "(prefers-color-scheme: dark)", color: "#050d19" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
