import "@fontsource/source-serif-4/400.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/500.css";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NXTECHELON | AI build studio",
  description:
    "NXTECHELON builds AI systems for business owners who need the work shipped, not explained.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
