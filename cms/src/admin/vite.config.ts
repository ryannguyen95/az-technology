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
      //
      // WORKTREE `subcategory-items-display-3a9541`: 1348 = port gốc (1338) + 10,
      // theo mục "Dải worktree" của Port Registry, để chạy song song cây chính.
      // ⚠️ Đừng merge con số 1348 này vào main: cây chính phải là 1338.
      port: 1348,
      strictPort: true,
    },
  });
};
