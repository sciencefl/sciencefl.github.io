# VitePress Knowledge Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current VuePress site with a custom VitePress knowledge site centered on architecture, AI programming and principles, and Vibe Coding, while preserving current documents under `/archive/`.

**Architecture:** Keep `docs/` as the VitePress content root. Put active knowledge domains at the root, move every existing content directory under `docs/archive/`, and keep site behavior in focused files under `docs/.vitepress/`. Use VitePress for static Markdown rendering, a small custom Vue theme for the home page and icons, and a static build compatible with GitHub Pages and Gitee Pages.

**Tech Stack:** VitePress, Vue 3, TypeScript, Mermaid, Shiki, pnpm, GitHub Actions, custom SVG icons, CSS font fallbacks.

---

### Task 1: Replace package metadata and archive existing documents

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Delete: `package-lock.json`
- Move: `docs/README.md` to `docs/archive/index.md`
- Move: `docs/intro.md` to `docs/archive/intro.md`
- Move: `docs/architecture-design/`, `docs/cs-basics/`, `docs/env-deploy/`, `docs/learn/`, `docs/life-hobbies/`, `docs/reading/`, and `docs/spring/` below `docs/archive/`.

- [ ] **Step 1: Inventory current content.** Run `find docs -maxdepth 2 -type f -not -path 'docs/.vuepress/*' | sort` and confirm all Markdown files and local image assets are accounted for.
- [ ] **Step 2: Move content without rewriting it.** Use `mkdir -p docs/archive` followed by `git mv` for each listed file/directory. Preserve the `learn/数据要素学习报告.assets/` directory next to its Markdown document.
- [ ] **Step 3: Replace package metadata.** Use scripts `docs:dev: vitepress dev docs`, `docs:build: vitepress build docs`, and `docs:preview: vitepress preview docs`; retain `type: module`, `packageManager: pnpm@10.33.2`, and add VitePress plus Mermaid dependencies. Run `pnpm install` to regenerate `pnpm-lock.yaml` and remove VuePress/Theme Hope dependencies.
- [ ] **Step 4: Confirm archive completeness.** Run `find docs/archive -type f | sort` and compare with the pre-migration inventory. No old URL redirect is required.

### Task 2: Create VitePress configuration and navigation

**Files:**
- Create: `docs/.vitepress/config.ts`
- Create: `docs/.vitepress/theme/index.ts`
- Delete: old source files under `docs/.vuepress/` including `config.ts`, `theme.ts`, `navbar/`, `sidebar/`, and `styles/`.

- [ ] **Step 1: Configure the site.** Set `lang: "zh-CN"`, title, description, `cleanUrls: true`, `lastUpdated: true`, local search, outline levels 2-3, GitHub social link, and a configurable base path.
- [ ] **Step 2: Define explicit sidebars.** Add typed sidebar arrays for `/architecture/`, `/ai-programming/`, `/vibe-coding/`, and `/archive/`. Use English stable routes and Chinese display labels.
- [ ] **Step 3: Register the custom theme.** Import the default VitePress theme, custom Vue components, and the new stylesheet entry point. Do not import any VuePress or Hope module.
- [ ] **Step 4: Remove generated old output.** Delete `.vuepress` caches and generated output; add only VitePress cache/temp/dist paths to `.gitignore`.
- [ ] **Step 5: Run `pnpm run docs:build`.** The first build must resolve VitePress without references to the old bundler.

### Task 3: Build the custom theme, typography, and icons

**Files:**
- Create: `docs/.vitepress/theme/styles/index.css`, `typography.css`, and `layout.css`.
- Create: `docs/.vitepress/theme/icons.ts`.
- Create: `docs/.vitepress/theme/components/DomainIcon.vue` and `HomePage.vue`.
- Create: `docs/public/icons/architecture.svg`, `ai-programming.svg`, `vibe-coding.svg`, and `archive.svg`.

