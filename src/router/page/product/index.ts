export default [
  {
    path: "/productDetail",
    name: "ProductDetail",
    component: () => import("@/views/home/product/detail.vue"),
    meta: {
      showNavbar: true,
      title: "Product detail",
    },
  },
];
