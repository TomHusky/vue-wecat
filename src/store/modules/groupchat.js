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
    let rmIndex = [];
    state.groupChatList.filter((x, index) => {
      if (x.id != -1 && !value.find((y) => x.groupNo === y.groupNo)) {
        rmIndex.push(index);
      }
    });
    if (rmIndex.length > 0) {
      rmByIndexs(state.groupChatList, rmIndex);
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
    return state.groupChatList.filter(friends => friends.groupName.includes(state.searchText));
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