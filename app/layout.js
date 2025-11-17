// app/layout.jsx
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata = {
  title: "Dream Build Luxury Glass LLC",
  description: "Crafting Luxury, One Pane at a Time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans antialiased bg-deepblack text-white">
        {children}
      </body>
    </html>
  );
}
