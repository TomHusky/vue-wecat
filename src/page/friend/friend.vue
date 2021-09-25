<template>
  <div class="content">
    <div class="friend-wrapper" v-drag>
      <search></search>
      <friendlist></friendlist>
    </div>
    <div class="friendinfo">
      <info></info>
    </div>
  </div>
</template>

<script>
import search from "@/components/search/search";
import friendlist from "@/components/friendlist/friendlist";
import info from "@/components/info/info";
export default {
  components: {
    search,
    friendlist,
    info,
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