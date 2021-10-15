import request from '@/libs/request'
import {
  postJson
} from '@/libs/request'

/**
 * 获取用户信息
 */
export const listFriendInfo = (username) => {
  const params = {
    username: username
  }
  return request({
    url: '/friend/listFriendInfo',
    params,
    method: 'get'
  })
}

/**
 * 添加好友
 */
export const applyAddFriend = (value) => {
  return postJson({
    url: '/friend/applyAddFriend',
    data: value
  })
}


/**
 * 处理添加好友申请
 */
export const handleFriendApply = (value) => {
  return postJson({
    url: '/friend/handleFriendApply',
    data: value
  })
}