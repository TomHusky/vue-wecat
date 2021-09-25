<template>
  <div
    :style="{left:headMenu.clientX+'px',top:headMenu.clientY+'px'}"
    v-show="headMenu.visible"
    class="headmenu"
  >
    <div class="esInfo">
      <div class="left">
        <div class="people">
          <div class="nickname">{{user.nickname}}</div>
          <div :class="[user.sex===1?'gender-male':'gender-female']"></div>
          <div class="infoItem">
            <div class="item wxid">
              <div
                class="lable"
                style="width: 50px"
              >微信号:</div>
              <div
                class="lable"
                style="margin-left:5px"
              >{{user.wxid}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <img
          class="avatar"
          width="60"
          height="60"
          :src="user.img"
        >
      </div>
    </div>
    <div class="division"></div>
    <div class="infoItem">
      <div
        v-if="!headMenu.self"
        class="item"
      >
        <span class="lable">备&emsp;注</span>
        <span class="value">{{user.remark}}</span>
      </div>
      <div
        v-if="!headMenu.self"
        class="item"
      >
        <span class="lable">群昵称</span>
        <span class="value">白云三手房东</span>
      </div>
      <div class="item">
        <span class="lable">地&emsp;区</span>
        <span class="value">{{user.area}}</span>
      </div>
      <div
        v-if="!headMenu.self"
        class="item"
      >
        <span class="lable">来&emsp;源</span>
        <span class="value">微信扫一扫</span>
      </div>
      <div
        v-if="!headMenu.self"
        class="item"
      >
        <span class="lable">标&emsp;签</span>
        <span class="value">美尚</span>
      </div>
    </div>
    <div class="signature">{{user.signature}}</div>
    <div class="button">
      <img
        width="85px"
        height="35px"
        src="./headIcon.png"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HeadMenu",
  props: {
    refId: {
      type: String,
      default: "headMenu",
    },
    offset: {
      type: Object,
      default: () => {
        return {
          clientX: 0,
          clientY: 0,
        };
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      headMenu: (state) => state.system.headMenu,
    }),
    user() {
      if (this.headMenu.self) {
        return this.$store.state.system.user;
      }
      return this.$store.getters["system/getHeadMenuInfo"];
    },
  },
  mounted() {
    document.addEventListener("click", this.closeMenu);
  },
  destroyed() {
    document.removeEventListener("click", this.closeMenu);
  },
  methods: {
    closeMenu(event) {
      let headMenu = document.getElementById(this.refId);
      if (headMenu) {
        if (!headMenu.contains(event.target)) {
          if (this.headMenu.visibleIng) {
            this.headMenu.visibleIng = false;
          } else {
            this.headMenu.visible = false;
            this.$store.commit("system/setHeadMenu", this.headMenu);
          }
        }
      }
    },
  },
};
</script>

<style scoped lang="stylus">
.division
  margin: 15px 0 15px 0
.headmenu
  margin: 0
  background: #fff
  z-index: 3000
  position: fixed
  list-style-type: none
  border-radius: 2px
  font-weight: 400
  color: #333
  width: 240px
  box-shadow: 2px 2px 10px #aaa
  -o-box-shadow: 2px 2px 10px #aaa
  -webkit-box-shadow: 2px 2px 10px #aaa
  -moz-box-shadow: 2px 2px 10px #aaa
  padding: 30px
.esInfo
  display: flex
  align-items: flex-start
  .left
    flex: 1
    .people
      .nickname
        display: inline-block
        font-size: 18px
        margin-top: 5px
        margin-bottom: 5px
      .gender-male, .gender-female
        margin-bottom: 5px
        display: inline-block
        width: 18px
        height: 18px
        vertical-align: middle
      .gender-male
        background-image: url('../../../components/info/man.png')
        background-size: cover
      .gender-female
        background-image: url('../../../components/info/woman.png')
        background-size: cover
      .wxid
        display: -webkit-flex
        display: fixed
        align-items: flex-start
        div
          width: 115px
          white-space: normal
          word-break: break-all
          word-wrap: break-word
          display: inline-block
  .right
    .avatar
      width: 60px
      height: 60px
      border-radius: 3px
.signature
  margin-top: 20px
  font-size: 10px
  color: #302e2e
.button
  margin-top: 15px
  img
    float: right
.infoItem
  margin-top: 10px
  .item
    font-size: 14px
    margin: 10px 0
    .lable
      margin-bottom: 10px
      color: #999
    .value
      margin-left: 20px
      color: #000000
.border-top
  border-top: 1px solid #ECECEC
</style>