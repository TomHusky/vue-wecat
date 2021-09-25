<template>
  <div class="login">
    <div class="label">

    </div>
    <div class="header">
      <img
        id="headMenu"
        :src="user.img"
        class="avatar"
      >
    </div>
    <div class="loginInfo">
      <input
        class="account"
        v-model="form.username"
      />
      <input
        class="password"
        type="password"
        v-model="form.password"
      />
    </div>
    <div
      class="loginBotton"
      @click="login"
    >
      <span>登录</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        auto: true,
      },
    };
  },
  computed: {
    user() {
      let user = this.$store.state.system.user;
      user.self = true;
      return user;
    },
  },
  methods: {
    ...mapActions({handleLogin:"user/handleLogin",listFriendInfo:"user/listFriendInfo"}),
    login() {
      this.listFriendInfo();
      // let username = this.form.username;
      // let password = this.form.password;
      // if (username == "" || password == "") {
      //   alert("用户名密码不能为空");
      //   return;
      // }
      // let auto = this.form.auto;
      // this.handleLogin({ username, password, auto })
      //   .then(res => {
      //     this.$router.push({ path: "/chat" });
      //   }).finally(() => {});
    },
  },
};
</script>

<style lang="stylus" scoped>
.login
  width: 280px
  height: 400px
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0
  margin: auto
  background-color: #F5F5F5
  border-radius: 3px
  text-align: center
  .header
    margin-top: 70px
    margin-bottom: 30px
    .avatar
      width: 80px
      height: 80px
      border-radius: 3px
  .loginInfo
    margin: 10px auto
    .account
      background-image: url('./account.svg')
      &:focus
        background-image: url('./account-choice.svg')
    .password
      background-image: url('./password.svg')
      &:focus
        background-image: url('./password-choice.svg')
    input
      font-size: 16px
      width: 135px
      padding: 4px 15px 4px 30px
      margin-bottom: 10px
      border-bottom: 1px solid #D6D6D6
      font-family: inherit
      overflow: hidden
      background-repeat: no-repeat
      background-position: center
      background-position-x: 5px
      background-size: 15px 15px
      &:focus
        border-bottom-color: #1aad19
        outline: 0
        // -webkit-box-shadow: inset 0 1px 1px rgba(26,173,25,.075),0 0 8px rgba(26,173,25,.6)
        // box-shadow: inset 0 1px 1px rgba(26,173,25,.075),0 0 8px rgba(26,173,25,.6)
  .loginBotton
    margin: 35px auto
    width: 180px
    height: 40px
    line-height: 40px
    font-size: 14px
    color: #fff
    background-color: #1aad19
    cursor: pointer
    border-radius: 1px
    &:hover
      background: rgb(18, 150, 17)
</style>