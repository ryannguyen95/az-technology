/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Strapi/CDN media hosts are allowlisted here when wired (review T9).
    remotePatterns: [
      { protocol: "https", hostname: "**.az-technology.vn" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
