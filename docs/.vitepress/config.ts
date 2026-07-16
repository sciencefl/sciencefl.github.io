import { defineConfig, type DefaultTheme } from "vitepress";

const base = process.env.VITEPRESS_BASE ?? "/";

const architectureSidebar: DefaultTheme.SidebarItem[] = [
  { text: "架构知识", link: "/architecture/" },
  {
    text: "架构基础",
    items: [
      { text: "架构风格", link: "/architecture/architecture-styles" },
      { text: "架构视图", link: "/architecture/architecture-views" },
      { text: "质量属性", link: "/architecture/quality-attributes" },
    ],
  },
];

const aiProgrammingSidebar: DefaultTheme.SidebarItem[] = [
  { text: "AI 编程与原理", link: "/ai-programming/" },
  {
    text: "基础原理",
    items: [
      { text: "LLM 基础原理", link: "/ai-programming/llm-principles" },
      { text: "上下文与 Token", link: "/ai-programming/context-and-tokens" },
      { text: "Agent 与工具调用", link: "/ai-programming/agents-and-tools" },
    ],
  },
];

const vibeCodingSidebar: DefaultTheme.SidebarItem[] = [
  { text: "Vibe Coding", link: "/vibe-coding/" },
  {
    text: "实践方法",
    items: [
      { text: "工作流", link: "/vibe-coding/workflow" },
      { text: "Spec-first", link: "/vibe-coding/spec-first" },
      { text: "验证与复盘", link: "/vibe-coding/verification" },
    ],
  },
];

const archiveSidebar: DefaultTheme.SidebarItem[] = [
  { text: "归档说明", link: "/archive/" },
  {
    text: "历史目录",
    items: [
      { text: "架构设计", link: "/archive/architecture-design/" },
      { text: "计算机基础", link: "/archive/cs-basics/" },
      { text: "环境部署", link: "/archive/env-deploy/" },
      { text: "学习资料", link: "/archive/learn/" },
      { text: "阅读与兴趣", link: "/archive/reading/" },
      { text: "生活爱好", link: "/archive/life-hobbies/" },
      { text: "Spring", link: "/archive/spring/" },
    ],
  },
];

export default defineConfig({
  base,
  lang: "zh-CN",
  title: "Flynn Notes",
  description: "架构知识、AI 编程与 Vibe Coding 学习笔记",
  head: [["link", { rel: "icon", href: `${base}icons/architecture.svg` }]],
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ["superpowers/**"],
  ignoreDeadLinks: [/^\/archive\//],
  markdown: {
    lineNumbers: true,
    config(md) {
      const defaultFence = md.renderer.rules.fence;
      md.renderer.rules.fence = (tokens, index, options, env, self) => {
        const token = tokens[index];
        const language = token.info.trim().split(/\s+/)[0];
        if (language === "mermaid") {
          return `<pre class="mermaid">${md.utils.escapeHtml(token.content)}</pre>`;
        }
        return defaultFence
          ? defaultFence(tokens, index, options, env, self)
          : self.renderToken(tokens, index, options);
      };
    },
  },
  themeConfig: {
    search: { provider: "local" },
    outline: { level: [2, 3] },
    nav: [
      { text: "架构知识", link: "/architecture/" },
      { text: "AI 编程与原理", link: "/ai-programming/" },
      { text: "Vibe Coding", link: "/vibe-coding/" },
      { text: "归档", link: "/archive/" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/sciencefl/sciencefl.github.io" },
    ],
    sidebar: {
      "/architecture/": architectureSidebar,
      "/ai-programming/": aiProgrammingSidebar,
      "/vibe-coding/": vibeCodingSidebar,
      "/archive/": archiveSidebar,
    },
    footer: {
      message: "持续学习，持续验证，持续沉淀。",
      copyright: "Copyright © 2024-present Flynn Notes",
    },
  },
});
