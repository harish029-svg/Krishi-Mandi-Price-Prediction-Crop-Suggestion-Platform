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

export const metadata = {
  metadataBase: new URL("https://agrisaathi.com"),
  title: {
    default: "AgriSaathi | Smarter Farming Decisions",
    template: "%s | AgriSaathi",
  },
  description:
    "AgriSaathi is an intelligent agricultural decision platform offering real-time mandi prices today, AI-driven crop suggestions, nearby market analysis, and historical crop price trends to empower Indian farmers.",
  keywords: [
    "mandi prices today",
    "agricultural market prices",
    "crop price prediction",
    "AI crop recommendation",
    "crop suggestion for farmers",
    "nearby agricultural markets",
    "historical mandi prices",
    "smart farming platform",
    "krishi mandi bhav",
    "kisan portal India",
  ],
  authors: [{ name: "AgriSaathi Team" }],
  creator: "AgriSaathi",
  publisher: "AgriSaathi",
  applicationName: "AgriSaathi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://agrisaathi.com",
    title: "AgriSaathi | Smarter Farming Decisions",
    description:
      "Get real-time mandi prices, AI-powered crop suggestions, market insights and more — all in one place.",
    siteName: "AgriSaathi",
    images: [
      {
        url: "/Gemini_Generated_Image_umhnn9umhnn9umhn.png",
        width: 1200,
        height: 630,
        alt: "AgriSaathi - Smarter Farming Decisions Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgriSaathi | Smarter Farming Decisions",
    description:
      "Empowering farmers with live mandi prices today, AI crop suggestions, and predictive agricultural intelligence.",
    images: ["/Gemini_Generated_Image_umhnn9umhnn9umhn.png"],
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
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://agrisaathi.com/#organization",
      name: "AgriSaathi",
      url: "https://agrisaathi.com",
      logo: "https://agrisaathi.com/file.svg",
      description:
        "AgriSaathi empowers Indian farmers with live mandi prices, predictive crop recommendations, and market trend analysis.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://agrisaathi.com/#website",
      url: "https://agrisaathi.com",
      name: "AgriSaathi",
      publisher: {
        "@id": "https://agrisaathi.com/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://agrisaathi.com/app/mandi-prices?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebApplication",
      name: "AgriSaathi",
      url: "https://agrisaathi.com",
      applicationCategory: "AgriculturalApplication",
      operatingSystem: "All modern web browsers",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
      featureList: [
        "Real-Time Mandi Prices across India",
        "AI-Powered Soil & Climate Crop Suggestions",
        "Nearby Agricultural Markets Geo-Location",
        "Historical Commodity Price Trends and Forecasts",
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
