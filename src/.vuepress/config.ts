import {viteBundler} from '@vuepress/bundler-vite';
import {defineUserConfig} from "vuepress";
import theme from "./theme";

export default defineUserConfig({

    /*
    TODO 注意事项：
    1. 测试环境没问题，vite 编译打包【空格】不兼容
    2. md 文件内容中不能包含 <font>、<update> 等非标准标签，否则会报 Rendering pages - failed TypeError: Invalid value used as weak map key
    */

    bundler: viteBundler({
        //viteOptions: {},
        //vuePluginOptions: {},
    }),

    //host: "0.0.0.0",
    port: 80,
    lang: "zh-CN",
    title: "mypages",
    description: "mypages 学习教程",

    // 根路径
    base: "/",
    //指定 vuepress build 的输出目录
    dest: "funtech",
    //shouldPrefetch: false,

    // 右侧目录级别，放 theme 配置不生效
    markdown: {
        headers: {
            level: [2, 3, 4, 5],
        },
    },

    // 主题配置
    theme,
    // 插件配置，会警告不让在 config 主文件下使用，提示在 theme 配置文件使用
    //...plugin,
    // 预读取 Enable it with pwa
    shouldPrefetch: false,
});
