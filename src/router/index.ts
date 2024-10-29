// router - intex.ts
import { storeToRefs } from "pinia";
import { loginStore } from "@/store/login";
// append import
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeIndex from "@/router/modules/home/index";
import HomeProduct from "@/router/modules/product/index";
import HomeAsset from "@/router/modules/asset/index";
import HomeMy from "@/router/modules/my/index";
import PageList from "@/router/page/index";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/home/index",
    component: () => import("@/views/home/home.vue"),
    children: [...HomeIndex, ...HomeProduct, ...HomeAsset, ...HomeMy],
  },
  ...PageList,
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/login.vue"),
    meta: { title: "login.title", showNavbar: false },
    beforeEnter: (_to: any, _from: any, next: any) => {
      const store = loginStore();
      const { token } = storeToRefs(store);
      token.value ? next("/") : next();
    },
  },
  {
    path: "/forgetPassword",
    name: "forgetPassword",
    component: () => import("@/views/login/forgetPassword.vue"),
    meta: {
      title: "resetPwd.pageTitle",
      showNavbar: true,
    },
  },
  {
    path: "/registerCount",
    name: "registerCount",
    component: () => import("@/views/login/registerCount.vue"),
    meta: {
      title: "register.pageTitle",
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
