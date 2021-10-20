<!-- 消息框 -->
<template>
  <div class="message">
    <header class="header selectNone" v-drag>
      <div class="friendName">
        <span style="cursor: pointer" @click="showChatInfo"
          >{{
            selectedChat.info.remark == null || selectedChat.info.remark === ""
              ? selectedChat.info.nickname
              : selectedChat.info.remark
          }}
          ({{ selectedGroupChat.userDetails.length }})</span
        >
      </div>
      <i
        style="cursor: pointer"
        @click="showChatInfo"
        class="icon iconfont icon-more info"
      ></i>
    </header>
    <div class="message-wrapper" ref="list">
      <ul v-if="selectedChat">
        <li
          v-for="item in selectedChat.messages"
          :key="item.id"
          class="message-item"
        >
          <div class="time">
            <span v-if="item.showTime">{{ item.date | time }}</span>
          </div>
          <div class="main" :class="{ self: isSelf(item.username) }">
            <img
              class="avatar"
              width="36"
              height="36"
              :src="
                isSelf(item.username)
                  ? user.avatar
                  : getMsgUserInfo(item.username).avatar
              "
            />
            <div class="content">
              <div class="nickname" v-if="!isSelf(item.username)">
                {{ getMsgUserInfo(item.username).nickname }}
              </div>
              <div class="msg">
                <div class="text" v-html="replaceFace(item.content)"></div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters({
      selectedChat: "chat/selectedChat",
      selectedGroupChat: "groupchat/selectedGroupChat",
      messages: "chat/messages",
      selectedFriendByUsername: "friend/selectedFriendByUsername",
    }),
    ...mapState({
      user: (state) => state.user.info,
      emojis: (state) => state.system.emojis,
    }),
    isSelf() {
      return (username) => {
        return username === this.user.username;
      };
    },
    getMsgUserInfo() {
      return (username) => {
        let user = this.selectedGroupChat.userDetails.find(
          (user) => user.username === username
        );
        let friend = this.selectedFriendByUsername(username);
        if (friend != null) {
          return friend;
        }
        return user;
      };
    },
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
    overflow-y: auto;
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

      .content {
        display: inline-block;
        margin-left: 10px;
        position: relative;

        .nickname {
          font-size: 12px;
          color: #999;
          margin-bottom: 6px;
          margin-left: 2px;
        }

        .msg {
          display: inline-block;
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
    }

    .self {
      text-align: right;

      .avatar {
        float: right;
        margin: 0 15px;
      }

      .content {
        .msg {
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
}
</style>
