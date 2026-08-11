// Plain CommonJS on purpose: the root `cms/tsconfig.json` explicitly excludes
// `src/plugins/**` from its `strapi build`/`strapi develop` compile step, and
// Strapi's plugin loader (`@strapi/core` `loadConfigFile`) only knows how to
// `require()` `.js`/`.json` — it never transpiles `.ts` for a plugin entry
// point. A `strapi-server.ts` here would be silently skipped (path doesn't
// exist as `.js` → plugin not loaded, no error). See task-8-report.md.
module.exports = require("./server/src");
