import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
        // 应该把更精确的路径放置在前边
        "/architecture-design/":
            [
                {
                    text: "设计原则与设计思想",
                    icon: "basic",
                    link: "设计原则与思想",
                },
            ],
        // 必须放在最后面
        "/":
            [
                {
                    text: "如何使用",
                    icon: "laptop-code",
                    link: "architecture-design/",
                },
            ],
    }

);
