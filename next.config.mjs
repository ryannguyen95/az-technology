import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Self-contained server bundle for lean PM2 deploys (no npm install on the
  // server; `node .next/standalone/server.js` runs with a minimal traced set).
  output: "standalone",
  // Pin the file-tracing root to THIS project. Otherwise Next infers the root
  // from the nearest lockfile — with a stray ~/package-lock.json it picked $HOME
  // and nested the standalone output under the full home-relative path, so
  // deploy/build.sh couldn't find .next/standalone/server.js.
  outputFileTracingRoot: projectRoot,
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
