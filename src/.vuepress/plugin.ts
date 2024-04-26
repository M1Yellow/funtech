import {searchProPlugin} from "vuepress-plugin-search-pro";
//import {commentPlugin} from "vuepress-plugin-comment2";

export default {
    plugins: [
        /*
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
        */
        searchProPlugin({
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
        /*
        commentPlugin({
            provider: "Ming1",
            server:"https://www.m1yellow.cn/",
            site:'funtech',
        }),
        */
    ]

}
