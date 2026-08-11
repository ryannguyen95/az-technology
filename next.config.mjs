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
      // Local Strapi media during development. No `port` on purpose: the main
      // tree runs Strapi on 1337 but every worktree runs it on 1337+10n per the
      // Port Registry's worktree rule, and pinning the port here silently broke
      // every image with a 500 when DATA_SOURCE=strapi in a worktree. Loopback
      // hosts only, so leaving the port open costs nothing.
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
    ],
  },
};

export default nextConfig;
