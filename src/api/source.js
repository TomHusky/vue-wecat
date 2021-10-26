import request from '@/libs/request'
import {
  uploadFile
} from '@/libs/request'


/**
 * 上传图片
 */
export const uploadImg = (file) => {
  return uploadFile({
    url: '/source/uploadImg',
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