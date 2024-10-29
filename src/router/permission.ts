import router from "@/router";
import i18n from "@/locales/i18n.ts";
const t = i18n.global.t;
import { storeToRefs } from "pinia";
import { loginStore } from "@/store/login";
import { ROUTE_WHITE_LIST } from "@/constant/enums";

router.beforeEach((to: any, _from: any, next: any) => {
  const store = loginStore();
  const { token } = storeToRefs(store);
  const { meta, name } = to;
  if (meta.title) {
    // 页面title
    document.title = t(meta.title);
  }
  // next();
  const isInWhiteList = ROUTE_WHITE_LIST.includes(name);
  token.value || isInWhiteList ? next() : next({ name: "Login" });
});
