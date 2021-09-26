import { setToken, getToken } from '@/libs/util'
import { login, logout, listFriendInfo} from '@/api/account'
const state = {
  token: getToken(),
}
const mutations = {
  setToken (state, { token, auto }) {
    state.token = token
    setToken(token, auto)
  },
}

const actions = {
  // 登录
  handleLogin ({ commit }, { username, password, auto }) {
    username = username.trim()
    return new Promise((resolve, reject) => {
      login({
        username,
        password
      }).then(res => {
        if (res) {
          if (res.code === 0) {
            let token = res.data.token
            commit('setToken', { token, auto })
            resolve(res)
          }
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 退出登录
  handleLogout ({ state, commit }) {
    return new Promise((resolve, reject) => {
      logout().then(res => {
        commit('setToken', '')
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取用户相关信息
  listFriendInfo ({ state, commit }) {
    return new Promise((resolve, reject) => {
      listFriendInfo().then(res => {
        if (res.code === 0) {
          commit('setAvatar', res.data.avatar)
          commit('setUserName', res.data.username)
          commit('setNickName', res.data.nickName)
          commit('setUserId', res.data.userId)
          commit('setEmail', res.data.email)
          commit('setMobile', res.data.mobile)
          commit('setUserDesc', res.data.userDesc)
          const access = []
          if (res.data.authorities) {
            res.data.authorities.map(item => {
              if (item.authority) {
                access.push(item.authority)
              }
            })
          }
          // 转换权限
          commit('setAccess', access)
          commit('setHasGetInfo', true)
          getCurrentUserMenu().then(res => {
            if (res.code === 0) {
              commit('setUserMenus', res.data)
              resolve(state)
            }
          }).catch(err => {
            reject(err)
          })
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}
const getters = {

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
