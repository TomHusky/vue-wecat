<template>
  <div
    :style="{
      width: getWidth + 'px',
      height: getHeight + 'px',
      right: '-' + getWidth / 2 + 'px',
      top: '-' + getHeight / 2 + 'px',
      borderRadius: getWidth + 'px',
    }"
    class="badge"
  >
    <span
      v-if="showNum"
      :style="{
        width: getWidth + 'px',
        height: getHeight + 'px',
        lineHeight: getHeight + 'px',
        transformOrigin: getWidth / 2 + 'px ' + getHeight / 2 + 'px',
      }"
    >
      {{ getShowNum }}</span
    >
  </div>
</template>

<script>
export default {
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    width: {
      type: Number,
      default: 16,
    },
    height: {
      type: Number,
      default: 16,
    },
    count: {
      type: Number,
      default: null,
    },
    overflowCount: {
      type: Number,
      default: 99,
    },
    showNum:{
      type: Boolean,
      default: true,  
    },
  },
  computed: {
    getWidth() {
      if (!this.showNum) {
        this.width = 10;
      }
      return this.width;
    },
    getHeight() {
      if (!this.showNum) {
        this.height = 10;
      }
      return this.height;
    },
    getShowNum() {
      if (this.count > 9 && this.count < 100) {
        this.width = this.width + 4;
      }
      if (this.count > 99) {
        this.width = this.width + 8;
      }
      if (this.count > this.overflowCount) {
        return this.overflowCount + "+";
      }
      return this.count;
    },
  },
};
</script>

<style lang="stylus" scoped>
.badge {
  position: absolute;
  background-color: #FA5151;
  text-align: center;

  span {
    display: inline-block;
    font-size: 18px;
    color: #FFF;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    font-weight: 100;
  }
}
</style>