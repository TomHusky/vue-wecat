<!-- 消息框 -->
<template>
  <div class="message">
    <template v-if="selectedChat.type === 1">
      <friend-message></friend-message>
    </template>
    <template v-if="selectedChat.type === 2">
      <group-message></group-message>
    </template>
  </div>
</template>

<script>
import GroupMessage from "./groupmessage";
import FriendMessage from "./friendmessage";
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

<style lang="stylus" scoped></style>
