import { onMounted } from 'vue';
import { defineClientConfig } from "vuepress/client";
import { insertEntry, resumeThanksDialog } from "./client/home/index.js";
import 'vuepress-theme-hope/presets/bounce-icon.scss'; // 页面图标鼠标悬停跳动效果


export default defineClientConfig({
    enhance({ app, router, siteData }) {
        //app.component('project-gitee-entry', ProjectGiteeEntry);
    },
    setup() {
        onMounted(() => {
            // 在 mounted 之后使用 DOM API
            //document.querySelector('#app');
            // 首页 project item 添加 gitee访问入口
            insertEntry();
            // 设置首页感谢弹窗
            resumeThanksDialog();
        });
    },
    /*
    // 在 #app 元素最后append添加
    rootComponents: [
        ProjectGiteeEntry,
    ],
    */
});
