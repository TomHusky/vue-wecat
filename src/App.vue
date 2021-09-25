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
  },
  data() {
    return {
      moveDataelse: {
        x: null,
        y: null,
      },
    };
  },
};
</script>
<style>
.scrollbar {
  overflow: hidden;
}
.scrollbar:hover {
  overflow-y: auto;
}
.selectNone {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
<style lang="stylus" scoped>

</style>
