import {
  getIndex,
  rmByIndexs
} from '@/libs/tools'
const state = {
  friendlist: [{
    id: -1,
    wxid: "wx001", //微信号
    initial: 'A', //姓名首字母
    username: "001",
    avatar: 'static/images/vue.jpg', //头像
    signature: "他什么也没有说", //个性签名
    nickname: "机器人", //昵称
    sex: 0, //性别 1为男，0为女
    remark: "偷懒的机器人", //备注
    origin: "官方",
    area: "广东广州", //地区
  }],
  // 好友请求列表
  newFriendList: [],
  newfriend: {
    id: 0,
    wxid: "1", //微信号
    initial: "新的朋友", //姓名首字母
    avatar: "static/images/newfriend.jpg", //头像
    signature: "", //个性签名
    nickname: "新的朋友", //昵称
    sex: 0, //性别 1为男，0为女
    remark: "新的朋友", //备注
    area: "", //地区
  },
  groupChat: {
    id: 0,
    wxid: "2",
    initial: "群聊",
    avatar: "static/images/group.png",
    signature: "",
    nickname: "群聊",
    sex: 0,
    remark: "群聊",
    area: "",
  },
  // 得知当前选择的是哪个好友
  selectFriendWxid: '1'
}
const mutations = {
  // 得知用户当前选择的是哪个好友。
  selectFriend(state, value) {
    state.selectFriendWxid = value
  },
  addFriend(state, value) {
    let friend = state.friendlist.find(friend => friend.username === value.username);
    if (friend == null) {
      state.friendlist.push(value);
    }
  },
  addFriendList(state, value) {
    let rmIndex = [];
    state.friendlist.filter((x, index) => {
      if (x.id != -1 && !value.find((y) => x.username === y.username)) {
        rmIndex.push(index);
      }
    });
    if (rmIndex.length > 0) {
      rmByIndexs(state.friendlist, rmIndex);
    }
    let add = value.filter(x => !state.friendlist.find((y) => x.username === y.username));
    for (let i = 0; i < add.length; i++) {
      state.friendlist.push(add[i]);
    }
  },
  addNewFriend(state, value) {
    let add = value.filter(x => !state.newFriendList.find((y) => x.applyId === y.applyId));
    for (let i = 0; i < add.length; i++) {
      state.newFriendList.push(add[i]);
    }
  },
  updateNewFriendStatus(state, value) {
    let newFriend = state.newFriendList.find(msg => msg.applyId === value.applyId);
    newFriend.status = value.status;
  }
}
const actions = {
  selectFriend: ({
    commit
  }, value) => commit('selectFriend', value),
  addFriendList: ({
    commit
  }, value) => commit('addFriendList', value),
  addFriend: ({
    commit
  }, value) => commit('addFriend', value),
  addNewFriend: ({
    commit
  }, value) => commit('addNewFriend', value),
  updateNewFriendStatus: ({
    commit
  }, value) => commit('updateNewFriendStatus', value),
}
const getters = {
  getNewFriendNums(state) {
    let nums = 0;
    for (let i = 0; i < state.newFriendList.length; i++) {
      if (state.newFriendList[i].status == 0) {
        nums++;
      }
    }
    return nums;
  },
  // 筛选出含有搜索值的好友列表
  searchedFriendlist(state, params, rootState) {
    let friends = state.friendlist.filter(friends => friends.remark.includes(rootState.system.searchText));
    return friends
  },
  // 通过当前选择是哪个好友匹配相应的好友
  selectedFriend(state) {
    if (state.selectFriendWxid === '1') {
      return state.newfriend;
    }
    if (state.selectFriendWxid === '2') {
      return state.groupChat;
    }
    let friend = state.friendlist.find(friend => friend.wxid === state.selectFriendWxid);
    return friend
  },
  selectedChatFriend(state, getters, rootState) {
    let friend = state.friendlist.find(friend => friend.wxid === rootState.chat.selectChatId);
    return friend
  },
  selectedFriendByUsername(state) {
    return function (username) {
      return state.friendlist.find(friend => friend.username === username)
    }
  },
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