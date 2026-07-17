/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Self-contained server bundle for lean PM2 deploys (no npm install on the
  // server; `node .next/standalone/server.js` runs with a minimal traced set).
  output: "standalone",
  images: {
    // Strapi/CDN media hosts are allowlisted here when wired (review T9).
    remotePatterns: [
      { protocol: "https", hostname: "**.az-technology.vn" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // Cloudflare R2 public bucket (r2.dev dev URL or a custom domain).
      { protocol: "https", hostname: "**.r2.dev" },
      // Local Strapi media during development.
      { protocol: "http", hostname: "localhost", port: "1337" },
      { protocol: "http", hostname: "127.0.0.1", port: "1337" },
    ],
  },
};

export default nextConfig;
