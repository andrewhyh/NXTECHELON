import type { Metadata } from "next";
import { Hanken_Grotesk, Spectral } from "next/font/google";
import "./globals.css";

/**
 * Two-family typography (editorial pairing on a serif/sans contrast axis):
 *
 *   Display (h1 / h2 / h3, hero headline, section headers, kicker on cards)
 *     → Spectral. Modern editorial serif by Production Type. Beautifully
 *       drawn italic carries the hero's rotating-phrase signature moment.
 *
 *   Body / labels / UI
 *     → Hanken Grotesk. Friendly humanist neo-grotesque, plain at body
 *       size, recognizable as "professional" without leaning technical.
 *
 * Tailwind's `font-serif` → Spectral, `font-sans` → Hanken, `font-mono` is
 * rebound in globals.css to Hanken (we don't ship a true mono on this
 * surface; the small all-caps "kicker" treatment carries the label role).
 */
const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans-brand",
  display: "swap",
});

const serif = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif-brand",
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
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
