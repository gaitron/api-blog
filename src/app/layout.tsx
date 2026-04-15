import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog API - REST CRUD API for Blog/Forum",
  description: "A complete REST CRUD API for blog/forum posts built with Next.js, TypeScript, and MongoDB. Features full documentation with Swagger UI.",
  keywords: ["blog", "forum", "api", "rest", "crud", "nextjs", "typescript", "mongodb", "swagger"],
  authors: [{ name: "Blog API Team" }],
  creator: "Blog API",
  publisher: "Blog API",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://blog-api.example.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Blog API - REST CRUD API for Blog/Forum",
    description: "A complete REST CRUD API for blog/forum posts built with Next.js, TypeScript, and MongoDB.",
    url: "https://blog-api.example.com",
    siteName: "Blog API",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog API - REST CRUD API for Blog/Forum",
    description: "A complete REST CRUD API for blog/forum posts built with Next.js, TypeScript, and MongoDB.",
    creator: "@blogapi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
