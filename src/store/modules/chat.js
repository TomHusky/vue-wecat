import {
  timeDifference,
  base64toFile
} from "@/libs/tools";
import {
  sendMsgObj
} from "@/api/socket/sendMsg";
import {
  uploadImg
} from "@/api/source";
const now = new Date();
// namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
// 例： SET_NAME => user/SET_NAME
const state = {
  // 对话好友列表
  chatlist: [{
    id: 1,
    type: 1,
    index: 1,
    chatId: '99',
    info: {
      username: '99',
      avatar: 'static/images/vue.jpg', //头像
      nickname: "机器人", //昵称
      remark: "偷懒的机器人", //备注
      notDisturb: true // 免打扰
    },
    newMsgNum: 0, //新消息条数
    isShow: true,
    lastMsgTime: new Date(),
    messages: [{
      content: '我会跟你聊聊天的哟',
      date: now,
      showTime: true
    }]
  }],
  // 得知当前选择的是哪个对话
  selectChatId: '99',
}
const mutations = {
  // 从localStorage 中获取数据
  initData(state) {
    let data = localStorage.getItem('vue-chat');
    if (data) {
      state.chatlist = JSON.parse(data);
    }
  },
  // 得知用户当前选择的是哪个对话。便于匹配对应的对话框
  selectSession(state, value) {
    state.selectChatId = value;
    let chat = state.chatlist.find(session => session.chatId === value);
    chat.newMsgNum = 0;
    chat.isShow = true;
  },
  // 更新聊天信息
  updateChatInfo(state, value) {
    let chat = state.chatlist.find(session => session.chatId === value.chatId);
    if (value.newMsgNum != null) {
      chat.newMsgNum = value.newMsgNum;
    }
    if (value.newMsgNum != null) {
      chat.isShow = value.isShow;
    }
    if (value.info.notDisturb != null) {
      chat.info.notDisturb = value.info.notDisturb;
    }
  },
  deleteChatByChatId(state, value) {
    let index = -1;
    for (let i = 0; i < state.chatlist.length; i++) {
      if (state.chatlist[i].chatId == value) {
        index = i;
      }
    }
    if (index > -1) {
      state.selectChatId = state.chatlist[index + 1].chatId;
      state.chatlist.splice(index, 1);
    }
  },
  // 发送信息
  sendMessage(state, {
    msg,
    rootState
  }) {
    let result = state.chatlist.find(session => session.chatId === state.selectChatId);
    let now = new Date();
    // 获取最后一条消息时间
    let interval = timeDifference(new Date(result.lastMsgTime), now);
    let showTime = false;
    if (interval > 3) {
      showTime = true;
    }
    result.lastMsgTime = new Date();
    result.messages.push({
      content: msg.content,
      date: now,
      type: msg.type,
      username: rootState.user.info.username,
      showTime: showTime
    });
    if (result.chatId === '99') {
      setTimeout(() => {
        result.messages.push({
          content: "由于资金不足，机器人已经跑路!",
          date: now,
          username: "001",
          type: 1,
          showTime: false
        });
      }, 200)
    } else {
      if (msg.type == 2) {
        let file = base64toFile(msg.content.src, "file");
        // 上传图片
        uploadImg(file).then((res) => {
          if (res.code == 0) {
            sendMsgObj(result.chatId, res.data, result.type, msg.type);
          }
        });
        return;
      }
      sendMsgObj(result.chatId, msg.content, result.type, msg.type);
    }
  },
  async ['receiveMessage'](state, {
    commit,
    msg,
    rootGetters
  }) {
    let result = state.chatlist.find(session => session.chatId === msg.sendId);
    let showTime = true;
    if (!result) {
      let info = {};
      if (msg.msgType == 1) {
        info = rootGetters['friend/selectedFriendByUsername'](msg.username);
        info.chatId = info.username;
      } else {
        let groupChat = rootGetters['groupchat/selectedGroupChatByNo'](msg.sendId);
        info.nickname = groupChat.groupName;
        info.avatar = groupChat.groupAvatar;
        info.remark = groupChat.remark;
        info.notDisturb = groupChat.notDisturb;
        info.chatId = groupChat.groupNo;
      }
      result = {
        type: msg.msgType,
        chatId: info.chatId,
        info: {
          nickname: info.nickname,
          avatar: info.avatar,
          remark: info.remark,
          notDisturb: info.notDisturb,
        },
        isShow: true,
        newMsgNum: 0,
        messages: [],
      };
    } else {
      // 对比最后一条消息时间
      let interval = timeDifference(new Date(result.lastMsgTime), now);
      if (interval < 3) {
        showTime = false;
      }
    }
    if (state.selectChatId !== result.chatId) {
      result.newMsgNum = result.newMsgNum + 1;
    }
    result.lastMsgTime = new Date(msg.sendTime);

    result.messages.push({
      type: msg.contentType,
      username: msg.username,
      content: msg.msgContent,
      date: new Date(msg.sendTime),
      showTime: showTime
    });
    commit('topChat', result);
  },
  // 置顶聊天
  topChat(state, chat) {
    let has = false;
    let index = -1;
    for (let i = 0; i < state.chatlist.length; i++) {
      if (state.chatlist[i].chatId === chat.chatId) {
        state.chatlist[i].id = 1;
        state.chatlist[i].index = 1;
        index = i;
        has = true;
      } else {
        state.chatlist[i].id++;
        state.chatlist[i].index++;
      }
    }
    if (has) {
      state.chatlist.unshift(state.chatlist.splice(index, 1)[0]);
    } else {
      chat.index = 1;
      chat.id = 1;
      chat.isShow = true;
      state.chatlist.unshift(chat);
    }
  },
}
const actions = {
  selectSession: ({
    commit
  }, value) => commit('selectSession', value),
  initData: ({
    commit
  }) => commit('initData'),
  updateChatInfo: ({
    commit
  }, value) => commit('updateChatInfo', value),
  deleteChatByChatId: ({
    commit
  }, value) => commit('deleteChatByChatId', value),
  sendMessage: ({
    commit,
    dispatch,
    state,
    rootState,
    rootGetters
  }, msg) => commit('sendMessage', {
    msg,
    rootState
  }),
  async ['receiveMessage'](store, msg) {
    const {
      commit,
      dispatch,
      state,
      rootState,
      rootGetters
    } = store
    commit('receiveMessage', {
      commit,
      msg,
      rootGetters
    })
  },
  topChat: ({
    commit
  }, chat) => commit('topChat', chat),
}

