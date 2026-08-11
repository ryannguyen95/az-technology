export default {
  register(app: any) {
    app.addMenuLink({
      to: "plugins/sort-manager",
      icon: () => "⠿",
      intlLabel: { id: "sort-manager.plugin.name", defaultMessage: "Sắp xếp" },
      Component: () => import("./pages/SortPage").then((mod) => ({ default: mod.default })),
      permissions: [],
    });
    app.registerPlugin({ id: "sort-manager", name: "sort-manager" });
  },
  bootstrap() {},
};
