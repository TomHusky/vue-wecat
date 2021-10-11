<template>
  <div class="content">
    <div class="friend-wrapper" v-drag>
      <Search></Search>
      <FriendList></FriendList>
    </div>
    <div class="friendinfo">
      <Info></Info>
    </div>
  </div>
</template>

<script>
import Search from "@/components/search/Search";
import FriendList from "@/components/friendlist/FriendList";
import Info from "@/components/info/Info";
export default {
  components: {
    Search,
    FriendList,
    Info,
  },
};
</script>

<style lang="stylus" scoped>
.content
  display: flex
  height: 630px
  width: 100%
  .friend-wrapper
    width: 250px
    background: rgb(229, 229, 230)
    border-right: 1px solid #d6d6d6
  .friendinfo
    flex: 1
    background-color: #F5F5F5
</style>