import { defineUserConfig } from "vuepress";
import { webpackBundler } from "@vuepress/bundler-webpack";

import theme from "./theme.js";

export default defineUserConfig({
  // 网站路径默认为主域名。如果网站部署在子路径下，比如 xxx.com/yyy，那么 base 应该被设置为 "/yyy/"
  base: "/",

  // 网站语言，默认为中文
  lang: "zh-CN",

  // 网站标题
  title: "FlynnDocs 学习笔记",
  // 网站描述
  description: "技术学习、生活爱好的自我提升的笔记，记录分享一切自己感兴趣的知识",

  // 是否开启页面预拉取，如果服务器宽带足够，可改为 true，会提升其他页面加载速度
  shouldPrefetch: false,

  theme,

  bundler: webpackBundler({
    postcss: {},
    vue: {},
  }),

  // Enable it with pwa
  // shouldPrefetch: false,
});
