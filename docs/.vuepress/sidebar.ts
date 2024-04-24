import {sidebar} from "vuepress-theme-hope";

export const sidebarConfig = sidebar({
    "/note/": [
        {text: "关于博客", icon: "creative", link: "关于博客"},
        {text: "生活感悟", icon: "blog", link: "2022生活感悟摘要"},
    ],
    "/tech/": [
        {
            text: "计算机原理",
            icon: "computer",
            prefix: "00_01_计算机基础原理/",
            collapsible: true,
            children: ['计算机基础原理'],
        },
        {
            text: "计算机网络",
            icon: "rss",
            prefix: "00_02_计算机网络/",
            collapsible: true,
            children: [
                //{text: "计算机网络", icon: "rss", link: "计算机网络"},
                //"计算机网络.md",
                "计算机网络",
            ],
        },
        {
            text: "操作系统",
            icon: "windows",
            prefix: "00_03_操作系统/",
            collapsible: true,
            children: ["进程与线程",],
        },
        {
            text: "Linux",
            icon: "linux",
            prefix: "00_04_Linux/",
            collapsible: true,
            children: ['Linux服务器部署操作记录',]
        },
        {
            text: "汇编原理",
            icon: "process",
            prefix: "00_05_汇编原理/",
            collapsible: true,
            children: ['汇编原理'],
        },
        {
            text: "Java",
            icon: "java",
            prefix: "01_01_Java/",
            collapsible: true,
            children: [
                'Java基础',
                'Java设计模式',
                'Java多线程并发编程',
                'JVM性能调优',
            ],
        },
        {
            text: "数据结构与算法",
            icon: "tree",
            prefix: "01_02_数据结构与算法/",
            collapsible: true,
            children: ['数据结构与算法基础',],
        },
        {
            text: "数据库",
            icon: "mysql",
            prefix: "01_03_数据库-核心原理与性能优化/",
            collapsible: true,
            children: ['MySQL资料教程',],
        },
        {
            text: "Spring",
            icon: "leaf",
            prefix: "01_05_Spring框架与微服务/",
            collapsible: true,
            children: ['Spring资料教程', 'SpringBoot资料教程', 'SpringCloud资料教程'],
        },
        {
            text: "Web后端",
            icon: "storage",
            prefix: "01_04_Web后端/",
            collapsible: true,
            children: ['项目实战及调优'],
        },
        {
            text: "Web前端",
            icon: "page",
            prefix: "02_01_Web前端/",
            collapsible: true,
            children: ['Vue资料教程'],
        },
        {
            text: "项目管理",
            icon: "customize",
            prefix: "03_01_项目构建与管理/",
            collapsible: true,
            children: ['Maven使用教程', 'Git使用教程'],
        },
        {
            text: "分布式",
            icon: "any",
            prefix: "03_02_分布式系统架构/",
            collapsible: true,
            children: ['Redis资料教程', 'Dubbo资料教程', 'Nginx资料教程', 'Docker资料教程', 'MQ消息中间件资料教程', ],
        },
        //"c.md",
        //"python",
    ],

});
