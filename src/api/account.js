import request from '@/libs/request'
import {
  postJson
} from '@/libs/request'
import {
  getToken
} from '@/libs/util'
/**
 * 用户登录
 * @param username
 * @param password
 */
export const login = ({
  username,
  password
}) => {
  const data = {
    username,
    password
  }
  return postJson({
    url: '/login',
    data
  })
}

/**
 * 登出
 */
export const logout = () => {
  return request({
    url: 'admin/logout/token',
    data: {
      token: getToken()
    },
    method: 'post'
  })
}


/**
 * 修改密码
 * @param userId
 * @param oldPassword
 * @param newPassword
 */
export const updatePassword = ({
  userId,
  password
}) => {
  const data = {
    userId: userId,
    password: password
  }
  return request({
    url: 'base/user/update/password',
    data,
    method: 'post'
  })
}

/**
 * 获取用户信息
 */
export const selectUser = (value) => {
  const params = {
    value: value
  }
  return request({
    url: '/user/selectUser',
    params,
    method: 'get'
  })
}

/**
 * 修改个人信息
 */
export const updateInfo = (value) => {
  return postJson({
    url: '/user/updateInfo',
    data:value
  })
}