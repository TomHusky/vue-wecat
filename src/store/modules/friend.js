import {
  getIndex,
  rmByIndexs
} from '@/libs/tools'
const state = {
  // 好友列表
  // friendlist: [{
  //     id: 0,
  //     wxid: "", //微信号
  //     initial: '新的朋友', //姓名首字母
  //     img: 'static/images/newfriend.jpg', //头像
  //     signature: "", //个性签名
  //     nickname: "新的朋友", //昵称
  //     sex: 0, //性别 1为男，0为女
  //     remark: "新的朋友", //备注
  //     area: "", //地区
  //   },
  //   {
  //     id: 1,
  //     wxid: "AmorAres-", //微信号
  //     initial: 'A', //姓名首字母
  //     img: 'static/images/小姨妈.jpg', //头像
  //     signature: "每天我就萌萌哒", //个性签名
  //     nickname: "Amor", //昵称
  //     sex: 0, //性别 1为男，0为女
  //     remark: "Amor", //备注
  //     area: "浙江 宁波", //地区
  //   },
  //   {
  //     id: 2,
  //     wxid: "Big-fly",
  //     initial: 'B',
  //     img: 'static/images/大飞哥.jpg',
  //     signature: "你不知道的js",
  //     nickname: "fly",
  //     sex: 1,
  //     remark: "大飞哥",
  //     area: "奥地利 布尔根兰",
  //   },
  //   {
  //     id: 3,
  //     wxid: "microzz",
  //     initial: 'D',
  //     img: 'static/images/microzz.jpg',
  //     signature: "学习让我快乐让我成长",
  //     nickname: "microzz",
  //     sex: 1,
  //     remark: "大佬",
  //     area: "江西 赣州",
  //   },
  //   {
  //     id: 4,
  //     wxid: "hwn0366",
  //     initial: 'F',
  //     img: 'static/images/father.jpg',
  //     signature: "学习让我快乐让我成长",
  //     nickname: "丢",
  //     sex: 1,
  //     remark: "father",
  //     area: "江西 抚州",
  //   },
  //   {
  //     id: 5,
  //     wxid: "orange66",
  //     initial: 'J',
  //     img: 'static/images/orange.jpg',
  //     signature: "你可以笑的很阳光！",
  //     nickname: "orange",
  //     sex: 1,
  //     remark: "橘子",
  //     area: "江西 赣州",
  //   },
  //   {
  //     id: 6,
  //     wxid: "Seto_L",
  //     img: 'static/images/加菲猫.jpg',
  //     signature: "自强不息",
  //     nickname: "21",
  //     sex: 1,
  //     remark: "加菲",
  //     area: "北京 海淀",
  //   },
  //   {
  //     id: 7,
  //     wxid: "wxid_itjz73t1ajt722",
  //     initial: 'M',
  //     img: 'static/images/mother.jpg',
  //     signature: "开开心心就好",
  //     nickname: "娄娄",
  //     sex: 0,
  //     remark: "妈咪",
  //     area: "江西 抚州",
  //   },
  //   {
  //     id: 8,
  //     wxid: "hj960503",
  //     img: 'static/images/萌萌俊.jpg',
  //     signature: "原谅我有点蠢。。",
  //     nickname: "okk",
  //     sex: 1,
  //     remark: "萌萌均",
  //     area: "江西 萍乡",
  //   },
  //   {
  //     id: 999,
  //     wxid: "wx_001", //微信号
  //     initial: 'G', //姓名首字母
  //     img: 'static/images/vue.jpg', //头像
  //     signature: "你找我我也不一定理你", //个性签名
  //     nickname: "机器人", //昵称
  //     sex: 0, //性别 1为男，0为女
  //     remark: "偷懒的机器人", //备注
  //     area: "火星", //地区
  //   }
  // ],
  // 得知当前选择的是哪个好友
  newfriend: {
    id: 0,
    wxid: "", //微信号
    initial: "新的朋友", //姓名首字母
    avatar: "static/images/newfriend.jpg", //头像
    signature: "", //个性签名
    nickname: "新的朋友", //昵称
    sex: 0, //性别 1为男，0为女
    remark: "新的朋友", //备注
    area: "", //地区
  },
  friendlist: [],
  selectFriendWxid: ''
}
const mutations = {
  // 得知用户当前选择的是哪个好友。
  selectFriend(state, value) {
    state.selectFriendWxid = value
  },
  addFriend(state, value) {
    let rmIndex = [];
    state.friendlist.filter((x, index) => {
      if (!value.find((y) => x.username === y.username)) {
        rmIndex.push(index);
      }
    });
    let add = value.filter(x => !state.friendlist.find((y) => x.username === y.username));
    rmByIndexs(state.friendlist, rmIndex);
    for (let i = 0; i < add.length; i++) {
      state.friendlist.push(add[i]);
    }
  }
}
const actions = {
  selectFriend: ({
    commit
  }, value) => commit('selectFriend', value),
  addFriend: ({
    commit
  }, value) => commit('addFriend', value)
}
const getters = {
  // 筛选出含有搜索值的好友列表
  searchedFriendlist(state, params, rootState) {
    let friends = state.friendlist.filter(friends => friends.remark.includes(rootState.system.searchText));
    return friends
  },
  // 通过当前选择是哪个好友匹配相应的好友
  selectedFriend(state) {
    if (state.selectFriendWxid === null || state.selectFriendWxid === '') {
      return state.newfriend;
    }
    let friend = state.friendlist.find(friend => friend.wxid === state.selectFriendWxid);
    return friend
  },
  selectedChatFriend(state, getters, rootState) {
    let session = rootState.chat.chatlist.find(session => session.wxid === rootState.chat.selectWxid);
    let friend = state.friendlist.find(friend => friend.wxid === session.wxid);
    return friend
  },
  selectedFriendByUsername(state){
    return function (username) {
      return state.friendlist.find(friend => friend.username ===username)
    }
  },
}

export default {
  namespaced: true,
  // namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
  // 例： SET_NAME => user/SET_NAME
  state,
  mutations,
  actions,
  getters,
}