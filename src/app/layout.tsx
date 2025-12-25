import type { Metadata } from "next";
import "./globals.css";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/StructuredData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dailyprism.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Daily Prism | Modern Editorial News",
    template: "%s | The Daily Prism",
  },
  description: "Breaking news, in-depth analysis, and editorial coverage in English and Telugu. The Daily Prism brings you the stories that matter.",
  keywords: ["news", "telugu news", "breaking news", "politics", "technology", "markets", "daily prism", "india news", "వార్తలు"],
  authors: [{ name: "The Daily Prism" }],
  creator: "The Daily Prism",
  publisher: "The Daily Prism",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    title: "The Daily Prism",
    description: "Breaking news and analysis in English & Telugu",
    type: "website",
    locale: "en_US",
    alternateLocale: ["te_IN"],
    siteName: "The Daily Prism",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Daily Prism - Modern Editorial News",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Daily Prism",
    description: "Breaking news and analysis in English & Telugu",
    creator: "@dailyprism",
    images: ["/og-image.png"],
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
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: '/icon?v=2',
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": `${siteUrl}/en`,
      "te-IN": `${siteUrl}/te`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data for SEO */}
        <OrganizationSchema url={siteUrl} />
        <WebsiteSchema
          url={siteUrl}
          name="The Daily Prism"
          description="Breaking news, in-depth analysis, and editorial coverage in English and Telugu."
        />
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
