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
  deleteGroupChat(state, value) {
    let index = -1;
    for (let i = 0; i < state.groupChatList.length; i++) {
      let x = state.groupChatList[i];
      if (x.groupNo === value) {
        index = i;
      }
    }
    if (index != -1) {
      state.groupChatList.splice(index, 1);
    }
  },
  async ['addGroupChatList'](state, {
    commit,
    dispatch,
    value,
    rootState
  }) {
    for (let i = 0; i < state.groupChatList.length; i++) {
      let x = state.groupChatList[i];
      if (!value.find((y) => x.groupNo === y.groupNo)) {
        x.deleted = true;
      }
    }
    let add = value.filter(x => !state.groupChatList.find((y) => x.groupNo === y.groupNo));

    for (let i = 0; i < add.length; i++) {
      state.groupChatList.push(add[i]);
    }

    for (let i = 0; i < state.groupChatList.length; i++) {
      for (let j = 0; j < value.length; j++) {
        let v = value[j];
        if (state.groupChatList[i].groupNo === v.groupNo) {
          state.groupChatList[i] = v;
          let chat = rootState.chat.chatlist.find((item) => item.chatId === v.groupNo);
          if (chat) {
            chat.info.nickname = v.groupName;
            chat.info.remark = v.remark;
            chat.info.notDisturb = v.notDisturb;
            chat.info.avatar = v.groupAvatar;
            dispatch('chat/updateChatInfo', chat,{root: true});
          }
          break;
        }
      }
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
  async ['addGroupChatList'](store, value) {
    const {
      commit,
      dispatch,
      state,
      rootState,
      rootGetters
    } = store
    commit('addGroupChatList', {
      commit,
      dispatch,
      value,
      rootState
    })
  },
  deleteGroupChat: ({
    commit
  }, value) => commit('deleteGroupChat', value),
}
const getters = {
  // 筛选出含有搜索值的好友列表
  searchedGroupChatList(state, params, rootState) {
    return state.groupChatList.filter(group => !group.deleted && (group.groupName.includes(state.searchText)));
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