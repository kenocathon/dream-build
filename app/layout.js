// app/layout.jsx
import "./globals.css";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata = {
  metadataBase: new URL("https://dbluxuryglass.com"),
  title: {
    default: "Dream Build Luxury Glass LLC | Custom Glass Railings & Frameless Showers | Cumming GA",
    template: "%s | Dream Build Luxury Glass LLC",
  },
  description:
    "Elevate Your Lifestyle. Premium custom glass installation serving Cumming, Alpharetta, Johns Creek, Milton & North Atlanta. Frameless shower enclosures, glass railings & architectural glass walls. Licensed, bonded & insured. Free quotes!",
  keywords: [
    "glass railings Cumming GA",
    "frameless showers Alpharetta",
    "custom glass installation Forsyth County",
    "glass handrails Johns Creek",
    "shower enclosures Milton GA",
    "luxury glass contractor North Atlanta",
    "glass stair railings Georgia",
    "bathroom glass doors Cumming",
    "glass balcony railing Alpharetta",
    "residential glass installation Forsyth County",
    "commercial glass installation North Georgia",
    "custom shower doors Johns Creek",
    "glass partition walls Atlanta",
    "Dream Build Luxury Glass",
    "glass railings Roswell GA",
    "frameless showers Dawsonville",
  ],
  authors: [{ name: "Dream Build Luxury Glass LLC" }],
  creator: "Dream Build Luxury Glass LLC",
  publisher: "Dream Build Luxury Glass LLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://dbluxuryglass.com",
  },
  openGraph: {
    title: "Dream Build Luxury Glass LLC | Premium Glass Installation | Cumming GA",
    description:
      "Elevate Your Lifestyle. Premium custom glass railings, frameless showers, and architectural installations serving Cumming, Alpharetta, Johns Creek & North Atlanta. Free quotes!",
    url: "https://dbluxuryglass.com",
    siteName: "Dream Build Luxury Glass LLC",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.dbluxuryglass.com/open-concept-glass-rail.jpeg",
        width: 1200,
        height: 630,
        alt: "Dream Build Luxury Glass - Premium Glass Railings and Shower Installations in Cumming GA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dream Build Luxury Glass LLC | Custom Glass Installations | Cumming GA",
    description:
      "Premium custom glass installation serving Cumming, Alpharetta & North Atlanta. Frameless showers, glass railings & more. Licensed & insured.",
    images: [
      "https://images.dbluxuryglass.com/open-concept-glass-rail.jpeg",
    ],
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
    // Add these when you set up Google Search Console and Bing Webmaster
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

// JSON-LD Structured Data for Local Business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://dbluxuryglass.com",
  name: "Dream Build Luxury Glass LLC",
  image: "https://images.dbluxuryglass.com/logo.png",
  description:
    "Premium custom glass installation company specializing in frameless showers, glass railings, handrails, and architectural glass walls serving Cumming, Alpharetta, Johns Creek, Milton, and North Atlanta.",
  url: "https://dbluxuryglass.com",
  telephone: "+1-404-707-8819",
  email: "support@dbluxuryglass.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cumming",
    addressRegion: "GA",
    postalCode: "30040",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 34.2073,
    longitude: -84.1402,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 34.2073,
      longitude: -84.1402,
    },
    geoRadius: "48280",
  },
  priceRange: "$$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Glass Installation Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Frameless Shower Enclosures",
          description: "Custom frameless glass shower doors and enclosures",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Glass Railings & Handrails",
          description: "Interior and exterior glass railing systems for stairs, balconies, and decks",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Glass Partition Walls",
          description: "Custom architectural glass walls and partitions",
        },
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-deepblack text-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
