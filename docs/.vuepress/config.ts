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
    ],

    theme,
});
