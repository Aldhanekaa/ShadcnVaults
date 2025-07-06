import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { generateKeywordVariations } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Base keywords for the main site
const baseKeywords = [
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
  "ui components",
  "react components",
  "nextjs components",
  "shadcn ui",
  "ui library",
  "component blocks",
  "ui templates",
  "react templates",
  "nextjs templates",
  "vaults",
  "shadcn vaults",
];

export const metadata = {
  title: "ShadcnUI Vaults – UI Blocks for Internal Tools",
  description:
    "Collection of interactive components & blocks for Internal Tools UI like Dashboard, Monitoring, Admin, CMS, and more. Specifically made for Full-Stack Dev. Instantly preview, copy, and use high-quality, accessible UI components. Anyone can contribute and help grow the library!",
  keywords: generateKeywordVariations(baseKeywords),
  authors: [{ name: "ShadcnUI Vaults" }],
  creator: "ShadcnUI Vaults",
  openGraph: {
    title: "ShadcnUI Vaults – Free & Open Source UI Blocks for Internal Tools",
    description:
      "Collection of interactive components & blocks for Internal Tools UI like Dashboard, Monitoring, Admin, CMS, and more. Specifically made for Full-Stack Dev. Instantly preview, copy, and use high-quality, accessible UI components. Anyone can contribute and help grow the library!",
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
    title: "Shadcn Vaults – Free & Open Source UI Blocks for Next.js",
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
