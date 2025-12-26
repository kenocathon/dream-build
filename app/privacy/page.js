// app/privacy/page.js
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Dream Build Luxury Glass LLC. Learn how we collect, use, and protect your information when you use our website and services.",
  alternates: {
    canonical: "https://dbluxuryglass.com/privacy",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <section className="py-24 md:py-32 bg-deepblack min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-8">
          Privacy <span className="text-gold-500">Policy</span>
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <p className="leading-relaxed">
                When you use our contact form, we collect the information you provide, including your name,
                phone number, email address, and project details. We may also collect photos you choose to
                upload to help us provide accurate quotes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <p className="leading-relaxed">We use the information you provide to:</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Respond to your inquiries and provide quotes</li>
                <li>Communicate with you about your project</li>
                <li>Schedule consultations and installations</li>
                <li>Improve our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
              <p className="leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties.
                Your information is only used for the purposes outlined above and to provide you with our
                glass installation services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate security measures to protect your personal information. However,
                no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="leading-relaxed">
                If you have questions about this privacy policy or our practices, please{" "}
                <Link href="/#contact" className="text-gold-500 hover:text-gold-600 underline">
                  contact us
                </Link>.
              </p>
            </section>
          </div>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-block text-gold-500 hover:text-gold-600 font-medium"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
