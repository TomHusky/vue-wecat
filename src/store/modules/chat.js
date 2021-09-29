import {
  timeDifference
} from "@/libs/tools";
import {
  sendFriendMsg
} from "@/api/msg";
const now = new Date();
// namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
// 例： SET_NAME => user/SET_NAME
const state = {
  // 对话好友列表
  chatlist: [{
    id: 1,
    type: 1,
    wxid: 'wx001',
    username: '99',
    info: {
      avatar: 'static/images/vue.jpg', //头像
      nickname: "机器人", //昵称
      remark: "偷懒的机器人", //备注
    },
    messages: [{
      content: '我会跟你聊聊天的哟',
      date: now,
      showTime: true
    }],
    index: 1
  }, ],
  // 得知当前选择的是哪个对话
  selectId: 1,
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
    state.selectId = value
  },
  // 发送信息
  sendMessage(state, msg) {
    let result = state.chatlist.find(session => session.id === state.selectId);
    let now = new Date();
    // 获取最后一条消息记录
    let lastMsg = result.messages[result.messages.length - 1];
    let interval = timeDifference(new Date(lastMsg.date), now);
    let showTime = false;
    if (interval > 3) {
      showTime = true;
    }
    result.messages.push({
      content: msg.content,
      date: now,
      self: true,
      showTime: showTime
    });
    if (result.wxid === 'wx001') {
      setTimeout(() => {
        result.messages.push({
          content: "由于资金不足，机器人已经跑路!",
          date: now,
          self: false,
          showTime: false
        });
      }, 200)
    } else {
      sendFriendMsg(result.username, msg.content);
    }
  },
  async ['receiveMessage'](state,{commit,msg,friend}) {
    let result = state.chatlist.find(session => session.username === msg.username);
    let showTime = true;
    if (!result) {
      result = {
        type: 1,
        wxid: friend.wxid,
        username: friend.username,
        info: {
          nickname: friend.nickname,
          avatar: friend.avatar,
          remark: friend.remark,
        },
        messages: [],
      };
    } else {
      // 获取最后一条消息记录
      let lastMsg = result.messages[result.messages.length - 1];
      let interval = timeDifference(new Date(lastMsg.date), now);
      if (interval < 3) {
        showTime = false;
      }
    }
    result.messages.push({
      content: msg.msgContent,
      date: new Date(msg.sendTime),
      self: false,
      showTime: showTime
    });
    commit('topChat', result);
  },
  // 置顶聊天
  topChat(state, chat) {
    for (let i = 0; i < state.chatlist.length; i++) {
      if(state.chatlist[i].username === chat.username){
        state.chatlist[i].id = 1;
        state.chatlist[i].index=1;
        return;
      }
      state.chatlist[i].id++;
      state.chatlist[i].index++;
    }
    state.chatlist.unshift({
      id: 1,
      type: chat.type,
      wxid: chat.wxid,
      username: chat.username,
      info: chat.info,
      messages: chat.messages,
      index: 1,
    });
  },
}
const actions = {
  selectSession: ({
    commit
  }, value) => commit('selectSession', value),
  initData: ({
    commit
  }) => commit('initData'),
  sendMessage: ({
    commit
  }, msg) => commit('sendMessage', msg),
  async ['receiveMessage'](store, msg) {
    const {
      commit,
      dispatch,
      state,
      rootState,
      rootGetters
    } = store
    let friend = rootGetters['friend/selectedFriendByUsername'](msg.username);
    commit('receiveMessage', {commit,msg,friend})
  },
  topChat: ({
    commit
  }, chat) => commit('topChat', chat),
}

const getters = {
  // 筛选出含有搜索值的聊天列表
  searchedChatlist(state, getters, rootState) {
    let sessions = state.chatlist.filter(sessions => sessions.info.remark.includes(rootState.system.searchText));
    return sessions
  },
  // 筛选出含有搜索值的聊天列表
  getChatByFriendWxid(state, getters, rootState) {
    let session = state.chatlist.find(session => session.wxid === rootState.friend.selectFriendWxid);
    return session
  },
  // 通过当前选择是哪个对话匹配相应的对话
  selectedChat(state) {
    let session = state.chatlist.find(session => session.id === state.selectId);
    return session
  },
  messages(state) {
    let session = state.chatlist.find(session => session.id === state.selectId);
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