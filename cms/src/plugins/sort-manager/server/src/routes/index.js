"use strict";

// type: "admin" → chỉ user đã đăng nhập admin panel gọi được.
// Không mở route "content-api": dữ liệu cây không có lý do gì lộ ra public.
module.exports = {
  admin: {
    type: "admin",
    routes: [
      {
        method: "GET",
        path: "/tree",
        handler: "controller.tree",
        config: { policies: [] },
      },
    ],
  },
};
