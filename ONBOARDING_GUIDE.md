# Flynn Notes 项目接手与维护指南

本文档面向第一次接手本项目的开发者，帮助你快速了解网站定位、目录结构、本地使用方式、文档新增流程、主题维护方式和部署入口。

本文档描述的是当前已经落地的 VitePress 实现。历史迁移方案和设计决策保存在 `docs/superpowers/`，但该目录不会被 VitePress 发布。

## 1. 项目定位

Flynn Notes 是一个以 Markdown 为主要内容源的知识笔记网站，当前重点沉淀三个领域：

- 架构知识：架构风格、架构视图、质量属性、系统设计和案例分析。
- AI 编程与原理：LLM、Token、上下文、Agent、工具调用和 AI 编程背后的工程原理。
- Vibe Coding：从想法、规格、实现到验证和复盘的 AI 协作开发工作流。

重构后的站点保留了原有笔记，但将它们统一放在 `docs/archive/` 下。新增的核心知识应优先进入前三个活动领域，不要继续把新文章直接放入归档目录。

项目是静态站点，不包含后端服务、数据库或运行时 API。Markdown 在构建阶段被 VitePress 转换为静态 HTML、JavaScript 和 CSS，适合部署到 GitHub Pages，也可以迁移到 Gitee Pages 或其他静态托管服务。

## 2. 技术栈

| 部分 | 技术 | 用途 |
| --- | --- | --- |
| 内容与构建 | VitePress 1.6.4 | Markdown 路由、主题和静态构建 |
| 页面主题 | Vue 3 + TypeScript | 首页、图标组件和主题增强 |
| 图表 | Mermaid 11 | 在 Markdown 中绘制流程图、架构图和时序图 |
| 包管理 | pnpm 10.33.2 | 安装依赖和执行项目脚本 |
| 发布 | GitHub Actions + GitHub Pages | `main` 分支推送后自动构建和发布 |

最低建议环境：Node.js 20 或更高版本、pnpm 10.33.2。依赖版本以 `package.json` 和 `pnpm-lock.yaml` 为准。

## 3. 目录结构

```text
.
├── ONBOARDING_GUIDE.md       # 项目接手与维护指南
├── package.json              # 项目元数据和 npm scripts
├── pnpm-lock.yaml            # 锁定依赖版本
├── tsconfig.json             # TypeScript 编辑器/工具配置
├── .github/workflows/
│   └── deploy-docs.yml       # GitHub Pages 构建与部署
└── docs/                     # VitePress 内容根目录
    ├── index.md              # 首页入口，挂载 HomePage 组件
    ├── architecture/         # 架构知识
    ├── ai-programming/       # AI 编程与原理
    ├── vibe-coding/          # Vibe Coding
    ├── archive/              # 重构前的历史文档
    ├── public/icons/          # 可直接被站点引用的 SVG 图标
    ├── .vitepress/
    │   ├── config.ts         # 站点配置、导航、侧边栏和 Markdown 扩展
    │   └── theme/             # 自定义首页、图标、Mermaid 和 CSS
    └── superpowers/           # 迁移设计与实施记录，不发布到站点
```

### 3.1 活动知识目录

当前三个领域的入口和文章如下：

| 领域 | 入口 | 当前文章 |
| --- | --- | --- |
| 架构知识 | `docs/architecture/index.md` | `architecture-styles.md`、`architecture-views.md`、`quality-attributes.md` |
| AI 编程与原理 | `docs/ai-programming/index.md` | `llm-principles.md`、`context-and-tokens.md`、`agents-and-tools.md` |
| Vibe Coding | `docs/vibe-coding/index.md` | `workflow.md`、`spec-first.md`、`verification.md` |

`index.md` 是目录首页，不建议删除。它负责说明领域边界、学习路线和文章入口。

### 3.2 归档目录

历史内容位于 `docs/archive/`，目前包括：

- `architecture-design/`
- `cs-basics/`
- `env-deploy/`
- `learn/`
- `life-hobbies/`
- `reading/`
- `spring/`

归档内容原则上只做兼容性修复和资源路径修复，不作为新知识的主要发布位置。若旧笔记经过系统重写，应在活动领域创建新的文章，而不是直接把归档文件改造成新文章。

## 4. 本地使用

### 4.1 安装依赖

在项目根目录执行：

```bash
node --version
pnpm --version
pnpm install --frozen-lockfile
```

如果本机尚未安装 pnpm，可以使用 Corepack 或按 pnpm 官方方式安装。版本不一致时，优先使用 `package.json` 中声明的 `packageManager` 版本。