- [ ] **Step 1: Define theme tokens.** Add light/dark surface, text, border, and domain accent variables. Avoid gradients and decorative blobs.
- [ ] **Step 2: Define Chinese typography.** Use `Noto Sans SC`, `Source Han Sans SC`, `PingFang SC`, `Hiragino Sans GB`, `Microsoft YaHei`, and `system-ui` as fallbacks. Set readable Chinese line height, heading spacing, `word-break: break-word`, table horizontal scrolling, and a monospace code stack. Do not require remote fonts.
- [ ] **Step 3: Define the icon registry.** Map `architecture`, `ai-programming`, `vibe-coding`, and `archive` to SVG paths and accessible labels. `DomainIcon.vue` accepts `name`, `size`, and optional `label` and renders a consistent 24x24 viewBox.
- [ ] **Step 4: Implement the home component.** Render the site statement, three domain entries, and archive entry using semantic links. Make the layout responsive and avoid nested cards.
- [ ] **Step 5: Inspect desktop and mobile views.** Check the home page, navigation, domain labels, Chinese headings, and buttons for overlap or overflow.

### Task 4: Create active domains and content templates

**Files:**
- Create: `docs/index.md`.
- Create: `docs/architecture/index.md`, `architecture-styles.md`, `quality-attributes.md`, and `architecture-views.md`.
- Create: `docs/ai-programming/index.md`, `llm-principles.md`, `context-and-tokens.md`, and `agents-and-tools.md`.
- Create: `docs/vibe-coding/index.md`, `workflow.md`, `spec-first.md`, and `verification.md`.
- Create: `docs/archive/index.md` if the moved README needs a dedicated archive landing page.

- [ ] **Step 1: Create the new home page.** Link only to `/architecture/`, `/ai-programming/`, `/vibe-coding/`, and `/archive/`; do not reuse the current Hero or logo frontmatter.
- [ ] **Step 2: Write each domain index.** Include scope, learning route, article groups, and links to starter notes. Keep AI principles separate from Vibe Coding practices.
- [ ] **Step 3: Add representative notes.** Use frontmatter with `title` and `description`, include practical examples, and add at least one Mermaid diagram in the active content.
- [ ] **Step 4: Build the archive index.** List every archived directory and state that the content is historical; link to its new `/archive/.../` route.
- [ ] **Step 5: Run `pnpm run docs:build`.** All active pages and archive pages must be generated without Markdown route errors.

### Task 5: Add Mermaid, search, code behavior, and deployment

**Files:**
- Modify: `docs/.vitepress/config.ts` and `docs/.vitepress/theme/index.ts`.
- Modify: `.github/workflows/deploy-docs.yml`.
- Modify: `.gitignore`.
- Create `docs/.vitepress/theme/components/MermaidBlock.vue` only if the selected Mermaid integration requires a custom renderer.

- [ ] **Step 1: Register Mermaid.** Use a VitePress-compatible integration for `mermaid` fenced blocks. Initialize after theme changes and set strict security behavior.
- [ ] **Step 2: Verify code blocks and local search.** Test copy, line highlighting, indexing, search results, an active page, and an archived page.
- [ ] **Step 3: Replace deployment.** Build with Node 20 and pnpm, deploy `docs/.vitepress/dist`, and remove every reference to `docs/.vuepress/dist`.
- [ ] **Step 4: Verify the artifact.** Run `pnpm run docs:build`, then verify `docs/.vitepress/dist/index.html` and `docs/.vitepress/dist/archive/index.html` exist.

### Task 6: Final verification and cleanup

**Files:**
- Modify files required by verification failures.
- Delete obsolete generated `.vuepress` output and caches.

- [ ] **Step 1: Run a clean install.** Remove `node_modules` and generated VitePress output, run `pnpm install --frozen-lockfile`, and run `pnpm run docs:build`.
- [ ] **Step 2: Scan for removed personalization.** Run `rg -n "vuepress|theme-hope|\.vuepress|FontAwesome|flynndocs-icon" package.json docs .github || true`; no active configuration may reference the old stack.
- [ ] **Step 3: Verify route and asset integrity.** Check the home page, all three domain indexes, a code page, a Mermaid page, and an archived page with image assets at desktop and mobile widths.
- [ ] **Step 4: Verify deployment.** Confirm the build path is `docs/.vitepress/dist`, the root base is correct for `sciencefl.github.io`, and no redirect configuration exists.
- [ ] **Step 5: Commit focused changes.** Commit archive/package migration, theme/content, and deployment separately. Never stage `.superpowers/` or generated VitePress output.
