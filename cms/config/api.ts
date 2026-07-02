import type { Core } from '@strapi/strapi';

const config: Core.Config.Api = {
  rest: {
    defaultLimit: 25,
    // Raised so the frontend can fetch the full catalog in one request
    // (the data layer pulls all entries with pageSize=200+).
    maxLimit: 1000,
    withCount: true,
  },
};

export default config;
