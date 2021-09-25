<!-- 好友列表 -->
<template>
  <div class="friendlist scrollbar">
    <ul>
      <li
        v-for="item in searchedFriendlist"
        class="frienditem"
        :class="{ noborder: !item.initial}"
      >
        <div
          class="list_title"
          v-if="item.initial"
        >{{item.initial}}</div>
        <div
          class="friend-info"
          :class="{ active: item.wxid === selectFriendWxid }"
          @click="selectFriend(item.wxid)"
        >
          <img
            class="avatar"
            width="36"
            height="36"
            :src="item.img"
          >
          <div class="remark">{{item.remark}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState({selectFriendWxid:(state) =>state.friend.selectFriendWxid, searchText:(state) =>state.system.searchText}),
    ...mapGetters({searchedFriendlist:"friend/searchedFriendlist"}),
  },
  methods: {
    ...mapActions({selectFriend:"friend/selectFriend"}),
  },
};
</script>

<style lang="stylus" scoped>
.friendlist
  height: 570px
  .frienditem
    border-top: 1px solid #dadada
    &:first-child, &.noborder
      border-top: none
    .list_title
      box-sizing: border-box
      width: 100%
      font-size: 12px
      padding: 15px 0 3px 12px
      color: #999
    .friend-info
      display: flex
      padding: 12px
      transition: background-color 0.1s
      font-size: 0
      &:hover
        background-color: #DCDADA
      &.active
        background-color: #C5C5C5
      .avatar
        border-radius: 2px
        margin-right: 12px
      .remark
        font-size: 14px
        line-height: 36px
</style>
