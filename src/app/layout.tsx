import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UnderChozen — See if you're underpaid. Fix it.",
  description:
    "Compare your salary to market data instantly. Get a personalized negotiation strategy to close the gap.",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased noise-overlay">
        <div className="ambient-glow" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
