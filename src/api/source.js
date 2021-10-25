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