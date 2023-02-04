import request from '@/libs/request'
import {
  postJson
} from '@/libs/request'


/**
 * 创建群聊
 */
export const createChat = (value) => {
  return postJson({
    url: '/groupChat/createChat',
    data: value
  })
}

/**
 * 邀请人加入群聊
 */
 export const inviteUser = (value) => {
  return postJson({
    url: '/groupChat/inviteUser',
    data: value
  })
}


/**
 * 获取群聊列表信息
 */
export const listGroupChat = () => {
  return request({
    url: '/groupChat/listGroupChat',
    method: 'get'
  })
}

/**
 * 用户更新群的资料
 */
export const userUpdateGroupChat = (value) => {
  return postJson({
    url: '/groupChat/userUpdateGroupChat',
    data: value
  })
}



/**
 * 退出群聊
 */
export const deleteChatUser = (groupNo) => {
  const params = {
    groupNo: groupNo
  }
  return request({
    url: '/groupChat/deleteChatUser',
    params,
    method: 'post'
  })
}