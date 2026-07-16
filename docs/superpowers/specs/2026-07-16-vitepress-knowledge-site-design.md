# VitePress Knowledge Site Redesign

## Goal

> Replace the current VuePress 2 and vuepress-theme-hope site with a VitePress static knowledge site. The new site will focus on three primary domains: architecture knowledge, AI programming and principles, and Vibe Coding. Existing documents will be preserved under `/archive/` without legacy URL redirects.

## Scope

### Included

- Remove the current VuePress bundler, Hope theme, navbar/sidebar configuration, blog configuration, and Font Awesome icon configuration.
- Use VitePress with TypeScript, Markdown, Mermaid, Shiki, local search, custom Vue components, and a static deployment workflow.
- Create a new custom home page and documentation shell inspired by the information architecture of OpenAI and MCP documentation.
- Create new navigation and starter content structures for the three primary domains.
- Move all existing document directories and their local assets below `docs/archive/`, preserving relative media paths.
- Add a custom SVG icon set, Chinese-friendly typography, light/dark themes, and responsive desktop/mobile layouts.
- Keep the build output compatible with GitHub Pages and Gitee Pages.

### Excluded

- Redirecting old routes.
- Rewriting every archived article during the initial migration.
- Adding a backend, login system, database, CMS, or runtime API.
- Depending on externally hosted fonts or icon CDNs for core rendering.

## Target Structure

```text
docs/
├── index.md
├── architecture/
├── ai-programming/
├── vibe-coding/
├── archive/
│   ├── architecture-design/
│   ├── cs-basics/
│   ├── env-deploy/
│   ├── learn/
│   ├── life-hobbies/
│   ├── reading/
│   └── spring/
├── public/
└── .vitepress/
    ├── config.ts
    └── theme/
        ├── index.ts
        ├── components/
        ├── icons/
        └── styles/
```

The active navigation will expose the three primary domains and the archive. Stable English directory names will be used for routes; Chinese titles will be used for display text.

## Theme Design

The site will use a restrained documentation layout: a top navigation bar, a collapsible left navigation tree, a constrained reading column, and a right-side outline on wide screens. Mobile layouts will collapse the navigation and outline without horizontal overflow.

The home page will be a custom VitePress home layout implemented with VitePress-compatible Vue components. It will present the three primary domains, a short site statement, quick entry points, and the archive entry. It will not reuse the current Hero, logo, blog, or Hope theme configuration.

Custom SVG icons will cover the three primary domains, archive, navigation, search, theme switching, and other site-level actions. Domain icons will share a stroke, viewBox, and sizing system and will not depend on an external icon CDN.

Typography will use a Chinese-first fallback stack such as Noto Sans SC, Source Han Sans SC, PingFang SC, Hiragino Sans GB, Microsoft YaHei, and system-ui. Code blocks will use a monospace fallback stack. Line height, word wrapping, table overflow, and heading spacing will be tuned for Chinese reading. Core rendering will not depend on remote fonts.

## Markdown And Content

VitePress Markdown will provide frontmatter, code highlighting, line numbers, copy actions, custom containers, and local search. Mermaid fenced blocks will render diagrams in both light and dark themes. Article frontmatter will standardize title, description, category, tags, and ordering where needed.

The active content areas will start with a knowledge map and representative notes:

- Architecture: architecture styles, 4+1 views, 4A architecture, modeling, quality attributes, distributed systems, design principles, patterns, and case studies.
- AI programming and principles: LLM concepts, tokens and context, prompting, tool use, agents, RAG/context engineering, coding assistants, and evaluation.
- Vibe Coding: requirements and specifications, agent workflows, collaboration, verification, testing, debugging, project practices, and boundaries.

Archived documents will be moved as-is where possible. Their relative asset directories will move with the source document so existing local image references remain valid.

## Deployment

The package manager will be standardized on pnpm. The build will produce `docs/.vitepress/dist`. GitHub Actions will build the static site and deploy it to GitHub Pages. The same output will remain usable for Gitee Pages or another static host. The site base path will be configurable through the deployment environment rather than hard-coded into content links.

## Migration Sequence

1. Replace package metadata and dependencies with VitePress and the selected Markdown/Mermaid tooling.
2. Move all current document directories and their assets under `docs/archive/`.
3. Remove the old `.vuepress` configuration and create the new VitePress configuration.
4. Add the active domain directories, landing pages, navigation, and content templates.
5. Implement the new home page, documentation shell, icon system, typography, and responsive styles.
6. Add Mermaid, local search, code-block behavior, and theme switching.
7. Replace the deployment workflow and document local development/build commands.
8. Build and verify route generation, archived media, Mermaid output, Chinese typography, responsive layout, and deployment artifacts.

## Acceptance Criteria

- A clean pnpm install can run development, build, and preview commands.
- No VuePress or vuepress-theme-hope configuration or dependency remains.
- The home page is the new custom page and exposes the three primary domains and archive.
- Existing documents are accessible under `/archive/` and old routes are intentionally not redirected.
- Mermaid diagrams render in light and dark modes.
- Chinese headings, paragraphs, tables, and code blocks render without broken glyphs or overflow.
- The layout is usable on desktop and mobile widths.
- GitHub Pages deployment succeeds and the generated static directory can be uploaded to Gitee Pages.
