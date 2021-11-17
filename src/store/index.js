import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context("./modules", true, /\.js$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const store = new Vuex.Store({
  modules,
  plugins: [createPersistedState({
    key: "vue-wechat",
    // reducer (val) {
    //   return {
    //     user: val.user,
    //     chat: val.chat,
    //     friendlist: val.friend.friendlist
    //   }
    // },
    paths: ['user','chat.chatlist',"chat.selectChatId",'system.headMenu','system.systemFileIcon','friend.friendlist',"friend.newFriendList","groupchat.groupChatList"]
  })]
});
export default store;
