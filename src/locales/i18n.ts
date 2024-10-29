// i18n配置
import { createI18n } from "vue-i18n";
import zhCn from "./zh-cn";
import en from "./en";
import indonesian from "./indonesian";

// 创建i18n
const i18n = createI18n({
  locale: localStorage.getItem("language") || "en", // 语言标识
  globalInjection: true, // 全局注入,可以直接使用$t
  allowComposition: true,
  // 处理报错: Uncaught (in promise) SyntaxError: Not available in legacy mode (at message-compiler.esm-bundler.js:54:19)
  legacy: false,
  messages: {
    zhCn,
    en,
    indonesian,
  },
});

export default i18n;
