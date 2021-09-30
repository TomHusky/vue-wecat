import Identicon from 'identicon.js'
import {
  md5
} from '@/libs/sign'
import {
  setToken,
  getToken
} from '@/libs/util'
import {
  login,
  logout,
  listFriendInfo
} from '@/api/account'
const state = {
  token: getToken(),
  // 当前登录用户
  info: {
    signature: "",
    sex: 1,
    wxid: "",
    area: "广州",
    nickname: '房东的Tom',
    avatar: null,
    username: "",
  },
}
const mutations = {
  setToken(state, {
    token,
    auto
  }) {
    state.token = token
    setToken(token, auto)
  },
  setUserInfo(state,info){
    state.info = info;
  }
}

const actions = {
  setUserInfo: ({
    commit
  }, info) => commit('setUserInfo', info),
  // 登录
  handleLogin({
    state,
    commit
  }, {
    username,
    password,
    auto
  }) {
    username = username.trim()
    return new Promise((resolve, reject) => {
      login({
        username,
        password
      }).then(res => {
        if (res) {
          if (res.code === 0) {
            const data = res.data;
            const token = data.token
            commit('setToken', {
              token,
              auto
            })
            state.info.signature = data.signature;
            state.info.sex = data.sex;
            state.info.wxid = data.wxid;
            state.info.area = data.area;
            state.info.nickname = data.nickname;
            state.info.avatar = data.avatar;
            state.info.username = data.username;
            resolve(res)
          }
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 退出登录
  handleLogout({
    state,
    commit
  }) {
    return new Promise((resolve, reject) => {
      logout().then(res => {
        commit('setToken', '')
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
const getters = {
  getUser(state, mutations, rootState) {
    if (state.info.avatar == null || state.info.avatar === '') {
      let options = {
        background: [222, 225, 230],
        margin: 0.2,
        size: 420,
        format: 'png'
      };
      state.info.avatar = 'data:image/png;base64,' + new Identicon(md5(state.info.nickname), options).toString()
    }
    return state.info;
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