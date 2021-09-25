import request from '@/libs/request'
import {postJson} from '@/libs/request'
import { getToken } from '@/libs/util'
/**
 * 用户登录
 * @param username
 * @param password
 */
export const login = ({ username, password }) => {
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
    data: { token: getToken() },
    method: 'post'
  })
}

/**
 * 获取用户信息
 */
export const listFriendInfo = () => {
  return request({
    url: '/user/listFriendInfo',
    method: 'get'
  })
}

/**
 * 修改密码
 * @param userId
 * @param oldPassword
 * @param newPassword
 */
export const updatePassword = ({ userId, password }) => {
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
