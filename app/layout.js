// app/layout.jsx
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata = {
  metadataBase: new URL("https://dbluxuryglass.com"),
  title: {
    default: "Dream Build Luxury Glass LLC | Custom Glass Railings & Frameless Showers in Atlanta",
    template: "%s | Dream Build Luxury Glass LLC",
  },
  description:
    "Atlanta's premier custom glass installation company. Frameless shower enclosures, glass railings, handrails & architectural glass walls. Licensed, bonded & insured with lifetime warranty. Free quotes within 48 hours.",
  keywords: [
    "glass railings Atlanta",
    "frameless showers Atlanta",
    "custom glass installation",
    "glass handrails Georgia",
    "shower enclosures Atlanta",
    "luxury glass contractor",
    "glass stair railings",
    "bathroom glass doors",
    "glass balcony railing",
    "residential glass installation",
    "commercial glass installation",
    "custom shower doors",
    "glass partition walls",
    "Dream Build Luxury Glass",
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
    title: "Dream Build Luxury Glass LLC | Atlanta's Premier Glass Installation",
    description:
      "Crafting Luxury, One Pane at a Time. Premium custom glass railings, frameless showers, and architectural installations in Atlanta & surrounding areas. Free quotes!",
    url: "https://dbluxuryglass.com",
    siteName: "Dream Build Luxury Glass LLC",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.dbluxuryglass.com/open-concept-glass-rail.jpeg",
        width: 1200,
        height: 630,
        alt: "Dream Build Luxury Glass - Premium Glass Railings and Shower Installations in Atlanta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dream Build Luxury Glass LLC | Custom Glass Installations",
    description:
      "Atlanta's premier custom glass installation. Frameless showers, glass railings & more. Licensed & insured with lifetime warranty.",
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
    "Premium custom glass installation company specializing in frameless showers, glass railings, handrails, and architectural glass walls in Atlanta and surrounding areas.",
  url: "https://dbluxuryglass.com",
  telephone: "+1-404-707-8819",
  email: "support@dbluxuryglass.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Atlanta",
    addressRegion: "GA",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.749,
    longitude: -84.388,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 33.749,
      longitude: -84.388,
    },
    geoRadius: "50000",
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
    <html lang="en" className={jakarta.variable}>
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
