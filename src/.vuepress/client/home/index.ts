/* 首页项目添加 gitee 访问入口 */
export const insertEntry = () => {
    const projectItems = document.querySelectorAll('.vp-feature-item');
    if (!projectItems || projectItems.length < 1) {
        return;
    }
    for (let i = 0, len = projectItems.length; i < len; i++) {
        let projectItem = projectItems[i];
        if (!projectItem) continue;
        let entryItem = document.querySelector('#project-gitee-entry-' + i);
        if (entryItem) continue;
        let projectLink = projectItem.href;
        if (!projectLink || !projectLink.toLowerCase().includes('github')) continue;
        projectLink = projectLink.replaceAll('github', 'gitee');
        entryItem = document.createElement('div');
        entryItem.style.display = "none";
        entryItem.id = 'project-gitee-entry-' + i;
        entryItem.classList.add('project-gitee-entry');
        //entryItem.innerHTML = '<a target="_blank" href="' + projectLink + '"><span class="font-icon icon iconfont icon-gitee"></span></a>';
        entryItem.innerHTML = '<a target="_blank" href="' + projectLink + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#C71D23"></circle><path fill="#fff" d="M772.953 454.723H480.17v.006a25.46 25.46 0 0 0-25.46 25.453l-.025 63.649a25.46 25.46 0 0 0 25.46 25.466l178.242-.007a25.46 25.46 0 0 1 25.459 25.46v12.73c0 42.18-34.198 76.378-76.378 76.378H365.583a25.46 25.46 0 0 1-25.46-25.46V416.533h-.006c0-42.18 34.192-76.378 76.378-76.378h356.388v-.013a25.46 25.46 0 0 0 25.46-25.446l.057-63.65h.013a25.46 25.46 0 0 0-25.46-25.471l-356.432.012c-105.453 0-190.946 85.493-190.946 190.946v356.433a25.46 25.46 0 0 0 25.46 25.46H626.56c94.913 0 171.852-76.94 171.852-171.852V480.182a25.46 25.46 0 0 0-25.46-25.46z"></path></svg></a>';
        //projectItem.before(entryItem);
        //projectItem.appendChild(entryItem);
        projectItem.firstChild.before(entryItem);
        projectItem.onmouseover = () => {
            entryItem.style.display = "inherit";
        };
        projectItem.onmouseout = () => {
            entryItem.style.display = "none";
        };
        projectItem.onclick = (e) => {
            e.stopPropagation();
            entryItem.style.display = "inherit";
            projectItem.onmouseout = null; // 点击 github 入口之后，让 gitee 入口一直显示，以便 github 无法访问，可访问 gitee
        };
        entryItem.onclick = (e) => {
            e.stopPropagation();
            for (let i = 0, len = projectItems.length; i < len; i++) {
                projectItems[i].onmouseout = null; // 访问了一个项目的 gitee 入口，移除鼠标移出事件，让 gitee 入口一直显示
            }
            let entrys = document.querySelectorAll('.project-gitee-entry');
            if (!entrys || entrys.length < 1) return;
            for (let i = 0, len = entrys.length; i < len; i++) {
                // 访问了一个项目的 gitee 入口，其他项目的 gitee 入口也全部显示【既然访问了一个 gitee 入口，大概率说明 github 访问不了】
                entrys[i].style.display = "inherit";
            }
        };
    }
};

/* 首页简历感谢弹窗 */
export const resumeThanksDialog = () => {
    //let url = window.location.href; // 获取完整URL
    let url = window.location.search; // 获取属性（“?”后面的分段）?from=resume
    if (!url) return;
    url = url.toLocaleLowerCase();
    if (!url.includes("from=resume")) return;
    // 只弹一次
    let dialogTime = localStorage.getItem('m1yellow-resume-thanks-dialog-time');
    if (dialogTime) return;

    // 弹窗蒙板
    let dialogMaskHtml = "<div id='resumeThanksDialogMask'></div>";
    // 弹窗内容
    let dialogContentHtml = "<div id='resumeThanksDialogEntry'><div id='resumeThanksDialogMsg'>感谢您给的面试机会！</div><span id='resumeThanksDialogEmoji'><img src='/bixin.svg' alt='比心'></span><div id='resumeThanksDialogBtn'>不用谢，加油💪</div></div>";
    // 追加到body
    let resumeThanksDialogEle = document.createElement('div');
    resumeThanksDialogEle.id = "resumeThanksDialogArea";
    resumeThanksDialogEle.innerHTML = dialogMaskHtml + dialogContentHtml;
    document.body.appendChild(resumeThanksDialogEle);
    // 禁止页面滚动
    document.body.style.overflow = "hidden";
    // 点击按钮，隐藏弹窗
    let resumeThanksDialogBtnEle = document.getElementById("resumeThanksDialogBtn");
    if (resumeThanksDialogBtnEle) resumeThanksDialogBtnEle.onclick = (e) => {
        e.stopPropagation();
        //document.getElementById("resumeThanksDialogMask").style.display = "none";
        resumeThanksDialogEle.style.display = "none";
        // 允许页面滚动
        document.body.style.overflow = "visible";
        // 设置弹窗时间
        localStorage.setItem('m1yellow-resume-thanks-dialog-time', new Date().getTime().toString());
    };
};