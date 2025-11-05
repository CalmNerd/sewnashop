import type { Metadata } from "next";
import { Geist_Mono, Figtree, Pacifico, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: ["400"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const fabric = localFont({
  src: [
    {
      path: "../public/fonts/fabric/Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-fabric",
});

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/satoshi/Satoshi-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sewna - Custom Fashion Designer Platform",
  description: "Sewna is a custom fashion designer platform that allows you to create and sell your own fashion designs.",
  keywords: ["custom fashion designer", "fashion designer", "custom fashion", "fashion", "custom clothing", "clothing", "custom apparel", "apparel", "custom fashion design", "fashion design", "custom fashion apparel", "fashion apparel", "custom fashion clothing", "fashion clothing", "custom fashion design platform", "fashion design platform", "custom fashion apparel platform", "fashion apparel platform", "custom fashion clothing platform", "fashion clothing platform"],
  authors: [{ name: "Sewna", url: "https://joinsewna.com" }],
  creator: "Sewna",
  publisher: "Sewna",
  openGraph: {
    title: "Sewna - custom fashion designer platform",
    description: "Sewna is a custom fashion designer platform that allows you to create and sell your own fashion designs.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} ${figtree.className} ${satoshi.variable} ${pacifico.variable} ${poppins.variable} ${fabric.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
