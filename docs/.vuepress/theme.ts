import { hopeTheme } from "vuepress-theme-hope";

import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  // 主题选项：https://theme-hope.vuejs.press/zh/config/theme/layout.html
  hostname: "https://sciencefl.github.io/",

  author: {
    name: "Flynn",
    url: "https://sciencefl.github.io/",
  },

  iconAssets: "fontawesome-with-brands",

  logo: "https://theme-hope-assets.vuejs.press/logo.svg",

  // 默认为 GitHub. 同时也可以是一个完整的 URL
  repo: "https://sciencefl.github.io/",
  // 自定义仓库链接文字。默认从 `repo` 中自动推断为 "GitHub" / "GitLab" / "Gitee" / "Bitbucket" 其中之一，或是 "Source"。
  repoLabel: "GitHub",
  // 是否在导航栏内显示仓库链接，默认为 `true`
  repoDisplay: true,
  // 文档存放路径
  docsDir: "docs",

  // 网站文章的版权声明
  license: "CC BY-NC-ND 4.0",

  // copyright 默认为 Copyright © <作者>
  copyright: `
  版权声明：自由转载 - 非商用 - 非衍生 - 保持署名<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hans" target="_blank" rel="noopener noreferrer">（创意共享 4.0 许可证）</a>|
  Copyright © 2023-present LearnData</a>
  `,
  displayFooter: true,
  // 页脚，支持使用 HTMLString 以显示备案信息等
  // footer: `CC BY-NC-ND 4.0 Licensed`,

  // 是否全局启用路径导航
  breadcrumb: false,

  // 页面元数据：贡献者，最后修改时间，编辑链接
  contributors: true,
  lastUpdated: true,
  editLink: false,

  // 深色模式配置
  darkmode: "switch",
  // 全屏按钮
  fullscreen: true,

  // navbar
  navbar: zhNavbar,
  navbarLayout: {
    start: ["Brand"],
    center: ["Links"],
    end: ["SocialLink", "Repo", "Outlook", "Search"],
  },

  // sidebar
  sidebar: zhSidebar,
  // 侧边栏排序规则
  // sidebarSorter: ['readme', 'order', 'title'],

  // 页面布局 Frontmatter 配置：https://theme-hope.vuejs.press/zh/config/frontmatter/layout.html#pageinfo
  pageInfo: ["Category", "Tag", "Word", "ReadingTime", "PageView"],

  // 主题功能选项：https://theme-hope.vuejs.press/zh/config/theme/feature.html
  blog: {
    name: "清顺",
    description: "迷信新工具，热衷于研究开源软件、心理学理论，定期分享探索成果",
    intro: "/intro.html",
    medias: {
    },
  },

  // 隐藏打印按钮
  // print: false,
  plugins: {
    blog: true,

    // 组件库
    components: {
      components: ["Badge", "BiliBili", "VidStack"],
    },

    // 禁用不需要的配置
    // https://plugin-md-enhance.vuejs.press/zh/guide/
    mdEnhance: {
      sub: true, // 上下角标
      sup: true,
      tasklist: true, // 任务列表
      include: true, //导入文件
      component: true, // 使用 component 代码块来在 Markdown 中添加组件
      footnote: true,
      // tabs: true, // 选项卡
      attrs: true, // 使用特殊标记为 Markdown 元素添加属性
      mark: true, // 使用 == == 进行标记。请注意两边需要有空格。
      align: true, // 启用自定义对齐
      // codetabs: true, // 代码块分组
      // demo: true, //代码演示
    },

    markdownHint: {
      alert: true, // GFM 警告
      hint: true, // 提示容器
    },

    // These features are enabled for demo, only preserve features you need here
    markdownImage: {
      figure: true,
      lazyload: true,
      size: true,
    },

    // 本地搜索，和上方二选一
    searchPro: {
      // 索引全部内容
      indexContent: true,
    },

    feed: {
      atom: true,
      json: true,
      rss: true,
      count: 10,
      sorter: (a, b) => Number(b.frontmatter.date) - Number(a.frontmatter.date),
    },

  },

  // 开发模式下是否启动热更新，显示所有更改并重新渲染
  hotReload: true,
});
