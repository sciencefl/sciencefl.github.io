<script setup lang="ts">
import DomainIcon from "./DomainIcon.vue";
import type { DomainIconName } from "../icons";

const entries: Array<{
  name: DomainIconName;
  eyebrow: string;
  title: string;
  description: string;
  link: string;
}> = [
  {
    name: "architecture",
    eyebrow: "01 / ARCHITECTURE",
    title: "架构知识",
    description: "从架构风格、质量属性到分布式系统，建立可用于分析和设计的思维框架。",
    link: "/architecture/",
  },
  {
    name: "ai-programming",
    eyebrow: "02 / AI PROGRAMMING",
    title: "AI 编程与原理",
    description: "理解模型、上下文、工具调用和 Agent，让 AI 编程从经验走向可解释。",
    link: "/ai-programming/",
  },
  {
    name: "vibe-coding",
    eyebrow: "03 / VIBE CODING",
    title: "Vibe Coding",
    description: "记录从想法、规格到实现和验证的协作工作流，沉淀可复用的实践方法。",
    link: "/vibe-coding/",
  },
];
</script>

<template>
  <main class="site-home">
    <section class="home-intro">
      <p class="home-kicker">FLYNN NOTES / KNOWLEDGE WORKBENCH</p>
      <h1>把零散学习，沉淀为可复用知识。</h1>
      <p class="home-summary">这里记录架构、AI 编程和 Vibe Coding 的概念、实践与复盘。每一篇笔记都尽量回答一个具体问题，并留下可以继续验证的路径。</p>
    </section>
    <section class="domain-grid" aria-label="知识领域">
      <a v-for="entry in entries" :key="entry.name" class="domain-entry" :class="`domain-entry--${entry.name}`" :href="entry.link">
        <span class="domain-icon"><DomainIcon :name="entry.name" :size="30" /></span>
        <span class="domain-eyebrow">{{ entry.eyebrow }}</span>
        <strong>{{ entry.title }}</strong>
        <span class="domain-description">{{ entry.description }}</span>
        <span class="domain-arrow" aria-hidden="true">→</span>
      </a>
    </section>
    <section class="home-footer-row">
      <div>
        <p class="home-kicker">ARCHIVE</p>
        <h2>旧笔记仍然保留，新的结构从这里开始。</h2>
      </div>
      <a class="archive-link" href="/archive/">浏览历史文档 <span aria-hidden="true">→</span></a>
    </section>
  </main>
</template>
