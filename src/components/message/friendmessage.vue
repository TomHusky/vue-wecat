<!-- 消息框 -->
<template>
  <div class="message">
    <header class="header selectNone" v-drag>
      <div class="friendName">
        <span style="cursor: pointer" @click="showChatInfo">{{
          selectedChat.info.remark === ""
            ? selectedChat.info.nickname
            : selectedChat.info.remark
        }}</span>
      </div>
      <i
        style="cursor: pointer"
        @click="showChatInfo"
        class="icon iconfont icon-more info"
      ></i>
    </header>
    <div class="message-wrapper scrollbar" ref="list">
      <ul v-if="selectedChat">
        <li
          v-for="item in selectedChat.messages"
          class="message-item"
          :key="item.id"
        >
          <div class="time selectNone">
            <span v-if="item.showTime">{{ item.date | time }}</span>
          </div>
          <div class="main" :class="{ self: isSelf(item) }">
            <img
              class="avatar selectNone"
              width="36"
              height="36"
              @click.prevent="openMenu($event, item)"
              :src="isSelf(item) ? user.avatar : selectedChat.info.avatar"
            />
            <div :class="{ content: item.type != 2 }">
              <img
                class="img-msg"
                @click="
                  showImgWindow({
                    showImgWindow: true,
                    src: item.content.src,
                    width: item.content.width,
                    height: item.content.height,
                  })
                "
                v-if="item.type == 2"
                :src="item.content.src"
              />
              <div
                class="text"
                v-if="item.type != 2"
                v-html="replaceFace(item.content)"
              ></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters({
      selectedChat: "chat/selectedChat",
      messages: "chat/messages",
      selectedChatFriend: "friend/selectedChatFriend",
    }),
    ...mapState({ emojis: (state) => state.system.emojis }),
    user() {
      let user = this.$store.state.user.info;
      user.self = true;
      return user;
    },
    isSelf() {
      return (item) => {
        return item.username === this.user.username;
      };
    },
  },
  data() {
    return {};
  },
  mounted() {
    //  在页面加载时让信息滚动到最下面
    setTimeout(
      () => (this.$refs.list.scrollTop = this.$refs.list.scrollHeight),
      0
    );
  },
  created() {
    // for(let i= 0;i<this.emojis.length;i++){
    //   let id = md5(this.emojis[i].code);
    //   this.emojis[i].id= id;
    //   this.emojis[i].reg='/@::tt;;@'+id+'@/g';
    // }
    // console.log(JSON.stringify(this.emojis));
  },
  watch: {
    // 发送信息后,让信息滚动到最下面
    messages() {
      setTimeout(
        () => (this.$refs.list.scrollTop = this.$refs.list.scrollHeight),
        0
      );
    },
  },
  methods: {
    ...mapActions({
      showImgWindow: "system/showImgWindow",
    }),
    openMenu(e, item) {
      let info = {
        clientX: e.clientX,
        clientY: e.clientY,
        self: this.isSelf(item),
        visible: true,
        visibleIng: true,
        info: this.isSelf(item) ? this.user : this.selectedChatFriend,
      };
      this.$store.commit("system/setHeadMenu", info);
    },
    showChatInfo() {
      this.$parent.showChatInfo();
    },
    //  在发送信息之后，将输入的内容中属于表情的部分替换成emoji图片标签
    //  再经过v-html 渲染成真正的图片
    replaceFace(con) {
      if (con.includes("@::tt;;@")) {
        let emojis = this.emojis;
        for (let i = 0; i < emojis.length; i++) {
          con = con.replace(
            emojis[i].reg,
            '<img src="static/emoji/' +
              emojis[i].file +
              '"  alt="" style="vertical-align: middle; width: 24px; height: 24px" />'
          );
        }
        return con;
      }
      return con;
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
.message {
  width: 100%;
  height: 100;
  background-color: #F5F5F5;

  .header {
    height: 60px;
    padding: 20px 0 0 30px;
    box-sizing: border-box;

    .friendName {
      font-size: 19px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .info {
      color: #7F7F7F;
      margin-right: 10px;
      font-size: 25px;
      float: right;
      line-height: 10px;

      &:hover {
        color: #3F3F3F;
      }
    }
  }

  .message-wrapper {
    min-height: 420px;
    max-height: 420px;
    padding: 0 15px 18px 15px;
    box-sizing: border-box;
    border-top: 1px solid #e7e7e7;
    border-bottom: 1px solid #e7e7e7;

    .message-item {
      margin-top: 16px;
    }

    .message {
      margin-bottom: 15px;
    }

    .time {
      width: 100%;
      font-size: 12px;
      margin-top: 7px;
      margin-bottom: 10px;
      text-align: center;

      span {
        display: inline-block;
        padding: 4px 6px;
        color: #fff;
        border-radius: 3px;
        background-color: #dcdcdc;
      }
    }

    .main {
      .avatar {
        cursor: pointer;
        float: left;
        margin-left: 15px;
        border-radius: 3px;
      }

      .img-msg {
        max-width: 180px;
        max-height: 180px;
        border-radius: 3px;
        cursor: pointer;
      }

      .content {
        display: inline-block;
        margin-left: 10px;
        position: relative;
        padding: 6px 10px;
        max-width: 330px;
        min-height: 36px;
        line-height: 24px;
        box-sizing: border-box;
        font-size: 14px;
        text-align: left;
        word-break: break-all;
        background-color: #FFFFFF;
        border: 1px solid #ECECEC;
        border-radius: 4px;

        &:before {
          content: '';
          position: absolute;
          top: 12px;
          right: 100%;
          border: 6px solid transparent;
          border-right-color: #FFFFFF;
        }
      }
    }

    .self {
      text-align: right;

      .avatar {
        float: right;
        margin: 0 15px;
      }

      .content {
        background-color: #9EEA6A;

        &:before {
          right: -12px;
          vertical-align: middle;
          border-right-color: transparent;
          border-left-color: #9EEA6A;
        }
      }
    }
  }
}
</style>
