<template>
  <div class="content">
    <div class="msglist">
      <search :placeholder="placeholder" v-drag></search>
      <chatlist></chatlist>
    </div>
    <div class="chatbox">
      <message class="message"></message>
      <v-text class="text"></v-text>
    </div>
    <div
      v-if="isShow"
      class="chatInfo"
    >
      <friendchatinfo v-if="selectedChat.type==1" id="info"></friendchatinfo>
      <groupchatinfo v-if="selectedChat.type==2" id="info"></groupchatinfo>
    </div>
  </div>
</template>

<script>
import search from "@/components/search/search";
import chatlist from "@/components/chatlist/chatlist";
import friendchatinfo from "@/components/chatlist/friendchatinfo";
import groupchatinfo from "@/components/chatlist/groupchatinfo";
import message from "@/components/message/message";
import vText from "@/components/text/text";
import { mapGetters } from "vuex";
export default {
  components: {
    search,
    chatlist,
    friendchatinfo,
    groupchatinfo,
    message,
    vText,
  },
  data() {
    return {
      isShow: false,
      showIng: false,
      placeholder: "搜索",
    };
  },
  computed: {
    ...mapGetters({selectedChat:"chat/selectedChat"}),
  },
  created() {
    document.addEventListener("click", (e) => {
      let info = document.getElementById("info");
      if (info) {
        if (!info.contains(e.target)) {
          if(this.showIng){
            this.showIng = false;
          }else{
            this.isShow = false;
          }
        }
      }
    });
  },
  methods: {
    showChatInfo(showIng) {
      this.showIng = showIng;
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="stylus" scoped>
.content
  display: flex
  width: 100%
  .msglist
    width: 250px
    background: #E6E6E6
    border-right: 1px solid #d6d6d6
  .chatbox
    height: 630px
    flex: 1
    .message
      height: 480px
    .text
      height: 150px
  .chatInfo
    position: absolute
    right: -250px
    height: 630px
    width: 250px
    background-color: #F5F5F5
    border-left: 1px solid #ECECEC
</style>
