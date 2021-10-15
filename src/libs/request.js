import axios from 'axios'
import qs from 'qs'
import store from '@/store/index.js'
import router from '@/router/index.js'
import $config from '@/config'
import {
  getToken,
  removeToken
} from '@/libs/util'
import Message from '@/components/other/message'
import {
  sign
} from '@/libs/sign'

let baseUrl = 'http://127.0.0.1:8088/chat'
let message = Message.install;

switch (process.env.NODE_ENV) {
  case 'development':
    // 这里是本地的请求url
    baseUrl = $config.apiUrl.dev
    break
  case 'production':
    // 生产环境url
    baseUrl = $config.apiUrl.pro
    break
}


export function getBaseUrl() {
  return baseUrl.substring(baseUrl.indexOf("//"));
}


/**
 * 创建axios实例
 * @type {AxiosInstance}
 */
const service = axios.create({
  // api的base_url
  baseURL: baseUrl,
  // 设置请求超时时间30s
  timeout: 30000
})


service.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

service.apiUrl = baseUrl

/**
 * 请求参数处理
 */
service.interceptors.request.use((config) => {
  // // 参数签名处理
  // config = sign(config, $config.appId, $config.appSecret, 'SHA256')
  // config.method === 'get'
  //   ? config.params = {...config.params} : config.data = qs.stringify({...config.data})
  const token = getToken()
  if (token && !config.url.includes("login")) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config
})
/**
 * 响应结果处理
 */
service.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      // 服务端定义的响应code码为0时请求成功
      // 使用Promise.resolve 正常响应
      return Promise.resolve(response.data)
    } else {
      // 使用Promise.reject 响应
      // Message.error({content: response.data.message})
      message({
        content: response.data.msg,
        time: 2500,
        type: "error",
        hasClose: true,
      });
      return Promise.reject(response.data)
    }
  }, error => {
    let msg = ''
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          exitLogin();
          location.reload()
          return
        case 403:
          msg = error.response.data.path + ',' + error.response.data.msg
          exitLogin();
          break
        case 429:
          msg = '访问太过频繁，请稍后再试!'
          break
        default:
          msg = error.response.data.msg ? error.response.data.msg : '服务器错误'
          break
      }
      message({
        content: msg,
        time: 2500,
        type: "error",
        hasClose: true,
      });
      // 请求错误处理
      return Promise.reject(error)
    } else {
      msg = '连接服务器失败'
      message({
        content: '连接服务器失败',
        time: 2500,
        type: "error",
        hasClose: true,
      });
      return Promise.reject(error)
    }
  }
)



export function exitLogin() {
  store.commit("user/setToken", "");
  removeToken();
  router.push({
    path: '/login'
  });
}

//封装post json请求
export function postJson({url,data}) {
  //默认配置 
  let sendObject = {
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: null,
  };
  sendObject.data = JSON.stringify(data);
  return service(sendObject)
}

export default service