import {
  timeDifference
} from "@/libs/tools";
const now = new Date();
// namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
// 例： SET_NAME => user/SET_NAME
const state = {
  // 对话好友列表
  chatlist: [{
      id: 1,
      type: 1,
      wxid: 'wxid_itjz73t1ajt722',
      info: {
        img: 'static/images/mother.jpg',
        nickname: "娄娄",
        remark: "妈咪"
      },
      messages: [{
          content: '么么哒，妈咪爱你', //聊天内容
          date: now, //时间
          showTime: true
        },
        {
          content: '按回车可以发送信息，还可以给我发送表情哟',
          date: now,
          showTime: false
        }
      ],
      index: 1 // 当前在聊天列表中的位置,从1开始
    },
    {
      id: 2,
      type: 1,
      wxid: 'hwn0366',
      info: {
        img: 'static/images/father.jpg',
        nickname: "滴答",
        remark: "father"
      },
      messages: [{
        content: 'Are you kidding me?',
        date: now,
        showTime: true
      }],
      index: 2
    },
    {
      id: 3,
      type: 1,
      wxid: 'wx_001',
      info: {
        img: 'static/images/vue.jpg', //头像
        nickname: "机器人", //昵称
        remark: "偷懒的机器人", //备注
      },
      messages: [{
        content: '我会跟你聊聊天的哟',
        date: now,
        showTime: true
      }],
      index: 3
    },
    {
      id: 4,
      type: 2,
      wxid: 'wx_001',
      info: {
        img: 'static/images/vue.jpg', //头像
        nickname: "机器人", //昵称
        remark: "偷懒的机器人", //备注
      },
      messages: [{
        content: '我会跟你聊聊天的哟',
        date: now,
        showTime: true
      }],
      index: 4
    }
  ],
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
    if (result.info.name === '机器人') {
      setTimeout(() => {
        result.messages.push({
          content: msg.reply,
          date: now,
          self: false,
          showTime: showTime
        });
      }, 500)
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
  sendMessage: ({
    commit
  }, msg) => commit('sendMessage', msg),
}
const getters = {
  // 筛选出含有搜索值的聊天列表
  searchedChatlist(state,params, rootState) {
    let sessions = state.chatlist.filter(sessions => sessions.info.remark.includes(rootState.system.searchText));
    return sessions
  },
  // 筛选出含有搜索值的聊天列表
  getChatByFriendWxid(state,params, rootState) {
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
