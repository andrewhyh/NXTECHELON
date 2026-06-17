import type { Metadata } from "next";
import { Source_Serif_4, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif-brand",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans-brand",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-brand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NXTECHELON — AI systems, shipped.",
  description:
    "An AI build studio for operators with judgment and no time. We architect, ship, and hand over the systems that move your business — with runbooks, not handwaving.",
  metadataBase: new URL("https://nxtechelon.com"),
  openGraph: {
    title: "NXTECHELON — AI systems, shipped.",
    description:
      "An AI build studio for operators with judgment and no time.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
