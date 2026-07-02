import type { Core } from '@strapi/strapi';

// Host of the R2 public URL (e.g. pub-xxxx.r2.dev or cdn.az-technology.vn),
// allowlisted in the CSP so uploaded images render in the admin + previews.
const r2Host = (() => {
  try {
    return process.env.R2_PUBLIC_URL ? new URL(process.env.R2_PUBLIC_URL).host : null;
  } catch {
    return null;
  }
})();
const mediaHosts = ['market-assets.strapi.io', ...(r2Host ? [r2Host] : [])];

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', ...mediaHosts],
          'media-src': ["'self'", 'data:', 'blob:', ...mediaHosts],
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
