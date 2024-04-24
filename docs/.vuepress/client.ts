import { onMounted } from "vue";
import { defineClientConfig } from "vuepress/client";

export default defineClientConfig({
    enhance({app, router, siteData}) {
    },
    // setup() {
    //     onMounted(() => {
    //         // 在 mounted 之后使用 DOM API
    //         document.querySelector('#app')
    //     })
    // },
});
