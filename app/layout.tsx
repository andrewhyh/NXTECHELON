import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

/**
 * Two-family pairing, chosen for "warm authority" — the demeanour of a good
 * local professional who is genuinely glad you called and also obviously knows
 * the work. Not the aloof editorial register the site shipped with.
 *
 *   Display → Bricolage Grotesque. A humanist grotesque with deliberate
 *     irregularity in its terminals and a condensed, sign-painted build. It
 *     reads like good shopfront lettering: warm and human at a glance, sturdy
 *     and unfussy at weight. Carries authority without formality.
 *
 *   Body → Hanken Grotesk. Smooth, even, and quiet enough to recede behind the
 *     display face. The pairing sits on a real contrast axis (idiosyncratic
 *     display vs. neutral text), not two lookalike grotesques.
 *
 * No mono ships on this surface. The previous build rebound `font-mono` to
 * Hanken and used it for tracked-uppercase kickers above every section — the
 * single loudest "AI made this" tell on the page. Both are gone.
 */
const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans-brand",
  display: "swap",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-display-brand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NXTECHELON — AI that actually gets built, for Atlanta businesses",
  description:
    "Most small businesses are falling behind on AI while bigger companies pull ahead. We build the practical tools — lead follow-up, booking, quoting, answers — that give you the hours back. Atlanta and remote.",
  metadataBase: new URL("https://nextechelon.site"),
  openGraph: {
    title: "NXTECHELON — AI that actually gets built",
    description:
      "Practical AI systems for small and mid-sized businesses. Atlanta and remote.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* No <noscript> shim any more. The page previously needed one because
       framer-motion serialised `opacity: 0` at SSR and only cleared it after
       hydration. Nothing gates content on JS now: reveals are CSS view()
       timelines that default to visible, and every booking CTA is a real <a>
       to Cal.com that the dialog merely intercepts. The page is readable and
       actionable with JS off, so there's nothing left to shim. */
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
