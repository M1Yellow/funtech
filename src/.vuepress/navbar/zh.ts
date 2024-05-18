import {navbar} from 'vuepress-theme-hope';

export const zhNavbar = navbar([
    //"/",
    "/home",
    {
        text: "技术学习",
        icon: "ability",
        prefix: "/tech/", // 添加了路径path，图片路径也会自动带上
        children: [
            {
                text: "计算机原理",
                icon: "computer", // 总菜单暂不支持图标
                prefix: "00_01_计算机基础原理/", // 需要有 children 配置才有效
                link: "00_01_计算机基础原理/计算机基础原理" // 非 children 配置，需要带上目录path路径，以便文档中的图片能正常访问
            },
            {
                text: "计算机网络",
                icon: "rss",
                prefix: "00_02_计算机网络/",
                link: "00_02_计算机网络/计算机网络"
            },
            {
                text: "操作系统",
                icon: "windows",
                prefix: "00_03_操作系统/",
                link: "00_03_操作系统/进程与线程"
            },
            {
                text: "Linux",
                icon: "linux",
                prefix: "00_04_Linux/",
                link: "00_04_Linux/Linux服务器部署操作记录"
            },
            {
                text: "汇编原理",
                icon: "process",
                prefix: "00_05_汇编原理/",
                link: "00_05_汇编原理/汇编原理"
            },
            {
                text: "Java",
                icon: "java",
                prefix: "01_01_Java/",
                link: "01_01_Java/Java基础"
            },
            {
                text: "数据结构与算法",
                icon: "tree",
                prefix: "01_02_数据结构与算法/",
                link: "01_02_数据结构与算法/数据结构与算法基础"
            },
            {
                text: "数据库",
                icon: "mysql",
                prefix: "01_03_数据库-核心原理与性能优化/",
                link: "01_03_数据库-核心原理与性能优化/MySQL资料教程"
            },
            {
                text: "Spring",
                icon: "leaf",
                prefix: "01_05_Spring框架与微服务/",
                link: "01_05_Spring框架与微服务/Spring资料教程"
            },
            {
                text: "Web后端",
                icon: "storage",
                prefix: "01_04_Web后端/",
                link: "01_04_Web后端/项目实战及调优"
            },
            {
                text: "Web前端",
                icon: "page",
                prefix: "02_01_Web前端/",
                link: "02_01_Web前端/Vue资料教程"
            },
            {
                text: "项目管理",
                icon: "customize",
                prefix: "03_01_项目构建与管理/",
                link: "03_01_项目构建与管理/Git使用教程"
            },
            {
                text: "分布式",
                icon: "any",
                prefix: "03_02_分布式系统架构/",
                link: "03_02_分布式系统架构/Redis资料教程"
            },
        ],
    },
    {
        text: "开发工具",
        icon: "software",
        prefix: "/tool/",
        children: [
            {
                text: "IDEA内存优化",
                icon: "operate",
                prefix: "10_01_开发环境和工具/",
                link: "10_01_开发环境和工具/IDEA占用内存优化"
            },
        ],
    },
    {
        text: "随笔记录",
        icon: "note",
        prefix: "/note/",
        children: [
            {text: "关于博客", icon: "creative", link: "关于博客"},
            {text: "生活感悟", icon: "blog", link: "生活感悟记录"},
        ],
    },
]);