### 4.2 启动开发服务器

```bash
pnpm run docs:dev
```

默认访问地址通常是 `http://localhost:5173`。开发服务器支持热更新，修改 Markdown、配置或主题文件后可以直接刷新浏览器查看结果。

### 4.3 构建和预览

```bash
pnpm run docs:build
pnpm run docs:preview
```

构建产物位于 `docs/.vitepress/dist/`，预览命令用于检查生产构建结果。`dist/`、`cache/` 和 `temp/` 都是生成目录，不要提交到 Git。

### 4.4 可用脚本

| 命令 | 作用 |
| --- | --- |
| `pnpm run docs:dev` | 启动 VitePress 开发服务器 |
| `pnpm run docs:build` | 构建静态站点 |
| `pnpm run docs:preview` | 预览最近一次生产构建 |

当前没有单独的 Markdown lint 或自动链接检查脚本，因此提交前至少要运行 `pnpm run docs:build`，并人工打开新增页面检查链接、代码块和图表。

## 5. 配置和主题维护

### 5.1 VitePress 配置

主要配置文件是 `docs/.vitepress/config.ts`，职责包括：

- `base`：站点部署路径，通过 `VITEPRESS_BASE` 环境变量覆盖。
- `lang`、`title`、`description`：站点元信息和中文语言设置。
- `nav`：顶部导航。
- `sidebar`：按 URL 前缀匹配的侧边栏。
- `search`：本地搜索。
- `markdown`：代码行号和 Mermaid fenced block 渲染。
- `srcExclude`：排除不参与发布的 `superpowers/` 文档。

新增文章不会自动出现在顶部导航或侧边栏。VitePress 会自动生成路由，但要让读者能从站点导航找到文章，必须同步修改侧边栏配置。

### 5.2 自定义主题

主题入口是 `docs/.vitepress/theme/index.ts`，当前负责注册首页组件、加载 CSS，并在路由变化和明暗主题切换后重新渲染 Mermaid。

主题文件的职责如下：

| 文件 | 职责 |
| --- | --- |
| `theme/index.ts` | 注册主题增强、组件和 Mermaid 生命周期 |
| `theme/components/HomePage.vue` | 首页内容和领域入口布局 |
| `theme/components/DomainIcon.vue` | 统一渲染领域图标 |
| `theme/icons.ts` | 图标名称、路径和无障碍标签注册表 |
| `theme/styles/index.css` | CSS 总入口和主题变量 |
| `theme/styles/typography.css` | 中文字体、标题、正文和代码排版 |
| `theme/styles/layout.css` | 首页、内容区和响应式布局 |
| `public/icons/*.svg` | 浏览器 favicon 或静态资源图标 |

修改主题时，优先复用现有 CSS 变量和组件边界。不要把首页样式、文章正文样式和 VitePress 配置全部堆在同一个文件中。

### 5.3 中文字体

当前主题使用本地优先的中文字体回退链，包括 `Noto Sans SC`、`Source Han Sans SC`、`PingFang SC`、`Hiragino Sans GB`、`Microsoft YaHei` 和系统字体。项目不依赖远程字体服务，因此部署后不会因为外部字体加载失败而出现空白或布局异常。

调整字体时需要同时检查：

1. 中文标题在桌面端和移动端是否换行自然。
2. 表格、代码块和 Mermaid 节点中的中文是否溢出。
3. 深色模式下文字和边框的对比度是否足够。
4. 中英文、数字和长 URL 混排时是否会撑破容器。

## 6. 新增文档流程

新增文章应按下面的顺序操作。

### 第一步：选择归属领域

根据文章主要回答的问题选择目录：

- 解释系统设计、模块边界、性能、可靠性或演进：`docs/architecture/`
- 解释模型、上下文、Agent、工具调用或 AI 编程原理：`docs/ai-programming/`
- 记录 AI 协作开发过程、规格、验证和复盘：`docs/vibe-coding/`
- 仅保存历史资料或暂时不属于主线的旧笔记：`docs/archive/`

一篇文章只选择一个主领域。跨领域内容可以通过 Markdown 链接互相引用，不要复制成两份。

### 第二步：创建 Markdown 文件

文件名建议使用小写英文和连字符，例如：

```text
docs/architecture/event-driven-tradeoffs.md
docs/ai-programming/prompt-context-design.md
docs/vibe-coding/agent-assisted-review.md
```

