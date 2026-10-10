import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
});

const title = "WebPoint – Akvizičný systém, ktorý vám prináša zákazníkov";
const description =
  "Reklamy na sociálnych sieťach, web na mieru, CRM s automatickými e-mailmi a organický obsah v jednom systéme. Plníme kalendáre firmám, ktoré ponúkajú služby.";

export const metadata: Metadata = {
  metadataBase: new URL("https://webpointsk.com"),
  title,
  description,
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: "/",
    siteName: "WebPoint",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sk" className={`${jakarta.variable} ${instrument.variable} antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
