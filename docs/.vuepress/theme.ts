import {hopeTheme} from "vuepress-theme-hope";
import navbar from "./navbar";
import {sidebarConfig} from "./sidebar";

export default hopeTheme({
    hostname: "https://www.m1yellow.cn",

    author: {
        name: "Ming1",
        url: "https://www.m1yellow.cn",
    },

    lastUpdated: true,

    iconAssets: "iconfont",

    logo: "/logo.svg",

    repo: "https://github.com/m1yellow",

    docsDir: "docs",

    // navbar
    navbar: navbar,

    // sidebar
    sidebar: sidebarConfig,

    // 编辑此页链接
    //lastUpdated: 是否显示页面最后更新时间
    //contributors: 是否显示页面贡献者
    editLink: false, //是否展示编辑此页链接
    //docsRepo: 文档仓库地址，默认同主题选项中的 repo
    //docsDir: 文档在仓库中的目录，默认为根目录
    //docsBranch: 文档存放的分值，默认为 "main"


    copyright: false,

    footer: "<a href=\"https://beian.miit.gov.cn/\" rel=\"noopener noreferrer\" target=\"_blank\">湘ICP备2022015684号-1</a> | 主题使用 <a href=\"https://vuepress-theme-hope.github.io/v2/zh/\" rel=\"noopenner noreferrer \" target=\"_blank\">vuepress-theme-hope</a>",

    displayFooter: true,

    pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

    blog: {
        description: "兴趣成果驱动",
        intro: "/intro.html",
        medias: {
            GitHub: "https://github.com/m1yellow",
            Gitee: "https://gitee.com/fa7x1a0y1",
        },
    },

    encrypt: {
        config: {
            "/guide/encrypt.html": ["1234"],
        },
    },

    themeColor: {
        blue: "#087CFA",
        red: "#FE2857",
        green: "#21D789",
        orange: "#FC801D",
        pink: "#FF318C",
        lightBlue: "#07C3F2",
    },

    fullscreen: true,

    plugins: {
        blog: {
            autoExcerpt: true,
        },
        feed: {
            atom: true,
            json: true,
            rss: true,
        },
        mdEnhance: {
            // 开启标记
            mark: true,
            // 启用任务列表
            tasklist: true,
            // 脚注
            footnote: true,
            // 自定义对齐
            align: true,
            // 启用图片懒加载
            //imageLazyload: true, // 不在配置项
            lazyLoad: true,
            // 启用图片标记
            imageMark: true,
            // 启用图片大小
            imageSize: true,
            // 启用 TeX 支持
            tex: true,
            // 启用下角标功能
            sub: true,
            // 启用上角标
            sup: true,
            // 代码块分组
            codetabs: true,
            // 代码演示
            demo: true,
          },
    },
});
