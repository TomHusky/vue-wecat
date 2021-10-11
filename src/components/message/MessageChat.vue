<!-- 消息框 -->
<template>
  <div class="message">
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
    <template v-if="selectedChat.type === 1">
      <FriendMessage></FriendMessage>
    </template>
    <template v-if="selectedChat.type === 2">
      <GroupMessage></GroupMessage>
    </template>
  </div>
</template>

<script>
import GroupMessage from "./GroupMessage";
import FriendMessage from "./FriendMessage";
import {exitLogin} from "@/libs/request";
import { mapGetters } from "vuex";
export default {
  components: {
    GroupMessage,
    FriendMessage,
  },
  computed: {
    ...mapGetters({ selectedChat: "chat/selectedChat" }),
  },
  methods: {
    exit() {
      exitLogin();
    },
    showChatInfo() {
      this.$parent.showChatInfo(true);
    },
  },
  filters: {
    // 将日期过滤为 hour:minutes
    time(date) {
      if (typeof date === "string") {
        date = new Date(date);
      }
      if (date.getMinutes() < 10) {
        return date.getHours() + ":0" + date.getMinutes();
      } else {
        return date.getHours() + ":" + date.getMinutes();
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
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
</style>
