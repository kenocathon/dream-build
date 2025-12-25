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
  title: {
    default: "Dream Build Luxury Glass LLC | Custom Glass Railings & Showers",
    template: "%s | Dream Build Luxury Glass LLC",
  },
  description:
    "Premium custom glass installations including frameless showers, glass railings, and architectural glass walls. Licensed, bonded & insured with lifetime warranty.",
  keywords: [
    "glass railings",
    "frameless showers",
    "custom glass",
    "glass installation",
    "luxury glass",
    "glass handrails",
    "shower enclosures",
  ],
  authors: [{ name: "Dream Build Luxury Glass LLC" }],
  openGraph: {
    title: "Dream Build Luxury Glass LLC",
    description:
      "Crafting Luxury, One Pane at a Time. Premium custom glass railings, frameless showers, and architectural installations.",
    url: "https://dbluxuryglass.com",
    siteName: "Dream Build Luxury Glass LLC",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.dbluxuryglass.com/open-concept-glass-rail.jpeg",
        width: 1200,
        height: 630,
        alt: "Dream Build Luxury Glass - Premium Glass Installations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dream Build Luxury Glass LLC",
    description:
      "Premium custom glass railings, frameless showers, and architectural installations.",
    images: [
      "https://images.dbluxuryglass.com/open-concept-glass-rail.jpeg",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans antialiased bg-deepblack text-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
