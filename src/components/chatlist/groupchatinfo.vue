<template>
  <div class="info selectNone">
    <div class="header">
      <Search :placeholder="placeholder"></Search>
    </div>
    <div class="content scrollbar">
      <div class="chatUserList">
        <div
          class="userHead"
          v-for="item in searchedFriendlist"
          :key="item.id"
        >
          <img
            class="avatar"
            width="35"
            height="35"
            :alt="item.nickname"
            :src="item.avatar"
          >
          <div
            v-if="item.remark==null"
            class="name"
          >{{item.nickname}}</div>
          <div
            v-if="item.remark!=null"
            class="name"
          >{{item.remark}}</div>
        </div>
      </div>
      <div class="division"></div>
      <div class="chatItem">
        <div class="item">
          <p class="lable">群聊名称</p>
          <p class="value">测试群</p>
        </div>
        <div class="item">
          <p class="lable">群公告</p>
          <p class="value">未设置</p>
        </div>
        <div class="item">
          <p class="lable">备注</p>
          <p class="value">it测试群</p>
        </div>
        <div class="item">
          <p class="lable">我在本群的昵称</p>
          <p class="value">只有自己可见</p>
        </div>
      </div>
      <div class="division"></div>
      <div class="chatItem">
        <div class="item chatSwitchItem">
          <p class="switchLable">显示群成员昵称</p>
          <p class="switchValue">
            <Switched
              :width="40"
              :height="18"
            ></Switched>
          </p>
        </div>
        <div class="item chatSwitchItem">
          <p class="switchLable">消息免打扰</p>
          <p class="switchValue">
            <Switched
              :width="40"
              :height="18"
            ></Switched>
          </p>
        </div>
        <div class="item chatSwitchItem">
          <p class="switchLable">置顶聊天</p>
          <p class="switchValue">
            <Switched
              :width="40"
              :height="18"
            ></Switched>
          </p>
        </div>
        <div class="item chatSwitchItem">
          <p class="switchLable">保存到通讯录</p>
          <p class="switchValue">
            <Switched
              :width="40"
              :height="18"
            ></Switched>
          </p>
        </div>
      </div>
      <div class="division"></div>
      <div class="exit">
        <p>删除并退出</p>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/search/Search";
import Switched from "@/components/other/Switch";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  components: {
    Search,
    Switched,
  },
  data() {
    return {
      placeholder: "搜索群好友",
    };
  },
  created() {
    document.addEventListener("click", (e) => {
      if (this.$refs.info == null) {
        return;
      }
      if (!this.$refs.info.contains(e.target)) {
        if (this.isShow) {
          this.isShow = false;
        }
      }
    });
  },
  computed: {
    ...mapState({selectWxid:(state) => state.chat.selectWxid, searchText:(state) => state.system.searchText}),
    ...mapGetters({searchedFriendlist:"friend/searchedFriendlist"}),
  },
  methods: {
    
  },
};
</script>

<style lang="stylus" scoped>
.division
  width: 205px
  margin: 10px 0 10px 20px
.info
  .header
    margin: 0 13px
  .content
    height: 570px
  .chatUserList
    width: 245px
    display: -webkit-flex /* Safari */
    display: flex
    flex-wrap: wrap
    text-align: center
    margin: 5px 15px 5px 15px
    .userHead
      margin: 10px 4px
      width: 47px
      height: 50px
      text-align: center
      .avatar
        text-align: center
        margin: 0 auto
        border-radius: 2px
      .name
        color: #444444
        width: 42px
        text-align: center
        margin: 0 auto
        margin-top: 4px
        font-size: 12px
        height: 15px
        line-height: 15px
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
  .chatItem
    width: 205px
    margin: 10px 20px
    .item
      font-size: 14px
      margin: 20px 0
      .lable
        margin-bottom: 10px
      .value
        color: #999
    .chatSwitchItem
      display: flex
      align-items: center
      justify-content: space-between
      .switchLable
        left: 0
      .switchValue
        right: 0
  .exit
    width: 245px
    color: #F45471
    text-align: center
    margin: 20px 0px
    font-size: 14px
</style>