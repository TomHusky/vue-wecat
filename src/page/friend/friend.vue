<template>
  <div class="content">
    <div class="friend-wrapper" v-drag>
      <SearchList @add="addFriend" :placeholder="'搜索'"></SearchList>
      <FriendList></FriendList>
    </div>
    <div class="friendinfo">
      <Info></Info>
    </div>
  </div>
</template>

<script>
import SearchList from "@/components/search/SearchList";
import FriendList from "@/components/friendlist/FriendList";
import Info from "@/components/info/Info";
export default {
  components: {
    SearchList,
    FriendList,
    Info
  },
  data() {
    return {
      showConfirm: false,
      isFriend: false
    };
  },
  methods: {
    addFriend(){
      let friendInfo = {
        visible: true,
        username: null,
      };
      this.$store.commit("system/setAddFriendInfo", friendInfo);
    }
  },
};
</script>

<style lang="stylus" scoped>
.content {
  display: flex;
  height: 630px;
  width: 100%;

  .friend-wrapper {
    width: 250px;
    background: rgb(229, 229, 230);
    border-right: 1px solid #d6d6d6;
  }

  .friendinfo {
    flex: 1;
    background-color: #F5F5F5;
  }
}

</style>