import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/architecture-design/": [
    {
      text: "架构设计",
      icon: "sitemap",
      link: "/architecture-design/",
      children: [
        {
          text: "设计原则与思想",
          icon: "lightbulb",
          link: "/architecture-design/design-principles-ideas.html",
        },
        {
          text: "设计模式总结",
          icon: "list",
          link: "/architecture-design/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E6%80%BB%E7%BB%93.html",
        },
        {
          text: "Redis 笔记",
          icon: "database",
          link: "/architecture-design/Redis%E7%AC%94%E8%AE%B0.html",
        },
        {
          text: "NIO 相比传统 IO 有哪些优化",
          icon: "hard-drive",
          link: "/architecture-design/NIO%E7%9B%B8%E6%AF%94%E4%BC%A0%E7%BB%9FIO%EF%BC%8C%E6%9C%89%E5%93%AA%E4%BA%9B%E4%BC%98%E5%8C%96.html",
        },
        {
          text: "一致性哈希算法的数据迁移方案",
          icon: "shuffle",
          link: "/architecture-design/%E4%B8%80%E8%87%B4%E6%80%A7%E5%93%88%E5%B8%8C%E7%AE%97%E6%B3%95%E7%9A%84%E6%95%B0%E6%8D%AE%E6%95%B0%E6%8D%AE%E8%BF%81%E7%A7%BB%E6%96%B9%E6%A1%88.html",
        },
        {
          text: "双亲委派",
          icon: "diagram-project",
          link: "/architecture-design/%E5%8F%8C%E4%BA%B2%E5%A7%94%E6%B4%BE.html",
        },
      ],
    },
  ],
  "/cs-basics/": [
    {
      text: "计算机基础",
      icon: "desktop",
      link: "/cs-basics/",
      children: [
        {
          text: "Java",
          icon: "mug-hot",
          link: "/cs-basics/java/",
        },
      ],
    },
  ],
  "/env-deploy/": [
    {
      text: "环境部署",
      icon: "server",
      link: "/env-deploy/",
      children: [
        {
          text: "本地部署与启动",
          icon: "rocket",
          link: "/env-deploy/%E6%9C%AC%E5%9C%B0%E9%83%A8%E7%BD%B2%E4%B8%8E%E5%90%AF%E5%8A%A8.html",
        },
        {
          text: "K8s 集群 ARM64 完整安装指南",
          icon: "brands:kubernetes",
          link: "/env-deploy/K8s%20%E9%9B%86%E7%BE%A4ARM64%E5%AE%8C%E6%95%B4%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97.html",
        },
      ],
    },
  ],
  "/learn/": [
    {
      text: "专题学习",
      icon: "graduation-cap",
      children: [
        {
          text: "数据要素学习报告",
          icon: "chart-line",
          link: "/learn/%E6%95%B0%E6%8D%AE%E8%A6%81%E7%B4%A0%E5%AD%A6%E4%B9%A0%E6%8A%A5%E5%91%8A.html",
        },
      ],
    },
  ],
  "/life-hobbies/": [
    {
      text: "生活",
      icon: "seedling",
      link: "/life-hobbies/",
    },
  ],
  "/reading/": [
    {
      text: "读书笔记",
      icon: "book",
      link: "/reading/",
    },
  ],
  "/spring/": [
    {
      text: "Spring",
      icon: "leaf",
      link: "/spring/",
    },
  ],
  "/": [
    {
      text: "开始",
      icon: "compass",
      children: [
        {
          text: "首页",
          icon: "house",
          link: "/",
        },
        {
          text: "关于",
          icon: "circle-info",
          link: "/intro.html",
        },
      ],
    },
    {
      text: "主要栏目",
      icon: "table-list",
      children: [
        {
          text: "架构设计",
          icon: "sitemap",
          link: "/architecture-design/",
        },
        {
          text: "计算机基础",
          icon: "desktop",
          link: "/cs-basics/",
        },
        {
          text: "环境部署",
          icon: "server",
          link: "/env-deploy/",
        },
        {
          text: "专题学习",
          icon: "graduation-cap",
          link: "/learn/%E6%95%B0%E6%8D%AE%E8%A6%81%E7%B4%A0%E5%AD%A6%E4%B9%A0%E6%8A%A5%E5%91%8A.html",
        },
        {
          text: "读书笔记",
          icon: "book",
          link: "/reading/",
        },
        {
          text: "生活",
          icon: "seedling",
          link: "/life-hobbies/",
        },
        {
          text: "Spring",
          icon: "leaf",
          link: "/spring/",
        },
      ],
    },
  ],
});
