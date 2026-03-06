import type { Metadata } from "next";
import { CookieConsent } from "@/components/cookie-consent";
import { TrackingScripts } from "@/components/tracking-scripts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://underchozen.com"),
  title: "UnderChozen — Know your worth.",
  description:
    "Compare your salary to market data instantly. 25 roles, 18 cities, 13 industries. Get a personalized negotiation strategy to close the gap.",
  openGraph: {
    title: "UnderChozen — Are you being underpaid?",
    description:
      "Find out in 30 seconds. Compare your salary against real market data and get a data-backed negotiation strategy.",
    type: "website",
    images: ["/api/og?role=Professional&percentile=50&status=market-aligned"],
  },
  twitter: {
    card: "summary_large_image",
    title: "UnderChozen — Are you being underpaid?",
    description:
      "Find out in 30 seconds. Compare your salary against real market data.",
    images: ["/api/og?role=Professional&percentile=50&status=market-aligned"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen w-full antialiased noise-overlay">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-background focus:text-foreground focus:ring-2 focus:ring-accent/40 focus:outline-none"
        >
          Skip to main content
        </a>
        <div className="ambient-glow" />
        <CookieConsent />
        <TrackingScripts />
        <div className="relative z-10 w-full">{children}</div>
      </body>
    </html>
  );
}
