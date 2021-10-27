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
      :height="getHeight(imgWindow.width, imgWindow.height)"
      :width="getWidth(imgWindow.width, imgWindow.height)"
      :flag="imgWindow.showImgWindow"
      :okFlag="false"
      :noFlag="false"
      @cancel="cancel"
    >
      <template v-slot:confirm>
        <div
          style="
            padding: 30px 0;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
          "
          :style="{
            height: getHeight(imgWindow.width, imgWindow.height) + 'px',
            width: getWidth(imgWindow.width, imgWindow.height) + 'px',
          }"
        >
          <img
            :src="imgWindow.src"
            :width="
              imgWindow.width > 1024 ? imgWindow.width / 2.6 : imgWindow.width
            "
          />
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
    getWidth() {
      return (width, height) => {
        if (width < 300) {
          width = width * 2;
        } else if (height < 800) {
          width = width * 2;
        }
        if (width > 1024) {
          return width / 2.6;
        }
        return width;
      };
    },
    getHeight() {
      return (width, height) => {
        if (height < 300) {
          height = height * 2;
        } else if (height < 500 && width < 600) {
          height = height * 2;
        }
        if (height > 1024) {
          return height / 2.6;
        }
        return height;
      };
    },
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
