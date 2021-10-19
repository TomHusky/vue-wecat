<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("chat/initData");
    window.fullHeight = document.documentElement.clientHeight;
    window.fullWidth = document.documentElement.clientWidth;
    this.$store.commit("system/setWindowWidth", window.fullWidth);
    this.$store.commit("system/setwindowHeight", window.fullHeight);

    //阻止F5刷新
    this.stopF5Refresh();
    //监听刷新事件
    window.addEventListener("beforeunload", (e) => this.beforeunloadHandler(e));
  },
  destroyed() {
    window.removeEventListener("beforeunload", (e) =>
      this.beforeunloadHandler(e)
    );
  },
  data() {
    return {
      moveDataelse: {
        x: null,
        y: null,
      },
    };
  },
  methods: {
    //阻止F5刷新
    stopF5Refresh() {
      document.onkeydown = function (e) {
        var evt = window.event || e;
        var code = evt.keyCode || evt.which;
        if (code == 116) {
          if (evt.preventDefault) {
            evt.preventDefault();
          } else {
            evt.keyCode = 0;
            evt.returnValue = false;
          }
        }
      };
    },
    //浏览器刷新事件
    beforeunloadHandler(e) {
      if (
        JSON.parse(localStorage.getItem("havePlay")) &&
        JSON.parse(localStorage.getItem("havePlay")).currentTime ==
          this.currentTime
      ) {
        window.localStorage.removeItem("havePlay");
      }
    },
  },
};
</script>
<style>
.scrollbar {
  overflow: hidden;
}
.scrollbar:hover {
  overflow-y: auto;
  /* 设置滚动条不占空间 */
  overflow-y: overlay;
}
.selectNone {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
<style lang="stylus" scoped></style>
