// MD5
export const sendNotifi = (that, msg) => {
    if (!document.hidden) {
        return;
    }
    let options = {
        body: msg.msgContent,
        silent: false,
        icon: msg.avatar
    }
    let notification = new Notification(msg.remark, options);
    notification.onclick = function () {
        // window.open(`页面链接`, '_blank');
        //可直接打开通知notification相关联的tab窗口
        window.focus();
    }
    //标题栏闪动
    // let defaultTitle = document.title;
    // that.timer = setInterval(function () {
    //     let title = document.title;
    //     if (document.hidden) {
    //         if (/你有新消息/.test(title) == false) {
    //             document.title = '【你有新消息】';
    //         } else {
    //             document.title = defaultTitle;
    //         }
    //     } else {
    //         document.title = defaultTitle;
    //     }
    // }, 500);
}