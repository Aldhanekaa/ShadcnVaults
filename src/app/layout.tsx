import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "shadcn Vaults – Free & Open Source UI Blocks for Next.js",
  description:
    "Explore a curated collection of free, open-source shadcn/ui blocks for Next.js and React. Instantly preview, copy, and use high-quality, accessible UI components. Anyone can contribute and help grow the library!",
  keywords: [
    "shadcn",
    "shadcn/ui",
    "UI blocks",
    "Next.js",
    "React",
    "open source",
    "free components",
    "component library",
    "community",
    "Tailwind CSS",
    "contribute",
    "frontend",
  ],
  authors: [{ name: "shadcn Vaults" }],
  creator: "shadcn Vaults",
  openGraph: {
    title: "shadcn Vaults – Free & Open Source UI Blocks for Next.js",
    description:
      "A free, open-source collection of shadcn/ui blocks and templates for Next.js & React. Preview, copy, and contribute your own components to the community.",
    url: "https://shadcn-vaults.vercel.app/",
    siteName: "shadcn Vaults",
    images: [
      {
        url: "https://shadcn-vaults.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "shadcn Vaults – Free & Open Source UI Blocks",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "shadcn Vaults – Free & Open Source UI Blocks for Next.js",
    description:
      "Discover free, open-source shadcn/ui blocks for Next.js and React. Preview, copy, and contribute to the community-driven UI library.",
    images: ["https://shadcn-vaults.vercel.app/og-image.png"],
    site: "@shadcnvaults",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://shadcn-vaults.vercel.app/",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
