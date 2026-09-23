import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "@/components/providers/SessionProvider";
import "./globals.css";

const fraunces = localFont({
  variable: "--font-fraunces",
  src: [
    { path: "../fonts/fraunces-normal.woff2", weight: "500 700", style: "normal" },
    { path: "../fonts/fraunces-italic.woff2", weight: "500 700", style: "italic" },
  ],
  display: "swap",
});

const inter = localFont({
  variable: "--font-inter",
  src: [{ path: "../fonts/inter-normal.woff2", weight: "400 600", style: "normal" }],
  display: "swap",
});

const title = "CUTLY Barbershop | Modern Grooming, Premium Cuts";
const description =
  "CUTLY is a modern barbershop experience — expert barbers, premium grooming services, easy online booking, and an AI assistant ready to answer your questions anytime.";

export const metadata: Metadata = {
  metadataBase: new URL("https://cutly-barbershop.vercel.app"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    siteName: "CUTLY Barbershop",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
