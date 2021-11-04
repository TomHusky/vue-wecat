import {
  getIndex,
  rmByIndexs
} from '@/libs/tools'
const state = {
  groupChatList: [],
  searchText: ""
}
const mutations = {
  // 获取搜索值
  search(state, value) {
    state.searchText = value
  },
  addGroupChat(state, value) {
    let groupChat = state.groupChatList.find(groupChat => groupChat.groupNo === value.groupNo);
    if (groupChat == null) {
      state.groupChatList.push(value);
    }
  },
  addGroupChatList(state, value) {
    for (let i = 0; i < state.groupChatList.length; i++) {
      let x = state.groupChatList[i];
      if (value.find((y) => x.groupNo !== y.groupNo)) {
        x.deleted = true;
      }
    }
    let add = value.filter(x => !state.groupChatList.find((y) => x.groupNo === y.groupNo));
    for (let i = 0; i < add.length; i++) {
      state.groupChatList.push(add[i]);
    }
  }
}
const actions = {
  search: ({
    commit
  }, value) => {
    setTimeout(() => {
      commit('search', value)
    }, 100)
  },
  addGroupChat: ({
    commit
  }, value) => commit('addGroupChat', value),
  addGroupChatList: ({
    commit
  }, value) => commit('addGroupChatList', value)
}
const getters = {
  // 筛选出含有搜索值的好友列表
  searchedGroupChatList(state, params, rootState) {
     let a= state.groupChatList.filter(group => !group.deleted && (group.groupName.includes(state.searchText)));
     console.log(a);
     return a;
  },
  // 根据群编号获取群信息
  selectedGroupChat(state, params, rootState) {
    return state.groupChatList.find(group => group.groupNo === rootState.chat.selectChatId);
  },
  selectedGroupChatByNo(state) {
    return function (groupNo) {
      return state.groupChatList.find(group => !group.deleted && (group.groupNo === groupNo))
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