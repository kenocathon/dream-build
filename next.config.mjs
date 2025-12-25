// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.dbluxuryglass.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
