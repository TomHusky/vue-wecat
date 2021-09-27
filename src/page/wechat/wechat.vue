<template>
  <div id="wechat">
    <div class="sidebar">
      <mycard></mycard>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <head-menu
      class="right-menu"
      id="friendHeadMenu"
      :refId="'friendHeadMenu'"
    >
    </head-menu>
  </div>
</template>

<script>
import HeadMenu from "@/components/other/menu/headmenu";
import mycard from "@/components/mycard/mycard";
import {initFriendList} from "@/page/wechat/init.js";
import { getToken} from '@/libs/util'
import {
  bulidWebsocket,
  closeWebsocket,
} from "@/libs/websocket.js";
export default {
  components: {
    mycard,
    HeadMenu,
  },
  created() {
    initFriendList();
  },
  data() {
    return {
      moveDataelse: {
        x: null,
        y: null,
      },
    };
  },
  beforeDestroy() {
    // 页面销毁时关闭ws。因为有可能ws连接接收数据尚未完成，用户就跳转了页面
    // 在需要主动关闭ws的地方都可以调用该方法
    closeWebsocket();
  },
  beforeMount(){
    if(!getToken()){
      return;
    }
     // 防止用户多次连续点击发起请求，所以要先关闭上次的ws请求。
    closeWebsocket()
    bulidWebsocket('ws://127.0.0.1:8088/wechat-mvc/websocket',getToken(),this.wsOpen,this.wsMessage,this.wsError);
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
    updateAppPosition(width, height) {
      // 设置窗口位置
      let app = document.getElementById("wechat");
      app.style.left = (width - app.offsetWidth) / 2 + "px";
      app.style.top = (height - app.offsetHeight) / 2 + "px";
    },
    wsOpen(){
    },
    wsMessage (data) {
      const dataJson = data
      console.log(dataJson)
    },
    wsError () {
    },
  },
};
</script>
<style lang="stylus" scoped>
#wechat
  position: absolute
  display: flex
  border-radius: 50px
  top: 0
  bottom: 0
  left: 0
  right: 0
  width: 1018px
  height: 630px
  background-color: #fff
  .sidebar
    width: 55px
    height: 630px
    background: #2E2E2E
  .main
    flex: 1
    height: 630px
    background: #F5F5F5
</style>
