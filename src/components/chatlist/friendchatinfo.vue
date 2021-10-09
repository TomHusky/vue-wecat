<template>
  <div class="info selectNone">
    <div class="content scrollbar">
      <div class="chatUserList">
        <div class="userHead">
          <div class="add">
            <img
              width="25"
              height="25"
              alt="添加"
              src="static/images/icon/add.png"
            />
          </div>
          <div class="name">添加</div>
        </div>
        <div class="userHead">
          <img
            class="avatar"
            width="35"
            height="35"
            :alt="selectedFriend.nickname"
            :src="selectedFriend.avatar"
            @click="openMenu"
          />
          <div v-if="selectedFriend.remark == null" class="name">
            {{ selectedFriend.nickname }}
          </div>
          <div v-if="selectedFriend.remark != null" class="name">
            {{ selectedFriend.remark }}
          </div>
        </div>
      </div>
      <div class="division"></div>
      <div class="chatItem">
        <div class="item chatSwitchItem">
          <p class="switchLable">消息免打扰</p>
          <p class="switchValue">
            <switched
              :checked="selectedChat.info.notDisturb"
              @change="setNotDisturb"
              :width="40"
              :height="18"
            ></switched>
          </p>
        </div>
        <div class="item chatSwitchItem">
          <p class="switchLable">置顶聊天</p>
          <p class="switchValue">
            <switched @change="toppingChat" :width="40" :height="18"></switched>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import switched from "@/components/other/switch";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  components: {
    switched,
  },
  data() {
    return {};
  },
  created() {
    document.addEventListener("click", (e) => {
      if (this.$refs.info == null) {
        return;
      }
      console.log(this.$refs.info);
      if (!this.$refs.info.contains(e.target)) {
        if (this.isShow) {
          this.isShow = false;
        }
      }
    });
  },
  computed: {
    ...mapState({
      selectWxid: (state) => state.chat.selectWxid,
      searchText: (state) => state.system.searchText,
    }),
    ...mapGetters({
      selectedFriend: "friend/selectedFriend",
      selectedChat: "chat/selectedChat",
    }),
  },
  methods: {
    ...mapActions({
      updateChatInfo: "chat/updateChatInfo",
      topChat: "chat/topChat",
    }),
    toppingChat(value) {
      if(value){
        this.topChat(this.selectedChat);
      }
    },
    setNotDisturb(value) {
      let currentChat = this.selectedChat;
      currentChat.info.notDisturb = value;
      this.updateChatInfo(currentChat);
    },
    openMenu(e) {
      let info = {
        clientX: e.clientX,
        clientY: e.clientY,
        self: false,
        visible: true,
        visibleIng: true,
        wxid: this.selectedFriend.wxid,
      };
      this.$store.commit("system/setHeadMenu", info);
    },
  },
};
</script>

<style lang="stylus" scoped>
.division {
  width: 205px;
  margin: 10px 0 10px 20px;
}

.info {
  .content {
    height: 570px;
  }

  .chatUserList {
    width: 245px;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    margin: 25px 15px 5px 15px;

    .userHead {
      margin: 10px 4px;
      width: 47px;
      height: 50px;
      text-align: center;
      cursor: pointer;

      .add {
        width: 35px;
        height: 35px;
        border: 1px solid #DADADA;
        display: table-cell;
        vertical-align: middle;

        &:hover {
          border-color: #CDCDCD;
        }
      }

      .avatar {
        text-align: center;
        margin: 0 auto;
        border-radius: 2px;
      }

      .name {
        color: #444444;
        width: 42px;
        text-align: center;
        margin: 0 auto;
        margin-top: 4px;
        font-size: 12px;
        height: 15px;
        line-height: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .chatItem {
    width: 205px;
    margin: 10px 20px;

    .item {
      font-size: 14px;
      margin: 18px 0;

      .lable {
        margin-bottom: 10px;
      }

      .value {
        color: #999;
      }
    }

    .chatSwitchItem {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .switchLable {
        left: 0;
      }

      .switchValue {
        right: 0;
      }
    }
  }

  .exit {
    width: 245px;
    color: #F45471;
    text-align: center;
    margin: 20px 0px;
    font-size: 14px;
  }
}
</style>