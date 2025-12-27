// app/gallery/page.js
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Gallery - Custom Glass Installation Portfolio",
  description: "Browse 35+ photos of our custom glass installations in Atlanta. Frameless showers, glass railings, handrails & architectural glass walls. See our craftsmanship.",
  alternates: {
    canonical: "https://dbluxuryglass.com/gallery",
  },
  openGraph: {
    title: "Gallery | Dream Build Luxury Glass LLC",
    description: "Browse our portfolio of premium custom glass installations in Atlanta - frameless showers, glass railings, and more.",
    url: "https://dbluxuryglass.com/gallery",
    images: [
      {
        url: "https://images.dbluxuryglass.com/shower-marble-black-accent-gold-trim.jpeg",
        width: 1200,
        height: 630,
        alt: "Dream Build Luxury Glass - Custom Glass Installation Gallery",
      },
    ],
  },
};

const R2_BASE = "https://images.dbluxuryglass.com";

const galleryImages = [
  // Showers
  {
    title: "Corner Glass Shower",
    description: "Elegant corner shower enclosure with frameless glass panels.",
    imageUrl: `${R2_BASE}/corner-glass-shower.jpeg`,
    category: "Showers",
  },
  {
    title: "Marble & Gold Shower",
    description: "Luxurious shower with marble walls, black accent, and gold trim.",
    imageUrl: `${R2_BASE}/shower-marble-black-accent-gold-trim.jpeg`,
    category: "Showers",
  },
  {
    title: "Gray Tile Shower",
    description: "Modern shower with gray tiles and sleek black hardware.",
    imageUrl: `${R2_BASE}/shower-gray-tile-black-hardware.jpeg`,
    category: "Showers",
  },
  {
    title: "Luxury Marble Bathroom",
    description: "Full bathroom with marble and gold fixtures.",
    imageUrl: `${R2_BASE}/shower-luxury-marble-gold-fixtures.jpeg`,
    category: "Showers",
  },
  {
    title: "Large Walk-in Shower",
    description: "Spacious walk-in shower with glass door enclosure.",
    imageUrl: `${R2_BASE}/large-walkin-shower-with-door.jpeg`,
    category: "Showers",
  },
  {
    title: "White Tile Shower",
    description: "Clean white tile shower with black fixtures.",
    imageUrl: `${R2_BASE}/shower-white-tile-black-fixtures.jpeg`,
    category: "Showers",
  },
  {
    title: "Marble Mosaic Shower",
    description: "Large marble shower with mosaic accent wall.",
    imageUrl: `${R2_BASE}/shower-large-marble-mosaic-accent.jpeg`,
    category: "Showers",
  },
  {
    title: "Glass Shower Enclosure",
    description: "Frameless shower with silver trim hardware.",
    imageUrl: `${R2_BASE}/glass-shower-enclosure-siilver-trim.jpeg`,
    category: "Showers",
  },
  {
    title: "Marble Wall Shower",
    description: "Elegant shower surrounded by marble walls.",
    imageUrl: `${R2_BASE}/glass-shower-marble-walls.jpeg`,
    category: "Showers",
  },
  {
    title: "White Bathroom Shower",
    description: "Bright white bathroom with glass shower.",
    imageUrl: `${R2_BASE}/glass-shower-white-bathroom.jpeg`,
    category: "Showers",
  },
  {
    title: "Tub Glass Enclosure",
    description: "Bathtub with elegant glass enclosure.",
    imageUrl: `${R2_BASE}/tub-with-glass-enclosure.jpeg`,
    category: "Showers",
  },
  {
    title: "White Bathroom Detail",
    description: "Close-up of pristine white bathroom installation.",
    imageUrl: `${R2_BASE}/white-bathroom-closeup.jpeg`,
    category: "Showers",
  },
  {
    title: "White Bathroom Glass Shower",
    description: "Complete white bathroom with glass shower.",
    imageUrl: `${R2_BASE}/white-bathroom-glass-shower.jpeg`,
    category: "Showers",
  },
  // Railings
  {
    title: "Open Concept Glass Rail",
    description: "Modern glass railing with sleek metal posts.",
    imageUrl: `${R2_BASE}/open-concept-glass-rail.jpeg`,
    category: "Railings",
  },
  {
    title: "Vaulted Ceiling Handrail",
    description: "Glass handrail in home with vaulted ceilings.",
    imageUrl: `${R2_BASE}/glass-handrail-vaulted-ceiling.jpeg`,
    category: "Railings",
  },
  {
    title: "White Steps Handrail",
    description: "Elegant glass handrail along white staircase.",
    imageUrl: `${R2_BASE}/glass-handrail-white-steps.jpeg`,
    category: "Railings",
  },
  {
    title: "Gold Handrails",
    description: "Stunning gold-accented glass handrails on stairs.",
    imageUrl: `${R2_BASE}/gold-handrails-on-stairs.jpeg`,
    category: "Railings",
  },
  {
    title: "Chandelier View Handrail",
    description: "Glass handrail with elegant chandelier backdrop.",
    imageUrl: `${R2_BASE}/handrail-chandelier_bg.jpeg`,
    category: "Railings",
  },
  {
    title: "Downstairs View",
    description: "Glass handrail view from above.",
    imageUrl: `${R2_BASE}/handrail-downstairs-view.jpeg`,
    category: "Railings",
  },
  {
    title: "Behind Stairs View",
    description: "Glass handrail from behind the staircase.",
    imageUrl: `${R2_BASE}/handrail-from-behind-stairs.jpeg`,
    category: "Railings",
  },
  {
    title: "Upstairs Handrails",
    description: "Glass handrails on upper level landing.",
    imageUrl: `${R2_BASE}/handrails-upstairs.jpeg`,
    category: "Railings",
  },
  {
    title: "Half Column Handrail",
    description: "Glass handrail with decorative half columns.",
    imageUrl: `${R2_BASE}/handrail-with-half-columns.jpeg`,
    category: "Railings",
  },
  {
    title: "Large Room Handrails",
    description: "Glass handrails in spacious open room.",
    imageUrl: `${R2_BASE}/large-room-glass-handrails.jpeg`,
    category: "Railings",
  },
  {
    title: "Outdoor Glass Handrail",
    description: "Exterior glass handrail for outdoor spaces.",
    imageUrl: `${R2_BASE}/outdoor-glass-handrail.jpeg`,
    category: "Railings",
  },
  {
    title: "Overlook Handrail",
    description: "Glass handrail with scenic overlook.",
    imageUrl: `${R2_BASE}/overlook-glass-handrail.jpeg`,
    category: "Railings",
  },
  {
    title: "Black Frame Stairwell",
    description: "Glass railing with black frame around open stairwell.",
    imageUrl: `${R2_BASE}/railing-black-frame-open-stairwell.jpeg`,
    category: "Railings",
  },
  {
    title: "Corner Detail",
    description: "Glass railing corner detail with wood floors.",
    imageUrl: `${R2_BASE}/railing-corner-detail-wood-floors.jpeg`,
    category: "Railings",
  },
  {
    title: "High Ceiling Modern",
    description: "Glass railing in modern home with high ceilings.",
    imageUrl: `${R2_BASE}/railing-high-ceiling-modern-home.jpeg`,
    category: "Railings",
  },
  {
    title: "Modern Entryway",
    description: "Glass railing in modern entryway with chandelier.",
    imageUrl: `${R2_BASE}/railing-modern-entryway-chandelier.jpeg`,
    category: "Railings",
  },
  {
    title: "Multi-Level Installation",
    description: "Glass railing installation across multiple levels.",
    imageUrl: `${R2_BASE}/railing-multi-level-installation.jpeg`,
    category: "Railings",
  },
  {
    title: "Standoff Mounts",
    description: "Glass railing with standoff mounts and window view.",
    imageUrl: `${R2_BASE}/railing-standoff-mounts-window-view.jpeg`,
    category: "Railings",
  },
  {
    title: "Upstairs Landing",
    description: "Glass railing at upstairs landing view.",
    imageUrl: `${R2_BASE}/railing-upstairs-landing-view.jpeg`,
    category: "Railings",
  },
  {
    title: "Wooden Stairs Side View",
    description: "Glass railing along wooden staircase.",
    imageUrl: `${R2_BASE}/railing-wooden-stairs-side-view.jpeg`,
    category: "Railings",
  },
  {
    title: "Wood Frame Staircase",
    description: "Glass railing with natural wood frame.",
    imageUrl: `${R2_BASE}/railing-wood-frame-staircase.jpeg`,
    category: "Railings",
  },
  {
    title: "Short Handrail",
    description: "Short glass handrail with bottom border detail.",
    imageUrl: `${R2_BASE}/short-handrail-bottom-border.jpeg`,
    category: "Railings",
  },
  {
    title: "Marble Floor Handrails",
    description: "Sleek glass handrails with marble flooring.",
    imageUrl: `${R2_BASE}/sleek-handrails-marble-floors.jpeg`,
    category: "Railings",
  },
  // Glass Walls
  {
    title: "Glass Wall Partition",
    description: "Modern glass wall partition in luxury home.",
    imageUrl: `${R2_BASE}/glass-wall-partition-luxury-home.jpeg`,
    category: "Glass Walls",
  },
];

export default function GalleryPage() {
  return (
    <section className="py-24 md:py-32 bg-deepblack min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-wide text-white">
            Our <span className="text-gold-500">Work</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto">
            Browse our portfolio of custom glass installations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-black/40 border border-gray-800 hover:border-gold-500/50 transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  width={800}
                  height={600}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-gold-500 text-sm font-medium uppercase tracking-wider">
                  {image.category}
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-white mt-2">
                  {image.title}
                </h3>
                <p className="text-gray-300 mt-2">{image.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 text-lg mb-8">
            Want to see your space transformed?
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-gold-500 text-deepblack px-12 py-6 text-xl font-bold uppercase tracking-wider hover:bg-gold-600 transition-all hover:scale-105"
          >
            Get Your Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
