<!-- 消息框 -->
<template>
  <div class="message">
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

<style lang="stylus" scoped>

</style>
