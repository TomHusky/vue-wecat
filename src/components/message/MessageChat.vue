<!-- 消息框 -->
<template>
  <div class="message">
    <template v-if="selectedChat.type === 1">
      <FriendMessage></FriendMessage>
    </template>
    <template v-if="selectedChat.type === 2">
      <GroupMessage></GroupMessage>
    </template>

    <CusConfirm
      :height="imgWindow.height+50"
      :width="imgWindow.width"
      :flag="imgWindow.showImgWindow"
      :okFlag="false"
      :noFlag="false"
      @cancel="cancel"
    >
      <template v-slot:confirm>
        <div style="padding: 30px 0">
          <img :src="imgWindow.src" :width="imgWindow.width" />
        </div>
      </template>
    </CusConfirm>
  </div>
</template>

<script>
import CusConfirm from "@/components/other/confirm/CusConfirm";
import GroupMessage from "./GroupMessage";
import FriendMessage from "./FriendMessage";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  components: {
    GroupMessage,
    FriendMessage,
    CusConfirm,
  },
  computed: {
    ...mapState({ imgWindow: (state) => state.system.imgWindow }),
    ...mapGetters({ selectedChat: "chat/selectedChat" }),
  },
  methods: {
    ...mapActions({ showImgWindow: "system/showImgWindow" }),
    showChatInfo() {
      this.$parent.showChatInfo(true);
    },
    cancel() {
      let value = {
        showImgWindow: false,
      };
      this.showImgWindow(value);
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
