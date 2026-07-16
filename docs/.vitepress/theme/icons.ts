export type DomainIconName =
  | "architecture"
  | "ai-programming"
  | "vibe-coding"
  | "archive";

export const domainIcons: Record<DomainIconName, { label: string; paths: string[] }> = {
  architecture: {
    label: "架构知识",
    paths: ["M4 5h16M4 12h16M4 19h16", "M7 3v18M17 3v18"],
  },
  "ai-programming": {
    label: "AI 编程与原理",
    paths: ["M8 8h8v8H8z", "M4 8h4M16 8h4M4 16h4M16 16h4", "M8 4v4M16 4v4M8 16v4M16 16v4"],
  },
  "vibe-coding": {
    label: "Vibe Coding",
    paths: ["M5 6h14v12H5z", "m8 10 2 2-2 2M12 14h4", "M4 20h16"],
  },
  archive: {
    label: "历史文档归档",
    paths: ["M4 7h16v13H4z", "M3 4h8l2 3h8", "M9 12h6"],
  },
};
