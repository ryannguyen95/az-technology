import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV !== "production";

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
      // Local Strapi media, DEV ONLY. No `port` pinned: the main tree runs
      // Strapi on 1337 but every worktree runs it on 1337+10n per the Port
      // Registry's worktree rule, and a pinned port silently 500'd every image
      // when DATA_SOURCE=strapi in a worktree.
      //
      // Gated behind dev on purpose. The image optimizer fetches these URLs
      // server-side, so an unpinned loopback pattern shipped to production
      // would turn any CMS-controlled image src into a port-probe oracle
      // against localhost. Dev machines already run these ports; prod must not
      // reach loopback at all.
      ...(isDev
        ? [
            { protocol: "http", hostname: "localhost" },
            { protocol: "http", hostname: "127.0.0.1" },
          ]
        : []),
    ],
  },
};

export default nextConfig;