文件名一旦发布，尽量不要频繁修改。若必须改名，要同步检查站内链接、外部引用和侧边栏链接。

文章推荐使用以下 frontmatter：

```yaml
---
title: 事件驱动架构的权衡
description: 从边界、可靠性和可观测性分析事件驱动架构的适用场景。
---
```

正文建议包含：问题背景、核心概念、方案或原理、权衡、示例、验证结论和相关链接。知识笔记不要求每节固定，但要让读者能够判断结论的适用边界。

### 第三步：加入侧边栏

在 `docs/.vitepress/config.ts` 中找到对应领域的 sidebar，例如：

```ts
const architectureSidebar: DefaultTheme.SidebarItem[] = [
  { text: "架构知识", link: "/architecture/" },
  {
    text: "架构基础",
    items: [
      { text: "架构风格", link: "/architecture/architecture-styles" },
      { text: "事件驱动架构的权衡", link: "/architecture/event-driven-tradeoffs" },
    ],
  },
];
```

链接使用不带 `.md` 的站点路径。文章归属哪个 URL 前缀，就放入哪个领域的 sidebar。只有新增顶层领域时，才需要同时修改 `nav`、sidebar 映射和目录首页。

### 第四步：添加图片和附件

文章专属图片建议放在文章同级的资源目录，例如：

```text
docs/architecture/event-driven-tradeoffs.assets/overview.png
```

在 Markdown 中使用相对路径：

```md
![事件流转示意图](./event-driven-tradeoffs.assets/overview.png)
```

图片要使用能表达实际内容的清晰资源。提交前检查大小写、空格和相对路径；macOS 不敏感的文件系统可能掩盖了 Linux/GitHub Pages 上的路径大小写问题。

### 第五步：本地验证

```bash
pnpm run docs:build
pnpm run docs:dev
```

然后至少检查：文章 URL、侧边栏入口、目录内链接、中文排版、代码块、Mermaid 图和图片资源。新增文章如果没有加入 sidebar，构建仍可能成功，但导航体验是不完整的。

## 7. Markdown 和 Mermaid 约定

### 7.1 Markdown

- 使用 Markdown 标题层级，不要用连续加粗文本代替标题。
- 站内文章使用绝对站点路径，例如 `/architecture/architecture-views`。
- 外部链接使用完整 HTTPS URL，并确认目标仍然有效。
- 代码块标注语言，例如 `ts`、`bash`、`json` 或 `sql`，以便获得语法高亮。
- 长表格要确认移动端可以横向滚动，不要用空格对齐表格。
- 不要直接复制带有 VuePress 或 Theme Hope 专属组件的旧语法；归档文章若因此构建失败，应修复为标准 Markdown 或 VitePress 支持的语法。

### 7.2 Mermaid

使用标准 fenced block：

````md
```mermaid
flowchart LR
    User["读者"] --> Site["VitePress 站点"]
    Site --> Page["静态页面"]
```
````

当前主题会在浏览器端渲染 Mermaid，并根据站点明暗模式切换图表主题。图表内容应保持可读和安全：

- 节点中有中文、括号或其他标点时，优先使用引号包裹标签。
- 大图拆成多个局部图，避免一个图承担整篇文章的所有信息。
- 不要在 Mermaid 中嵌入不必要的 HTML 或脚本；主题使用严格安全级别。
- 修改 Mermaid 渲染逻辑后，必须检查首次打开、站内跳转和明暗模式切换三种状态。

## 8. 文档归档与迁移

归档已有内容时，保持原文章和同级资源目录的相对关系：

```text
docs/old-topic/note.md
docs/old-topic/note.assets/image.png
```

应整体移动为：

```text
docs/archive/old-topic/note.md
docs/archive/old-topic/note.assets/image.png
```

使用 `git mv` 记录移动，避免手动复制后产生重复文件。归档后需要检查文章内的相对图片链接和文章之间的相对链接。

新领域文章不要直接覆盖同名历史文章。可在新目录创建经过整理的版本，并在文章中说明与旧笔记的关系。

## 9. GitHub Pages 部署

当前部署入口是 `.github/workflows/deploy-docs.yml`：

1. 推送到 `main` 分支，或在 GitHub Actions 页面手动触发 `workflow_dispatch`。
2. GitHub Actions 使用 Node.js 20 和 pnpm 10.33.2 安装依赖。
3. 执行 `pnpm run docs:build`。
4. 上传 `docs/.vitepress/dist/`。
5. 通过 GitHub Pages 部署到 `github-pages` 环境。