const getters = {
  getTotalNewMsgs(state) {
    let nums = 0;
    for (let i = 0; i < state.chatlist.length; i++) {
      if (!state.chatlist[i].info.notDisturb && state.chatlist[i].newMsgNum > 0) {
        nums += state.chatlist[i].newMsgNum;
      }
    }
    return nums;
  },
  // 筛选出含有搜索值的聊天列表
  searchedChatlist(state, getters, rootState) {
    let remarkSessions = state.chatlist.filter(sessions => sessions.info.remark != null && sessions.info.remark.includes(rootState.system.searchText));
    let sessions = state.chatlist.filter(sessions => sessions.info.nickname.includes(rootState.system.searchText));
    let add = sessions.filter(x => !remarkSessions.find((y) => x.chatId === y.chatId));
    for (let i = 0; i < add.length; i++) {
      remarkSessions.push(add[i]);
    }
    return remarkSessions
  },
  getChatIndex: state => chatId => {
    for (let i = 0; i < state.chatlist.length; i++) {
      if (state.chatlist[i].chatId == chatId) {
        return i;
      }
    }
    return -1;
  },
  // 筛选出含有搜索值的聊天列表
  getChatByChatId(state, getters, rootState) {
    return function (chatId) {
      return state.chatlist.find(session => session.chatId === chatId);
    }
  },
  // 通过当前选择是哪个对话匹配相应的对话
  selectedChat(state) {
    let session = state.chatlist.find(session => session.chatId === state.selectChatId);
    return session
  },
  messages(state) {
    let session = state.chatlist.find(session => session.chatId === state.selectChatId);
    return session.messages
  }
}


export default {
  namespaced: true,
  // namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
  // 例： SET_NAME => user/SET_NAME
  state,
  mutations,
  actions,
  getters,
}