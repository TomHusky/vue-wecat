<template>
  <transition name="fade">
    <div
      class="cus-confirm-mask"
      v-if="flag"
      @click="cancel"
    >
      <div
        class="cus-confirm"
        @click.stop
      >
        <div class="confirm-title">确认提示：</div>
        <div class="confirm-body">{{title}}</div>
        <div class="confirm-btns">
          <button
            v-if="noFlag"
            class="cancel-btn"
            @click="no"
          >取消</button>
          <button
            v-if="okFlag"
            class="ok-btn"
            @click="sure"
          >确认</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      title: "",
      noFlag: false,
      okFlag: true,
    };
  },
  methods: {
    no() {
      this.flag = false;
      this.cancel();
    },
    sure() {
      this.flag = false;
      this.ok();
    },
  },
};
</script>

<style  scoped>
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}
.cus-confirm-mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.cus-confirm {
  width: 480px;
  height: 260px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: calc(50% - 130px);
  left: calc(50% - 240px);
  border-radius: 12px;
  padding: 15px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
}
.confirm-title {
  font-size: 28px;
}

.confirm-body {
  text-align: center;
  font-size: 18px;
}

.confirm-btns {
  text-align: right;
}
.confirm-btns button {
  border: 0;
  outline: none;
  padding: 6px 18px;
  border-radius: 6px;
  margin: 0 12px;
  font-size: 16px;
  cursor: pointer;
}

.ok-btn {
  background: #f5f5f5;
  color: #fc9541;
}

.cancel-btn {
  background: #fc9541;
  color: #f5f5f5;
}

.ok-btn:active {
  background: #e5e5e5;
}

.cancel-btn:active {
  background: #fb7a12;
}
</style>
