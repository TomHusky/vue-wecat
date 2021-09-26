<template>
  <transition name="fade">
    <div class="message" :class="type" v-if="visible">
      <i class="icon-type iconfont" :class="'icon-' + type"></i>
      <div class="content">
        {{ content }}
        <i
          v-if="hasClose"
          class="btn-close iconfont icon-close"
          @click="visible = false"
        ></i>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MyMessage",
  data() {
    return {
      content: "",
      time: 3000,
      visible: false,
      type: "info", //'success','warning','error'
      hasClose: false,
    };
  },
  mounted() {
    this.close();
  },
  methods: {
    close() {
      window.setTimeout(() => {
        this.visible = false;
      }, this.time);
    },
  },
};
</script>
<style lang="stylus" scoped>
.message {
  padding: 5px 20px;
  border-radius: 3px;
  color: #fff;
  z-index: 999999999;
  background-color:rgba(0,0,0,0.4);
  position: absolute; left: 50%; top: 20%;
  transform: translate(-50%, -50%);    /* 50%为自身尺寸的一半 */
}
</style>