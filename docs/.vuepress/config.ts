import {defineUserConfig} from "vuepress";
import {mdEnhancePlugin} from "vuepress-plugin-md-enhance";
import theme from "./theme";


const {searchPlugin} = require('@vuepress/plugin-search');


export default defineUserConfig({

    /*
    TODO 注意事项：
    1. 测试环境没问题，vite 编译打包【空格】不兼容
    2. md 文件内容中不能包含 <font>、<update> 等非标准标签，否则会报 Rendering pages - failed TypeError: Invalid value used as weak map key
    */

    //host: "localhost",
    port: 80,
    lang: "zh-CN",
    title: "mypages",
    description: "mypages 学习教程",

    // 根路径
    base: "/",
    //指定 vuepress build 的输出目录
    dest: "funtech",
    //shouldPrefetch: false,

    plugins: [
        mdEnhancePlugin({
            // 开启标记
            mark: true,
            // 启用任务列表
            tasklist: true,
            // 启用图片大小
            imageSize: true,
            // 启用 TeX 支持
            tex: true,
        }),
        searchPlugin({
            // https://v2.vuepress.vuejs.org/zh/reference/plugin/search.html
            // 排除首页
            isSearchable: (page) => page.path !== "/",
            maxSuggestions: 10,
            hotKeys: ["s", "/"],
            // 用于在页面的搜索索引中添加额外字段
            getExtraFields: () => [],
            locales: {
                "/": {
                    placeholder: "搜索",
                },
            },
        }),

        /*
        docsearchPlugin({
            appId: "O566AMFNJH",
            apiKey: "d9aebea8bd1a4f1e01201464bbab255f",
            indexName: "tobebetterjavaer",
            locales: {
                "/": {
                    placeholder: "搜索文档",
                    translations: {
                        button: {
                            buttonText: "搜索文档",
                            buttonAriaLabel: "搜索文档",
                        },
                        modal: {
                            searchBox: {
                                resetButtonTitle: "清除查询条件",
                                resetButtonAriaLabel: "清除查询条件",
                                cancelButtonText: "取消",
                                cancelButtonAriaLabel: "取消",
                            },
                            startScreen: {
                                recentSearchesTitle: "搜索历史",
                                noRecentSearchesText: "没有搜索历史",
                                saveRecentSearchButtonTitle: "保存至搜索历史",
                                removeRecentSearchButtonTitle: "从搜索历史中移除",
                                favoriteSearchesTitle: "收藏",
                                removeFavoriteSearchButtonTitle: "从收藏中移除",
                            },
                            errorScreen: {
                                titleText: "无法获取结果",
                                helpText: "你可能需要检查你的网络连接",
                            },
                            footer: {
                                selectText: "选择",
                                navigateText: "切换",
                                closeText: "关闭",
                                searchByText: "搜索提供者",
                            },
                            noResultsScreen: {
                                noResultsText: "无法找到相关结果",
                                suggestedQueryText: "你可以尝试查询",
                            },
                        },
                    },
                },
            },
        }),
        */
    ],

    theme,
});
