import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      allowedHosts: true,
      // HARD-PIN port ẩn của Strapi admin Vite dev server.
      // Mặc định Strapi bật Vite ở 5173 (KHÔNG theo biến PORT=1337 của API) →
      // trùng web Vite của Elevator. CTO cấp riêng 1338 cho AZ trong ports-registry.md.
      // strictPort: bận thì fail-fast, CẤM auto-increment nhảy sang port dự án khác.
      port: 1338,
      strictPort: true,
    },
  });
};
