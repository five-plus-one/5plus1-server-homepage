export const siteConfig = {
  servers: [
    {
      id: "survival",
      name: "生存世界",
      englishName: "SURVIVAL",
      address: "server26.mc.five-plus-one.com",
      gameVersion: "26.2",
      javaVersion: "25",
      tagline: "从第一块木头，到一座属于我们的城。",
      description:
        "探索、采集、修一条通往朋友家的路。在日常的冒险里，慢慢留下自己的故事。",
      features: ["生存探索", "聚落建设", "联机生活"],
      downloadUrl:
        "https://files.mc.five-plus-one.com/server26/download/survival_26_autoupdate.zip",
    },
    {
      id: "creative",
      name: "创造世界",
      englishName: "CREATIVE",
      address: "creative26.mc.five-plus-one.com",
      gameVersion: "1.21.1",
      javaVersion: "21",
      tagline: "让脑海里的风景，成为可以走进去的世界。",
      description:
        "用丰富的建筑方块与家具布置空间，借助投影与建造工具，把每个灵感变成作品。",
      features: ["自由建造", "建筑与家具", "投影辅助"],
      downloadUrl:
        "https://files.mc.five-plus-one.com/creative26-bo/download/server_26_bo_autoupdate_v2.zip",
    },
  ],
  skinSiteUrl: "https://skin.mc.five-plus-one.com",
  statusUrl: "https://status.five-plus-one.com/status/mc",
  community: {
    qqGroupNumber: "966619341",
    qqJoinUrl: "https://qm.qq.com/q/uue8RlGTtY",
    ownerContactUrl: "https://r-l.ink/contact",
  },
  friendLinks: { fivePlusOneHome: "https://r-l.ink/home" },
} as const;
export type Server = (typeof siteConfig.servers)[number];
