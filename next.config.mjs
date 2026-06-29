/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Strapi/CDN media hosts are allowlisted here when wired (review T9).
    remotePatterns: [
      { protocol: "https", hostname: "**.az-technology.vn" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // Local Strapi media during development.
      { protocol: "http", hostname: "localhost", port: "1337" },
      { protocol: "http", hostname: "127.0.0.1", port: "1337" },
    ],
  },
};

export default nextConfig;
