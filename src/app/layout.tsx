import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";

import { getRestaurantSettings } from "@/lib/restaurant";

import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getRestaurantSettings();

  const restaurantName = settings?.restaurantName ?? "Trattoria Bella Luna";
  const description =
    settings?.description ??
    "Authentic Italian flavours, seasonal ingredients and memorable evenings in the heart of London.";

  return {
    title: `${restaurantName} | ${settings?.tagline ?? "Authentic Italian Dining in London"}`,
    description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodoni.variable} ${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}