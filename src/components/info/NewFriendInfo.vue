<!-- 好友信息 -->
<template>
  <div class="Info-wrapper">
    <div class="info-head" v-drag>
      <div class="newfriend">
        <div class="nickname">{{ selectedFriend.nickname }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      selectedFriend: "friend/selectedFriend"
    }),
  },
  methods: {
  },
};
</script>

<style lang="stylus" scoped>
.info-head {
  height: 60px;

  .newfriend {
    height: 100%;
    padding: 28px 0 0 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #e7e7e7;

    .nickname {
      font-size: 18px;
    }
  }
}
</style>

