import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar(
    {
        "/":
        [
            {
                text: "如何使用",
                icon: "laptop-code",
                link: "architecture-design/",
            },
        ],
        "/architecture-design/":
            [
                {
                    text: "设计原则与设计思想",
                    icon: "basic",
                    prefix: "architecture-design/",
                    children: ["设计原则与思想"]
                },
            ],
    }

);
