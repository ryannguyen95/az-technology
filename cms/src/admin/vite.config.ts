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
      // Mặc định Strapi bật Vite ở 5173 (KHÔNG theo biến PORT của API) → pin riêng
      // cho AZ để không trôi/đụng port dự án khác trên cùng máy.
      // strictPort: bận thì fail-fast, CẤM auto-increment nhảy sang port khác.
      // Worktree chạy port gốc +10 theo mục "Dải worktree" của Port Registry.
      port: 1338,
      strictPort: true,
    },
  });
};
