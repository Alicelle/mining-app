export default [
  {
    path: "index",
    name: "Index",
    component: () => import("@/views/home/home/index.vue"),
    meta: { title: "首页", showNavbar: false },
  },
];
