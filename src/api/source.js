import request from '@/libs/request'
import {
  upload
} from '@/libs/request'


/**
 * 上传图片
 */
export const uploadImg = (file) => {
  return upload({
    url: '/source/uploadImg',
    file: file
  })
}


/**
 * 上传文件
 */
 export const uploadFile = (file) => {
  return upload({
    url: '/source/uploadFile',
    file: file
  })
}


/**
 * 获取系统图标资源
 */
export const listSystemIcon = () => {
  return request({
    url: '/source/listSystemIcon',
    method: 'get'
  })
}