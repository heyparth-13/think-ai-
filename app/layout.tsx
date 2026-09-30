import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://www.thinkarq.com"
  ),
  title: "Think AI | Intelligent Assistant & Digital Solutions",
  description: "Official AI Assistant for Think AI. Ask about our AI development, custom SaaS engineering, data pipelines, modern UI/UX design, and digital growth services.",
  keywords: [
    "Think AI",
    "Think AI Assistant",
    "AI Development",
    "Data Engineering",
    "SaaS Development",
    "UI/UX Design",
    "Digital Marketing",
    "Think Build Disrupt"
  ],
  authors: [{ name: "Think AI", url: "https://www.thinkarq.com" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Think AI - Think. Build. Disrupt.",
    description: "Explore Think AI's AI development, data engineering, and custom software solutions.",
    url: "https://www.thinkarq.com",
    siteName: "Think AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/thinkarq-banner.jpg",
        width: 1024,
        height: 537,
        alt: "ThinkArq - Think. Build. Disrupt.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Think AI - Think. Build. Disrupt.",
    description: "Explore Think AI's AI development, data engineering, and custom software solutions.",
    images: ["/thinkarq-banner.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} antialiased`}>
      <body className="min-h-screen bg-[#FAF9FC] dark:bg-[#0B0C16] font-sans">
        {children}
      </body>
    </html>
  );
}
