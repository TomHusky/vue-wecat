<!-- 最左边的选择框 -->
<template>
  <div
    class="mycard selectNone"
    v-drag
  >
    <header>
      <img
        id="headMenu"
        @click.prevent="openMenu($event)"
        :src="user.img"
        class="avatar"
      >
    </header>
    <div
      class="navbar"
      @click="clearSearch"
    >
      <router-link
        to="/chat"
        class="icon iconfont icon-msg"
      ></router-link>
      <router-link
        to="/friend"
        class="icon iconfont icon-friend"
      ></router-link>
      <router-link
        to="/game"
        class="icon iconfont icon-collection"
      ></router-link>
    </div>
    <footer>
      <i class="icon iconfont icon-san"></i>
    </footer>
  </div>
</template>

<script>
import HeadMenu from "@/components/other/menu/headmenu";
export default {
  components: {
    HeadMenu,
  },
  computed: {
    user() {
      return this.$store.state.system.user;
    },
  },
  data() {
    return {};
  },
  methods: {
    clearSearch() {
      this.$store.dispatch("system/search", "");
    },
    openMenu(e) {
      let info = {
        clientX: e.clientX,
        clientY: e.clientY,
        self: true,
        visible:true,
        visibleIng:true,
      };
      this.$store.commit("system/setHeadMenu", info);
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../../assets/fonts/iconfont.css'
.mycard
  position: relative
  width: 100%
  height: 100%
  .avatar
    width: 37px
    height: 37px
    margin: 25px 9px 0px 9px
  .navbar
    width: 100%
    text-align: center
  .icon
    display: inline-block
    font-size: 19px
    margin-top: 28px
    padding: 0 18px
    box-sizing: border-box
    color: rgb(173, 174, 175)
    opacity: 0.8
    cursor: pointer
    &.active
      color: rgb(0, 220, 65)
    &:hover
      opacity: 1
  .icon-msg, .icon-more
    font-size: 18px
  .icon-msg
    padding: 0 19px
footer
  position: absolute
  bottom: 20px
  width: 100%
  text-align: center
</style>
