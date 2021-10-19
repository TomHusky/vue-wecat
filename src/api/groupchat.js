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
 * 获取群聊列表信息
 */
 export const listGroupChat = () => {
  return request({
    url: '/groupChat/listGroupChat',
    method: 'get'
  })
}