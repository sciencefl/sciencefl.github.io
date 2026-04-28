import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/architecture-design/": [
    {
      text: "架构设计",
      icon: "sitemap",
      prefix: "",
      children: [
        "",
        "design-principles-ideas",
        "设计模式总结",
        "Redis笔记",
        "NIO相比传统IO，有哪些优化",
        "一致性哈希算法的数据数据迁移方案",
        "双亲委派",
      ],
    },
  ],
  "/cs-basics/": [
    {
      text: "计算机基础",
      icon: "desktop",
      prefix: "",
      children: [
        "",
        {
          text: "Java",
          icon: "code",
          prefix: "java/",
          children: [""],
        },
      ],
    },
  ],
  "/env-deploy/": [
    {
      text: "环境部署",
      icon: "server",
      prefix: "",
      children: ["", "本地部署与启动", "K8s 集群ARM64完整安装指南"],
    },
  ],
  "/learn/": [
    {
      text: "专题学习",
      icon: "graduation-cap",
      prefix: "",
      children: ["数据要素学习报告"],
    },
  ],
  "/life-hobbies/": [
    {
      text: "生活",
      icon: "seedling",
      prefix: "",
      children: [""],
    },
  ],
  "/reading/": [
    {
      text: "读书笔记",
      icon: "book",
      prefix: "",
      children: [""],
    },
  ],
  "/spring/": [
    {
      text: "Spring",
      icon: "leaf",
      prefix: "",
      children: [""],
    },
  ],
  "/": [
    {
      text: "开始",
      icon: "compass",
      children: ["/", "/intro"],
    },
    {
      text: "主要栏目",
      icon: "table-list",
      children: [
        "/architecture-design/",
        "/cs-basics/",
        "/env-deploy/",
        "/learn/%E6%95%B0%E6%8D%AE%E8%A6%81%E7%B4%A0%E5%AD%A6%E4%B9%A0%E6%8A%A5%E5%91%8A.html",
        "/reading/",
        "/life-hobbies/",
        "/spring/",
      ],
    },
  ],
});
