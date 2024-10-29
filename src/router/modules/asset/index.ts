export default [
  {
    path: "asset",
    name: "Asset",
    component: () => import("@/views/home/asset/index.vue"),
    meta: { title: "资产", showNavbar: false },
  },
];
