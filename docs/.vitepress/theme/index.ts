import { nextTick, type App } from "vue";
import { inBrowser } from "vitepress";
import DefaultTheme from "vitepress/theme";
import HomePage from "./components/HomePage.vue";
import "./styles/index.css";

const renderMermaid = async () => {
  if (!inBrowser) return;
  await nextTick();
  const nodes = Array.from(document.querySelectorAll<HTMLElement>(".mermaid"));
  if (nodes.length === 0) return;

  const mermaid = (await import("mermaid")).default;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: document.documentElement.classList.contains("dark") ? "dark" : "default",
  });
  await mermaid.run({ nodes });
};

export default {
  ...DefaultTheme,
  enhanceApp({ app, router }: { app: App; router: { onAfterRouteChange?: (to: string) => void } }) {
    app.component("HomePage", HomePage);
    if (!inBrowser) return;
    const scheduleMermaid = () => window.setTimeout(() => void renderMermaid(), 0);
    router.onAfterRouteChange = () => scheduleMermaid();
    scheduleMermaid();
    window.addEventListener("vitepress:theme-appearance", scheduleMermaid);
  },
};
