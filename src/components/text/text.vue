<!-- 文本输入框 -->
<template>
  <div class="text">
    <div class="operation">
      <span class="operation-icon">
        <i
          class="icon iconfont icon-emoji"
          ref="emoji"
          @click="showEmojiList"
        ></i>
      </span>
      <span class="operation-icon img-upload">
        <a href="javascript:;" class="icon iconfont icon-img">
          <input
            type="file"
            @change="selectImg($event)"
            ref="selectImg"
            accept="image/png,image/jpeg,image/gif,image/jpg"
          />
        </a>
      </span>
      <transition name="showbox">
        <div class="emojiBox" v-show="showEmoji">
          <li v-for="item in emojis" :key="item.id">
            <img
              :src="'static/emoji/' + item.file"
              :data="item.code"
              @click="choiceEmoji(item)"
            />
          </li>
        </div>
      </transition>
    </div>
    <div
      id="textarea"
      contenteditable="true"
      ref="text"
      @onpaste="pasteListener($event)"
      @input="textareaInput"
      @keydown.enter="onkeydown($event)"
      @paste="clearCss"
    ></div>
    <div class="send" @click="send">
      <span>发送(ent)</span>
    </div>
    <transition name="appear">
      <div class="warn" v-show="warn">
        <div class="description">不能发送空白信息</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { getTimestamp } from "@/libs/tools";
