import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 要缓存的图标文件夹
      iconDirs: [resolve(__dirname, "src/assets/svgs")],
      // 执行 icon name 的格式
      symbolId: "icon-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
  server: {
    port: 8080,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        // 匹配请求路径，
        // target: "http://43.129.196.138:8090", // 代理的目标地址
        target: "https://www.sqm-mining.online",
        // 开发模式，默认的127.0.0.1,开启后代理服务会把origin修改为目标地址
        changeOrigin: true,
        open: true,
        secure: true, // 是否https接口
        // ws: true, // 是否代理websockets

        // 路径重写，**** 如果你的后端有统一前缀(如:/api)，就不开启；没有就开启
        //简单来说，就是是否改路径 加某些东西
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    // css 预处理器
    preprocessorOptions: {
      // provide global variables
      less: {
        additionalData: `
          @import "@/styles/mixins.less";
          @import "@/styles/variables.less";
        `,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "js/[name].js", // 入口文件
        chunkFileNames: "js/[name].js", // 代码分离文件
        assetFileNames(assetsInfo) {
          if (assetsInfo.name.endsWith(".css")) {
            return "css/[name].css";
          }
          const imgExts = [
            ".png",
            ".jpg",
            ".jpeg",
            ".gif",
            ".svg",
            ".ico",
            ".webp",
          ];
          if (imgExts.some((ext) => assetsInfo.name.endsWith(ext))) {
            return "img/[name]-[hash].[ext]";
          }
          return "[name]-[hash].[ext]";
        },
      },
    },
  },
});
