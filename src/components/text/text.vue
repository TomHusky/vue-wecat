<!-- 文本输入框 -->
<template>
  <div class="text">
    <div class="emoji">
      <i
        class="icon iconfont icon-look"
        ref="emoji"
        @click="showEmojiList"
      ></i>
      <transition name="showbox">
        <div
          class="emojiBox"
          v-show="showEmoji"
        >
          <li
            v-for="item in emojis"
            :key="item.id"
          >
            <img
              :src="'static/emoji/'+item.file"
              :data="item.code"
              @click="choiceEmoji(item)"
            >
          </li>
        </div>
      </transition>
    </div>
    <div
      id="textarea"
      contenteditable="true"
      ref="text"
      @input="textareaInput"
      @keydown.enter="onkeydown($event)"
      @paste="clearCss"
    ></div>
    <div
      class="send"
      @click="send"
    >
      <span>发送(ent)</span>
    </div>
    <transition name="appear">
      <div
        class="warn"
        v-show="warn"
      >
        <div class="description">不能发送空白信息</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      originalConent: [],
      content: "",
      reply: "未找到",
      frequency: 0,
      warn: false,
      showEmoji: false,
    };
  },
  computed: {
    ...mapState({selectWxid:  (state) => state.chat.selectWxid, emojis:(state) => state.system.emojis}),
    ...mapGetters({selectedChat:"chat/selectedChat"}),
  },
  created() {
    document.addEventListener("click", (e) => {
      if (this.$refs.emoji == null) {
        return;
      }
      if (!this.$refs.emoji.contains(e.target)) {
        if (this.showEmoji) {
          this.showEmoji = false;
        }
      }
    });
  },
  methods: {
    clearCss(e) {
      e.stopPropagation();
      e.preventDefault();
      let text = "",
        event = e.originalEvent || e;
      if (event.clipboardData && event.clipboardData.getData) {
        text = event.clipboardData.getData("text/plain");
      } else if (window.clipboardData && window.clipboardData.getData) {
        text = window.clipboardData.getData("Text");
      }
      if (document.queryCommandSupported("insertText")) {
        document.execCommand("insertText", false, text);
      } else {
        document.execCommand("paste", false, text);
      }
    },
    textareaInput($event) {
      // this.content = $event.target.innerHTML;
      // 获取选定对象
      // let selection = getSelection();
      // 设置最后光标对象
      // lastEditRange = selection.getRangeAt(0);
    },
    showEmojiList() {
      this.showEmoji = true;
    },
    // 选择表情
    choiceEmoji(item) {
      this.showEmoji = false;
      let textarea = this.$refs.text;
      let content = textarea.innerHTML;
      if (this.emojiNumIsOut(content)) {
        alert("表情数量不允许超过5个");
        return;
      }
      content += item.sign;
      let result = this.replaceEmoji(content);
      textarea.innerHTML = result;
    },
    replaceEmoji(con) {
      if (con.includes("@::tt;;@")) {
        let emojis = this.emojis;
        for (let i = 0; i < emojis.length; i++) {
          con = con.replace(
            emojis[i].reg,
            '<img lwj="" wx="' +
              emojis[i].id +
              '" src="static/emoji/' +
              emojis[i].file +
              '" style="vertical-align: middle; width: 24px; height: 24px" jwl=""/>'
          );
        }
        return con;
      }
      return con;
    },
    replaceEmojiToCode(content) {
      if (content.includes("<img lwj")) {
        let reg =
          /\<img lwj=\"\" wx=\"[\s\S]*\" src=\"static\/emoji\/[\s\S]*\.gif\" style=\"vertical-align: middle; width: 24px; height: 24px\" jwl=\"\"\>/g;
        let _this = this;
        while (content.includes("<img lwj")) {
          let currentId = "";
          let emojiGif = "";
          let sign = "";
          content.replace(reg, function (match, index, originText) {
            let id = content.substring(index + 16, index + 16 + 32);
            currentId = id;
            _this.emojis
              .filter((item) => item.id === id)
              .map((emoji) => {
                emojiGif = emoji.file;
                sign = emoji.sign;
              });
          });
          let signReg = this.getEmojiSignReg(currentId, emojiGif);
          content = content.replace(signReg, sign);
        }
        // content = content.replace(reg, sign);
        return content;
      }
      return content;
    },
    getEmojiSignReg(id, emojiGif) {
      let emoji = emojiGif.substring(0, emojiGif.indexOf("."));
      return new RegExp(
        '\\<img lwj=\\"\\" wx=\\"' +
          id +
          '\\" src=\\"static\\/emoji\\/' +
          emoji +
          '\\.gif\\" style=\\"vertical-align: middle; width: 24px; height: 24px\\" jwl=\\"\\"\\>',
        "g"
      );
    },
    emojiNumIsOut(content) {
      let ref = /\<img lwj=\"\" wx=\"[a-z0-9]{32}\"/g;
      let emoji = content.match(ref);
      if (emoji && emoji.length >= 5) {
        return true;
      }
      return false;
    },
    // 按回车发送信息
    onkeydown(e) {
      if (e.ctrlKey && e.keyCode == 13) {
        
      }else{
        this.send();
        e.preventDefault();
      }
    },
    // 点击发送按钮发送信息
    send() {
      let textarea = this.$refs.text;
      let text = textarea.innerHTML;
      if (this.emojiNumIsOut(text)) {
        alert("表情数量不允许超过5个");
        return;
      }
      let content = this.replaceEmojiToCode(text);
      this.content = content;
      if (this.content.length < 1) {
        this.warn = true;
        this.content = "";
        setTimeout(() => {
          this.warn = false;
        }, 1000);
      } else {
        if (this.selectedChat.info.name === "机器人") {
          this.$http
            .get(`https://zhaoplus.com/api/AI?search=${this.content}`)
            .then((res) => {
              this.reply = res.data.result.text;
              if (this.content.includes("/:")) {
                this.reply = "嘻嘻";
              }
              var msg = {
                content: this.content,
                reply: this.reply,
              };
              this.$store.dispatch("chat/sendMessage", msg);
              this.content = "";
              textarea.innerHTML = "";
            });
        } else {
          var msg = {
            content: this.content,
          };
          this.$store.dispatch("chat/sendMessage", msg);
          this.content = "";
          textarea.innerHTML = "";
        }
      }
    },
  },
  // 在进入的时候 聚焦输入框
  mounted() {
    this.$refs.text.focus();
  },
  watch: {
    // 在选择其它对话的时候 聚焦输入框
    selectWxid() {
      setTimeout(() => {
        this.$refs.text.focus();
      }, 0);
    },
    // 当输入框中的值为空时 弹出提示  并在一秒后消失
    content() {
      if (this.content === "") {
        if (this.frequency === 0) {
          this.warn = true;
          this.frequency++;
          setTimeout(() => {
            this.warn = false;
          }, 1000);
        }
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
#textarea
  box-sizing: border-box
  padding: 0 30px
  height: 110px
  width: 554px
  border: none
  outline: none
  overflow-y: scroll
  font-family: 'Micrsofot Yahei'
  resize: none
.text
  position: relative
  background: #fff
  .emoji
    position: relative
    width: 100%
    height: 40px
    line-height: 40px
    font-size: 12px
    padding: 0 30px
    box-sizing: border-box
    color: #7c7c7c
    .icon-look
      cursor: pointer
      &:hover
        color: #1aad19
    .emojiBox
      position: absolute
      display: flex
      flex-wrap: wrap
      top: -210px
      left: -100px
      width: 300px
      height: 200px
      padding: 5px
      background-color: #fff
      border: 1px solid #d1d1d1
      border-radius: 2px
      box-shadow: 0 1px 2px 1px #d1d1d1
      &.showbox-enter-active, &.showbox-leave-active
        transition: all 0.5s
      &.showbox-enter, &.showbox-leave-active
        opacity: 0
  .send
    position: absolute
    cursor: pointer
    bottom: 10px
    right: 30px
    width: 75px
    height: 28px
    line-height: 28px
    box-sizing: border-box
    text-align: center
    border: 1px solid #e5e5e5
    border-radius: 3px
    background: #f5f5f5
    font-size: 14px
    color: #7c7c7c
    &:hover
      background: rgb(18, 150, 17)
      color: #fff
  .warn
    position: absolute
    bottom: 50px
    right: 10px
    width: 110px
    height: 30px
    line-height: 30px
    font-size: 12px
    text-align: center
    border: 1px solid #bdbdbd
    border-radius: 4px
    box-shadow: 0 1px 5px 1px #bdbdbd
    &.appear-enter-active, &.appear-leave-active
      transition: all 1s
    &.appear-enter, &.appear-leave-active
      opacity: 0
    &:before
      content: ' '
      position: absolute
      top: 100%
      right: 20px
      border: 7px solid transparent
      border-top-color: #fff
      filter: drop-shadow(1px 3px 2px #bdbdbd)
</style>