export default {
  data() {
    return {
      reply: "未找到",
      frequency: 0,
      warn: false,
      showEmoji: false,
      emojiReg:
        /\<img lwj=\"\" wx=\"[\s\S]*\" src=\"static\/emoji\/[\s\S]*\.gif\" style=\"vertical-align: middle; width: 24px; height: 24px\" jwl=\"\"\>/g,
      imgReg:
        /\<img cct=\"1\" style=\"max-width: 140px;max-height: 160px;\" id=\"[0-9]{13}\"/g,
    };
  },
  computed: {
    ...mapState({
      selectChatId: (state) => state.chat.selectChatId,
      emojis: (state) => state.system.emojis,
    }),
    ...mapGetters({ selectedChat: "chat/selectedChat" }),
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
      let items = e.clipboardData && e.clipboardData.items;
      let file = null;
      if (items && items.length) {
        // 检索剪切板items
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            file = items[i].getAsFile();
            break;
          }
        }
      }
      if (file) {
        let textarea = this.$refs.text;
        if (textarea.innerHTML != "") {
          textarea.innerHTML = "";
        }
        this.showImgText(file);
        return;
      }
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
        let _this = this;
        while (content.includes("<img lwj")) {
          let currentId = "";
          let emojiGif = "";
          let sign = "";
          content.replace(this.emojiReg, function (match, index, originText) {
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
    // 将图片标签替换成普通消息
    replaceImgToMsg(content) {
      let currentId = "";
      content.replace(this.imgReg, function (match, index, originText) {
        let id = content.substring(index + 61, index + 61 + 13);
        currentId = id;
      });
      if (currentId !== "") {
        let img = document.getElementById(currentId);
        // 将转换结果赋值给img标签
        content = img.src;
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
    selectImg(e) {
      let file = e.target.files[0];
      if (file.type.split("/")[0] !== "image") {
        alert("请选择图片！");
        return false;
      }
      let size = Math.floor(file.size / 1024);
      if (size > 1 * 1024 * 1024) {
        alert("请选择1M以内的图片！");
        return false;
      }
      this.showImgText(file);
    },
    showImgText(file) {
      if (file) {
        let textarea = this.$refs.text;
        // 声明js的文件流
        let reader = new FileReader();
        //  通过文件流将文件转换成Base64字符串
        reader.readAsDataURL(file);
        //   转换成功后
        let id = getTimestamp();
        reader.onloadend = () => {
          let content = textarea.innerHTML;
          content +=
            '<img cct="1" style=\'max-width: 140px;max-height: 160px;\' id="' +
            id +
            '"cct="2" />';
          textarea.innerHTML = content;
          let img = document.getElementById(id);
          // 将转换结果赋值给img标签
          img.src = reader.result;
        };
      }
    },
    // 按回车发送信息
    onkeydown(e) {
      if (e.ctrlKey && e.keyCode == 13) {
      } else {
        this.send();
        e.preventDefault();
      }
    },
    // 点击发送按钮发送信息
    send() {
      let textarea = this.$refs.text;
      let text = textarea.innerHTML;
      let content = "";
      if (this.imgReg.test(text)) {
        content = this.replaceImgToMsg(text);
        this.sendMsg(content, 2);
        textarea.innerHTML = "";
        return;
      }
      if (this.emojiNumIsOut(text)) {
        alert("表情数量不允许超过5个");
        return;
      }
      // 替换表情
      content = this.replaceEmojiToCode(text);
      if (content.length < 1) {
        this.warn = true;
        setTimeout(() => {
          this.warn = false;
        }, 1000);
      }
      this.sendMsg(content, 1);
      textarea.innerHTML = "";
    },
    sendMsg(content, type) {
      if (this.selectedChat.info.name === "机器人") {
        this.$http
          .get(`https://zhaoplus.com/api/AI?search=${content}`)
          .then((res) => {
            this.reply = res.data.result.text;
            if (content.includes("/:")) {
              this.reply = "嘻嘻";
            }
            let msg = {
              content: content,
              reply: this.reply,
            };
            this.$store.dispatch("chat/sendMessage", msg);
          });
      } else {
        let msg = {
          content: content,
          type: type,
        };
        this.$store.dispatch("chat/sendMessage", msg);
      }
    },
  },
  // 在进入的时候 聚焦输入框
  mounted() {
    this.$refs.text.focus();
  },
  watch: {
    // 在选择其它对话的时候 聚焦输入框
    selectChatId() {
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
#textarea {
  box-sizing: border-box;
  padding-left: 30px;
  height: 110px;
  width: 690px;
  border: none;
  outline: none;
  overflow-y: scroll;
  font-family: 'Micrsofot Yahei';
  resize: none;

  .img-view {
    width: 200px;
  }
}

.text {
  position: relative;
  background: #fff;

  .operation {
    width: 100%;
    height: 40px;
    font-size: 12px;
    padding: 0 30px;
    box-sizing: border-box;
    color: #7c7c7c;

    .operation-icon {
      line-height: 40px;

      .icon-emoji {
        font-size: 18px;
      }

      .icon {
        font-size: 18px;
        color: #4C4C4C;
        cursor: pointer !important;
        margin-right: 15px;

        &:hover {
          color: #1aad19 !important;
        }
      }
    }

    .img-upload {
      overflow: hidden;

      .icon-img {
        position: relative;
        text-decoration: none;
        line-height: 20px;
        font-size: 19px;
        cursor: pointer;
        overflow: hidden;

        input {
          position: absolute;
          width: 100%;
          height: 20px;
          right: 0;
          top: 0;
          opacity: 0;
          // 解决cursor: pointer失效
          font-size: 0;
          cursor: pointer !important;
        }
      }
    }

    .emojiBox {
      position: absolute;
      display: flex;
      flex-wrap: wrap;
      top: -210px;
      left: -100px;
      width: 300px;
      height: 200px;
      padding: 5px;
      background-color: #fff;
      border: 1px solid #d1d1d1;
      border-radius: 2px;
      box-shadow: 0 1px 2px 1px #d1d1d1;

      &.showbox-enter-active, &.showbox-leave-active {
        transition: all 0.5s;
      }

      &.showbox-enter, &.showbox-leave-active {
        opacity: 0;
      }

      img {
        cursor: pointer;
      }
    }
  }

  .send {
    position: absolute;
    cursor: pointer;
    bottom: 10px;
    right: 30px;
    width: 75px;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    background: #f5f5f5;
    font-size: 14px;
    color: #7c7c7c;

    &:hover {
      background: rgb(18, 150, 17);
      color: #fff;
    }
  }

  .warn {
    position: absolute;
    bottom: 50px;
    right: 10px;
    width: 110px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #bdbdbd;
    border-radius: 4px;
    box-shadow: 0 1px 5px 1px #bdbdbd;

    &.appear-enter-active, &.appear-leave-active {
      transition: all 1s;
    }

    &.appear-enter, &.appear-leave-active {
      opacity: 0;
    }

    &:before {
      content: ' ';
      position: absolute;
      top: 100%;
      right: 20px;
      border: 7px solid transparent;
      border-top-color: #fff;
      filter: drop-shadow(1px 3px 2px #bdbdbd);
    }
  }
}
</style>
