<template>
  <div id="wechat">
    <div class="sidebar">
      <MyCard></MyCard>
    </div>
    <div class="main">
      <div class="systemBottom">
        <i class="icon iconfont icon-window-ding"></i>
        <i class="icon iconfont icon-window-min"></i>
        <i class="icon iconfont icon-window-max"></i>
        <i
          style="cursor: pointer"
          @click="exit"
          class="icon iconfont icon-close close"
        ></i>
      </div>
      <router-view></router-view>
    </div>
    <HeadMenu class="right-menu" id="friendHeadMenu" :refId="'friendHeadMenu'">
    </HeadMenu>
  </div>
</template>

<script>
import HeadMenu from "@/components/other/menu/HeadMenu";
import MyCard from "@/components/mycard/MyCard";
import { initFriendList } from "@/page/wechat/init.js";
import { getBaseUrl, exitLogin } from "@/libs/request.js";
import receive from "@/api/socket/receive.js";
import { getToken } from "@/libs/util";
import { bulidWebsocket, closeWebsocket } from "@/libs/websocket.js";
export default {
  components: {
    MyCard,
    HeadMenu,
  },
  data() {
    return {
      moveDataelse: {
        x: null,
        y: null,
      },
    };
  },
  created() {
    initFriendList();
    this.allowNotification();
  },
  beforeDestroy() {
    // 页面销毁时关闭ws。因为有可能ws连接接收数据尚未完成，用户就跳转了页面
    // 在需要主动关闭ws的地方都可以调用该方法
    closeWebsocket();
  },
  beforeMount() {
    if (!getToken()) {
      return;
    }
    // 防止用户多次连续点击发起请求，所以要先关闭上次的ws请求。
    closeWebsocket();
    bulidWebsocket(
      "ws://" + getBaseUrl() + "/websocket",
      getToken(),
      this.wsOpen,
      receive,
      this.wsError
    );
  },
  mounted() {
    const that = this;
    that.updateAppPosition(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    );
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        that.$store.commit("system/setWindowWidth", window.fullWidth);
        that.$store.commit("system/setwindowHeight", window.fullHeight);
        that.updateAppPosition(window.fullWidth, window.fullHeight);
      })();
    };
  },
  methods: {
    //申请浏览器通知权限，具体参见链接 https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
    allowNotification() {
      if (!("Notification" in window)) {
        alert("浏览器不支持消息通知");
        return;
      }
      const permission = Notification.permission;
      if (permission === "granted") {
        return;
      }
      Notification.requestPermission(function (permission) {
        if (permission !== "granted") {
          alert("无法提示新消息！");
        }
      });
    },
    updateAppPosition(width, height) {
      // 设置窗口位置
      let app = document.getElementById("wechat");
      app.style.left = (width - app.offsetWidth) / 2 + "px";
      app.style.top = (height - app.offsetHeight) / 2 + "px";
    },
    wsOpen() {
      this.$store.commit("system/setNetwork", true);
    },
    wsError() {
      this.$store.commit("system/setNetwork", false);
    },
    exit() {
      exitLogin();
    },
  },
};
</script>
<style lang="stylus" scoped>
#wechat {
  position: absolute;
  display: flex;
  border-radius: 50px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 1018px;
  height: 630px;
  background-color: #fff;

  .sidebar {
    width: 55px;
    height: 630px;
    background: #2E2E2E;
  }

  .main {
    flex: 1;
    height: 630px;
    background: #F5F5F5;
  }

  .systemBottom {
    position: absolute;
    right: 0px;

    i {
      font-size: 6px !important;
      padding: 8px 10px;
      line-height: 30px;
      cursor: pointer;
      color: #7F7F7F;

      &:hover {
        background-color: #E5E5E5;
        color: #3F3F3F;
      }
    }

    .close {
      &:hover {
        background-color: #FA5151;
        color: #fff;
      }
    }
  }
}
</style>
