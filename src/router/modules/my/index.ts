export default [
  {
    path: "my",
    name: "My",
    component: () => import("@/views/home/my/index.vue"),
    meta: { title: "我的", showNavbar: false },
  },
];
