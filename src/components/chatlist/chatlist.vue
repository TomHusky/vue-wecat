<!-- 聊天列表 -->
<template>
  <div class="msglist selectNone">
    <ul>
      <li
        v-for="item in searchedChatlist"
        :key="item.id"
        class="sessionlist"
        :class="{ active: item.id === selectId }"
        @contextmenu.prevent="openMenu($event, item)"
        @click="selectSession(item.id)"
      >
        <div class="list-left">
          <img
            class="avatar"
            width="40"
            height="40"
            :alt="
              item.info.remark === '' ? item.info.nickname : item.info.remark
            "
            :src="item.info.avatar"
          />
        </div>
        <div class="list-right">
          <p class="name">
            {{
              item.info.remark === "" ? item.info.nickname : item.info.remark
            }}
          </p>
          <span class="time">{{
            item.messages[item.messages.length - 1].date | time
          }}</span>
          <p class="lastmsg">
            {{ item.messages[item.messages.length - 1].content }}
          </p>
        </div>
      </li>
    </ul>
    <context-menu class="right-menu" :offset="menuOffset">
      <template v-slot:menuItem>
        <ul>
          <li>置顶</li>
          <li>标记为未读</li>
          <li>消息免打扰</li>
          <li class="border-top">不显示聊天</li>
          <li>删除聊天</li>
        </ul>
      </template>
    </context-menu>
  </div>
</template>

<script>
import ContextMenu from "@/components/other/menu/cmenu";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  components: {
    ContextMenu,
  },
  data() {
    return {
      menuOffset: {
        offsetLeft: 0,
        offsetWidth: 0,
        clientX: 0,
        clientY: 0,
      },
      currentUser: {},
    };
  },
  computed: {
    ...mapState({
      selectId: (state) => state.chat.selectId,
      searchText: (state) => state.system.searchText,
    }),
    ...mapGetters({ searchedChatlist: "chat/searchedChatlist" }),
  },
  methods: {
    ...mapActions({ selectSession: "chat/selectSession" }),
    openMenu(e, data) {
      this.menuOffset.offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      this.menuOffset.offsetWidth = this.$el.offsetWidth; // container width
      this.menuOffset.clientX = e.clientX;
      this.menuOffset.clientY = e.clientY;
      this.currentUser = data;
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
.msglist {
  width: 100%;
  height: 540px;
  overflow-y: auto;

  .sessionlist {
    cursor: default;
    display: flex;
    padding: 12px;
    transition: background-color 0.1s;
    font-size: 0;

    &:hover {
      background-color: rgb(220, 220, 220);
    }

    &.active {
      background-color: #c4c4c4;
    }

    .avatar {
      border-radius: 2px;
      margin-right: 12px;
    }

    .list-right {
      position: relative;
      flex: 1;
      margin-top: 4px;
    }

    .name {
      display: inline-block;
      vertical-align: top;
      font-size: 14px;
    }

    .time {
      float: right;
      color: #999;
      font-size: 10px;
      vertical-align: top;
    }

    .lastmsg {
      position: absolute;
      font-size: 12px;
      width: 130px;
      height: 15px;
      line-height: 15px;
      color: #999;
      bottom: 0px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
