export default [
  {
    path: "product",
    name: "Product",
    component: () => import("@/views/home/product/index.vue"),
    meta: { title: "产品", showNavbar: false },
  },
];
