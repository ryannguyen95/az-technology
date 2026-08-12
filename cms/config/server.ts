import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // Public-facing URL when Strapi sits behind a reverse proxy (nginx) — used
  // by the admin panel and any absolute links it generates (webhooks, email
  // confirmation, etc). Unset in dev/staging templates → falls back to
  // Strapi's own default (undefined), so local/dev behavior is unchanged.
  url: env('PUBLIC_URL', undefined),
  app: {
    keys: env.array('APP_KEYS'),
  },
});

export default config;
