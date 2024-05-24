import {hopeTheme} from "vuepress-theme-hope";
import {zhNavbar} from './navbar/index.js';
import {sideBar} from "./sidebar/index.js";
import {searchProPlugin} from "vuepress-plugin-search-pro";

export default hopeTheme({
    hostname: "https://www.m1yellow.cn",

    author: {
        name: "Ming1",
        url: "https://www.m1yellow.cn",
        email: "m1yellow@163.com",
    },

    lastUpdated: true,

    // https://mister-hope.com/ Mister-Hope.github.io
    iconAssets: ["//at.alicdn.com/t/font_2410206_vuzkjonf4s9.css", "//at.alicdn.com/t/c/font_4524232_99v1wxn1x8j.css"],
    //iconAssets: "iconfont",
    iconPrefix: "iconfont icon-",

    logo: "/logo.svg",

    repo: "https://github.com/m1yellow",

    // navbar
    navbar: zhNavbar,

    // sidebar
    sidebar: sideBar,

    // 编辑此页链接
    //lastUpdated: 是否显示页面最后更新时间
    //contributors: 是否显示页面贡献者
    editLink: false, //是否展示编辑此页链接
    //docsRepo: 文档仓库地址，默认同主题选项中的 repo
    //docsDir: 文档在仓库中的目录，默认为根目录
    //docsBranch: 文档存放的分值，默认为 "main"

    headerDepth: 4, // 标题渲染深度，默认2

    // 版权信息，默认就是false
    //copyright: false,
    //copyright: "基于 MIT 协议，© 2019-至今 Mr.Hope",

    footer: "<a href=\"https://beian.miit.gov.cn/\" rel=\"noopener noreferrer\" target=\"_blank\">湘ICP备2022015684号-1</a> | 主题使用 <a href=\"https://theme-hope.vuejs.press/zh/\" rel=\"noopenner noreferrer \" target=\"_blank\">vuepress-theme-hope</a>",

    displayFooter: true,

    pageInfo: ["Author", "Category", "Date", "Original", "Tag", "ReadingTime", "Word", "PageView"],

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

    // 主题色选择器
    themeColor: true,
    // 显示全屏按钮
    fullscreen: true,
    //navbarAutoHide: 'always',

    plugins: {
        copyright: false,
        copyCode: {},
        searchPro: searchProPlugin({
            // 搜索建议
            autoSuggestions: false,
            // 索引全部内容
            indexContent: true,
            // 为分类和标签添加索引
            customFields: [
                {
                    getter: (page: any) => page.frontmatter.category,
                    formatter: "分类：$content",
                },
                {
                    getter: (page) => page.frontmatter.tag,
                    formatter: "标签：$content",
                },
            ],
        }),
        blog: {
            excerptLength: 200,
        },
        feed: {
            atom: true,
            json: true,
            rss: true,
        },
        // Markdown 增强
        mdEnhance: {
            // 开启标记
            mark: true,
            // 启用任务列表
            tasklist: true,
            // 脚注
            footnote: true,
            // 自定义对齐
            align: true,
            // 选项卡
            tabs: true,
            // 代码块分组
            codetabs: true,
            // 启用 GFM 警告
            alert: true,
            // 提示容器
            hint: true,
            // 图片相关
            // 描述
            figure: false,
            // 懒加载
            imgLazyload: true,
            // 标记
            imgMark: true,
            // 大小
            imgSize: true,
            // 使用 KaTeX 启用 TeX 支持
            katex: true,
            // 使用 mathjax 启用 TeX 支持
            mathjax: true,
            // 启用下角标功能
            sub: true,
            // 启用上角标
            sup: true,
            // 代码演示
            demo: true,
        },
    },
});