仓库设置中需要将 Pages 的构建方式设置为 GitHub Actions。若仓库名称、部署域名或站点路径发生变化，应检查 `VITEPRESS_BASE` 和 `docs/.vitepress/config.ts` 中的 `base` 配置。

本仓库当前 workflow 使用 `VITEPRESS_BASE=/`，适用于 `sciencefl.github.io` 这种用户或组织站点。若改成普通项目站点，通常需要使用 `/<repository-name>/` 作为 base，并同步检查资源和链接。

## 10. Gitee Pages 迁移说明

当前仓库没有 Gitee 专用 workflow。迁移时可以继续复用静态构建产物：

```bash
pnpm install --frozen-lockfile
VITEPRESS_BASE=/ pnpm run docs:build
```

然后将 `docs/.vitepress/dist/` 作为 Gitee Pages 的发布目录。若 Gitee 使用项目子路径访问，需把 `VITEPRESS_BASE` 改为对应的 `/<仓库名>/`，并在部署前重新构建。

迁移到 Gitee 前应额外确认：仓库 Pages 功能权限、自动构建方式、域名路径、HTTPS 配置和构建 Node/pnpm 版本。不要同时把 `docs/.vitepress/dist/` 作为源码提交到仓库，除非托管平台明确要求使用独立发布分支。

## 11. 依赖、配置和发布维护

### 日常内容维护

- 新文章优先进入三个活动领域之一。
- 每篇文章补充 `title` 和 `description`。
- 文章结构先写结论和边界，再补充示例与推导。
- 代码、图表和图片都要在本地页面实际查看。
- 外部资料发生重大变化时，更新文章中的版本、日期或适用范围。

### 依赖升级

升级 VitePress、Mermaid 或 pnpm 时：

1. 修改 `package.json`。
2. 使用 pnpm 更新锁文件。
3. 执行 `pnpm install --frozen-lockfile` 验证锁文件可复现。
4. 执行 `pnpm run docs:build`。
5. 检查首页、一个活动文章、一个 Mermaid 页面和一个归档页面。

不要只修改 `package.json` 而不更新 `pnpm-lock.yaml`。依赖升级应尽量单独提交，便于定位构建或主题回归。

### 导航和主题改动

修改 `config.ts` 时重点检查路径是否与实际 Markdown 文件相符。修改主题时重点检查：

- 浅色和深色模式。
- 桌面端和移动端。
- 中文长标题、长链接和代码块。
- 首页入口、顶部导航、侧边栏和搜索结果。

## 12. 常见问题排查

### 页面构建失败

先执行：

```bash
pnpm install --frozen-lockfile
pnpm run docs:build
```

再根据报错判断是 Markdown 语法、导入路径、主题 TypeScript/Vue 代码还是 Mermaid 内容问题。最近新增的页面和最近修改的配置通常是第一排查范围。

### 页面存在但导航找不到

确认文章文件位于正确的 `docs/<domain>/` 目录，并在 `docs/.vitepress/config.ts` 对应 sidebar 中添加了不带 `.md` 的链接。

### 图片本地能看，线上看不到

检查图片是否被 Git 跟踪、相对路径是否正确、文件名大小写是否完全一致，以及是否错误地使用了本机绝对路径。

### Mermaid 空白或显示源码

确认代码块语言是 `mermaid`，没有误写成普通代码块；然后检查 `docs/.vitepress/theme/index.ts` 的渲染逻辑。修改主题或切换明暗模式后，刷新页面并重新进入文章验证。

### GitHub Pages 页面资源 404

检查 `VITEPRESS_BASE` 是否与实际访问路径一致。用户站点通常使用 `/`，项目站点通常使用 `/<仓库名>/`。

## 13. 提交前检查清单

```text
[ ] 文件位于正确的活动领域目录，或明确属于 archive
[ ] frontmatter 含 title 和 description
[ ] 站内链接使用正确的 VitePress 路径
[ ] 新文章已经加入对应 sidebar
[ ] 图片和附件使用相对路径，大小写完全一致
[ ] Mermaid 在浅色和深色模式下都能显示
[ ] 中文标题、表格和代码块在移动端没有溢出
[ ] pnpm run docs:build 执行成功
[ ] 没有提交 docs/.vitepress/dist、cache 或 temp
[ ] workflow 的构建目录仍为 docs/.vitepress/dist
```

推荐提交信息按内容分类，例如：

```text
docs: add event-driven architecture note
docs: update AI programming navigation
style: improve Chinese typography
chore: upgrade VitePress
```
