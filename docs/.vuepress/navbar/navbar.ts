import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  {
    text: "首页",
    icon: "house",
    link: "/",
  },
  {
    text: "技术",
    icon: "laptop-code",
    children: [
      {
        text: "架构设计",
        icon: "pen-to-square",
        link: "/architecture-design/",
      },
      {
        text: "计算机基础",
        icon: "desktop",
        link: "/cs-basics/",
      },
      {
        text: "Spring",
        icon: "leaf",
        link: "/spring/",
      },
      {
        text: "环境部署",
        icon: "server",
        link: "/env-deploy/",
      },
    ],
  },
  {
    text: "学习",
    icon: "book-open-reader",
    children: [
      {
        text: "读书笔记",
        icon: "book",
        link: "/reading/",
      },
      {
        text: "专题学习",
        icon: "graduation-cap",
        link: "/learn/%E6%95%B0%E6%8D%AE%E8%A6%81%E7%B4%A0%E5%AD%A6%E4%B9%A0%E6%8A%A5%E5%91%8A.html",
      },
    ],
  },
  {
    text: "生活",
    icon: "seedling",
    link: "/life-hobbies/",
  },
  {
    text: "关于",
    icon: "circle-info",
    link: "/intro.html",
  },
]);
