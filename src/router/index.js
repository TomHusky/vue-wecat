import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import { setToken, getToken} from '@/libs/util'
import config from '@/config'

Vue.use(Router)

let BASE_URL = ''
switch (process.env.NODE_ENV) {
  case 'development':
    BASE_URL = config.publicPath.dev // 这里是本地的请求url
    break
  case 'production':
    BASE_URL = config.publicPath.pro // 生产环境url
    break
}

const router = new Router({
  routes: routes,
  mode: 'history',
  linkActiveClass: 'active',
// 共三个页面： 聊天页面，好友页面，个人简历分别对应一下路由
})
// router.push({ path: '/' });

// router.beforeEach((to, from, next) => {
//   const token = getToken();
//   if(to.path == "/login"){
//     if(token){
//       next("/");
//     }else{
//       next();
//     }
//   }else{
//     if(token) {
//       next();
//     }else{
//       next("/login");
//     }
//   }
// })
export default router