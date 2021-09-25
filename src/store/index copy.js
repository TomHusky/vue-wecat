import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import {
  timeDifference
} from "@/libs/tools";
Vue.use(Vuex)

//获取当前时间
const now = new Date();
const state = {
  windowWidth: null,
  windowHeight: null,
  // 输入的搜索值
  searchText: '',
  // 当前登录用户
  user: {
    signature: "码农的世界你不懂",
    sex: 1,
    wxid: "1677900582",
    area: "广州",
    nickname: 'ratel',
    img: 'static/images/UserAvatar.jpg'
  },
  // 对话好友列表
  chatlist: [{
      id: 1,
      type: 1,
      wxid: 'wxid_itjz73t1ajt722',
      info: {
        img: 'static/images/mother.jpg',
        nickname: "娄娄",
        remark: "妈咪"
      },
      messages: [{
          content: '么么哒，妈咪爱你', //聊天内容
          date: now, //时间
          showTime: true
        },
        {
          content: '按回车可以发送信息，还可以给我发送表情哟',
          date: now,
          showTime: false
        }
      ],
      index: 1 // 当前在聊天列表中的位置,从1开始
    },
    {
      id: 2,
      type: 1,
      wxid: 'hwn0366',
      info: {
        img: 'static/images/father.jpg',
        nickname: "滴答",
        remark: "father"
      },
      messages: [{
        content: 'Are you kidding me?',
        date: now,
        showTime: true
      }],
      index: 2
    },
    {
      id: 3,
      type: 1,
      wxid: 'wx_001',
      info: {
        img: 'static/images/vue.jpg', //头像
        nickname: "机器人", //昵称
        remark: "偷懒的机器人", //备注
      },
      messages: [{
        content: '我会跟你聊聊天的哟',
        date: now,
        showTime: true
      }],
      index: 3
    },
    {
      id: 4,
      type: 2,
      wxid: 'wx_001',
      info: {
        img: 'static/images/vue.jpg', //头像
        nickname: "机器人", //昵称
        remark: "偷懒的机器人", //备注
      },
      messages: [{
        content: '我会跟你聊聊天的哟',
        date: now,
        showTime: true
      }],
      index: 4
    }
  ],
  // 好友列表
  friendlist: [{
      id: -1,
      wxid: "wx_001", //微信号
      initial: 'G', //姓名首字母
      img: 'static/images/vue.jpg', //头像
      signature: "你找我我也不一定理你", //个性签名
      nickname: "机器人", //昵称
      sex: 0, //性别 1为男，0为女
      remark: "偷懒的机器人", //备注
      area: "火星", //地区
    }, {
      id: 0,
      wxid: "1737401145", //微信号
      initial: '新的朋友', //姓名首字母
      img: 'static/images/newfriend.jpg', //头像
      signature: "", //个性签名
      nickname: "新的朋友", //昵称
      sex: 0, //性别 1为男，0为女
      remark: "新的朋友", //备注
      area: "", //地区
    },
    {
      id: 1,
      wxid: "AmorAres-", //微信号
      initial: 'A', //姓名首字母
      img: 'static/images/小姨妈.jpg', //头像
      signature: "每天我就萌萌哒", //个性签名
      nickname: "Amor", //昵称
      sex: 0, //性别 1为男，0为女
      remark: "Amor", //备注
      area: "浙江 宁波", //地区
    },
    {
      id: 2,
      wxid: "Big-fly",
      initial: 'B',
      img: 'static/images/大飞哥.jpg',
      signature: "你不知道的js",
      nickname: "fly",
      sex: 1,
      remark: "大飞哥",
      area: "奥地利 布尔根兰",
    },
    {
      id: 3,
      wxid: "microzz",
      initial: 'D',
      img: 'static/images/microzz.jpg',
      signature: "学习让我快乐让我成长",
      nickname: "microzz",
      sex: 1,
      remark: "大佬",
      area: "江西 赣州",
    },
    {
      id: 4,
      wxid: "hwn0366",
      initial: 'F',
      img: 'static/images/father.jpg',
      signature: "学习让我快乐让我成长",
      nickname: "丢",
      sex: 1,
      remark: "father",
      area: "江西 抚州",
    },
    {
      id: 5,
      wxid: "orange66",
      initial: 'J',
      img: 'static/images/orange.jpg',
      signature: "你可以笑的很阳光！",
      nickname: "orange",
      sex: 1,
      remark: "橘子",
      area: "江西 赣州",
    },
    {
      id: 6,
      wxid: "Seto_L",
      img: 'static/images/加菲猫.jpg',
      signature: "自强不息",
      nickname: "21",
      sex: 1,
      remark: "加菲",
      area: "北京 海淀",
    },
    {
      id: 7,
      wxid: "wxid_itjz73t1ajt722",
      initial: 'M',
      img: 'static/images/mother.jpg',
      signature: "开开心心就好",
      nickname: "娄娄",
      sex: 0,
      remark: "妈咪",
      area: "江西 抚州",
    },
    {
      id: 8,
      wxid: "hj960503",
      img: 'static/images/萌萌俊.jpg',
      signature: "原谅我有点蠢。。",
      nickname: "okk",
      sex: 1,
      remark: "萌萌均",
      area: "江西 萍乡",
    }

  ],
  emojis: [{
      sign: "@::tt;;@f179c32a157fc3905b3f845cdde9d786@",
      file: "100.gif",
      code: "/::)",
      title: "微笑",
      reg: /@::tt;;@f179c32a157fc3905b3f845cdde9d786@/g,
      id: "f179c32a157fc3905b3f845cdde9d786"
    },
    {
      sign: "@::tt;;@d3af995fbd5e85690dc7fad8f72e117b@",
      file: "101.gif",
      code: "/::~",
      title: "伤心",
      reg: /@::tt;;@d3af995fbd5e85690dc7fad8f72e117b@/g,
      id: "d3af995fbd5e85690dc7fad8f72e117b"
    },
    {
      sign: "@::tt;;@c973e1eff6c08a3e195f1bfbd4fe6e38@",
      file: "102.gif",
      code: "/::B",
      title: "美女",
      reg: /@::tt;;@c973e1eff6c08a3e195f1bfbd4fe6e38@/g,
      id: "c973e1eff6c08a3e195f1bfbd4fe6e38"
    },
    {
      sign: "@::tt;;@d778401b0c2d91ba64e632312e98d91a@",
      file: "103.gif",
      code: "/::|",
      title: "发呆",
      reg: /@::tt;;@d778401b0c2d91ba64e632312e98d91a@/g,
      id: "d778401b0c2d91ba64e632312e98d91a"
    },
    {
      sign: "@::tt;;@daea8564a1977711c1bf1a583efbc813@",
      file: "104.gif",
      code: "/:8-)",
      title: "墨镜",
      reg: /@::tt;;@daea8564a1977711c1bf1a583efbc813@/g,
      id: "daea8564a1977711c1bf1a583efbc813"
    },
    {
      sign: "@::tt;;@39b3c431d9e5c681f893fff06c808e6c@",
      file: "105.gif",
      code: "/::<",
      title: "哭",
      reg: /@::tt;;@39b3c431d9e5c681f893fff06c808e6c@/g,
      id: "39b3c431d9e5c681f893fff06c808e6c"
    },
    {
      sign: "@::tt;;@1417b83427473d13fb560f10f7a602b1@",
      file: "106.gif",
      code: "/::$",
      title: "羞",
      reg: /@::tt;;@1417b83427473d13fb560f10f7a602b1@/g,
      id: "1417b83427473d13fb560f10f7a602b1"
    },
    {
      sign: "@::tt;;@e46ca940d8c5752a1c3070b7c80119f3@",
      file: "107.gif",
      code: "/::X",
      title: "哑",
      reg: /@::tt;;@e46ca940d8c5752a1c3070b7c80119f3@/g,
      id: "e46ca940d8c5752a1c3070b7c80119f3"
    },
    {
      sign: "@::tt;;@1ed1f8223ccc40a2798c79ab9e97cc86@",
      file: "108.gif",
      code: "/::Z",
      title: "睡",
      reg: /@::tt;;@1ed1f8223ccc40a2798c79ab9e97cc86@/g,
      id: "1ed1f8223ccc40a2798c79ab9e97cc86"
    },
    {
      sign: "@::tt;;@6ccf78fca7ae7e9197f4f7bee43c091b@",
      file: "109.gif",
      code: "/::'(",
      title: "哭",
      reg: /@::tt;;@6ccf78fca7ae7e9197f4f7bee43c091b@/g,
      id: "6ccf78fca7ae7e9197f4f7bee43c091b"
    },
    {
      sign: "@::tt;;@7ade152d7fbb765fcc4892049a1e8968@",
      file: "110.gif",
      code: "/::-|",
      title: "囧",
      reg: /@::tt;;@7ade152d7fbb765fcc4892049a1e8968@/g,
      id: "7ade152d7fbb765fcc4892049a1e8968"
    },
    {
      sign: "@::tt;;@c557456dd4f7edbbe7f008525576b115@",
      file: "111.gif",
      code: "/::@",
      title: "怒",
      reg: /@::tt;;@c557456dd4f7edbbe7f008525576b115@/g,
      id: "c557456dd4f7edbbe7f008525576b115"
    },
    {
      sign: "@::tt;;@823b425ba05d9e2a5622dabef7c06f1a@",
      file: "112.gif",
      code: "/::P",
      title: "调皮",
      reg: /@::tt;;@823b425ba05d9e2a5622dabef7c06f1a@/g,
      id: "823b425ba05d9e2a5622dabef7c06f1a"
    },
    {
      sign: "@::tt;;@1cb4c147d8565bf1c1c59773c99f3fb7@",
      file: "113.gif",
      code: "/::D",
      title: "笑",
      reg: /@::tt;;@1cb4c147d8565bf1c1c59773c99f3fb7@/g,
      id: "1cb4c147d8565bf1c1c59773c99f3fb7"
    },
    {
      sign: "@::tt;;@40f2b9435c51445a7cb997d39f6595b1@",
      file: "114.gif",
      code: "/::O",
      title: "惊讶",
      reg: /@::tt;;@40f2b9435c51445a7cb997d39f6595b1@/g,
      id: "40f2b9435c51445a7cb997d39f6595b1"
    },
    {
      sign: "@::tt;;@cd3b0753e4e83687ee6756388e2375b3@",
      file: "115.gif",
      code: "/::(",
      title: "难过",
      reg: /@::tt;;@cd3b0753e4e83687ee6756388e2375b3@/g,
      id: "cd3b0753e4e83687ee6756388e2375b3"
    },
    {
      sign: "@::tt;;@a8f656fec90f7e095008469adc36d435@",
      file: "116.gif",
      code: "/::+",
      title: "酷",
      reg: /@::tt;;@a8f656fec90f7e095008469adc36d435@/g,
      id: "a8f656fec90f7e095008469adc36d435"
    },
    {
      sign: "@::tt;;@a6b13b7ab7e75ce00952405ac3719079@",
      file: "117.gif",
      code: "/:--b",
      title: "汗",
      reg: /@::tt;;@a6b13b7ab7e75ce00952405ac3719079@/g,
      id: "a6b13b7ab7e75ce00952405ac3719079"
    },
    {
      sign: "@::tt;;@aa456f549ef37198dd834794df369fb5@",
      file: "118.gif",
      code: "/::Q",
      title: "抓狂",
      reg: /@::tt;;@aa456f549ef37198dd834794df369fb5@/g,
      id: "aa456f549ef37198dd834794df369fb5"
    },
    {
      sign: "@::tt;;@aad1c8aed57088087adc91083e2d959e@",
      file: "119.gif",
      code: "/::T",
      title: "吐",
      reg: /@::tt;;@aad1c8aed57088087adc91083e2d959e@/g,
      id: "aad1c8aed57088087adc91083e2d959e"
    },
    {
      sign: "@::tt;;@af20e3336e30e97680d55e7d6970e73a@",
      file: "120.gif",
      code: "/:,@P",
      title: "笑",
      reg: /@::tt;;@af20e3336e30e97680d55e7d6970e73a@/g,
      id: "af20e3336e30e97680d55e7d6970e73a"
    },
    {
      sign: "@::tt;;@5a2b231cd427b824b81c8fe21b7611a7@",
      file: "121.gif",
      code: "/:,@-D",
      title: "快乐",
      reg: /@::tt;;@5a2b231cd427b824b81c8fe21b7611a7@/g,
      id: "5a2b231cd427b824b81c8fe21b7611a7"
    },
    {
      sign: "@::tt;;@134c72ddb7863f00d779dec5f91c2328@",
      file: "122.gif",
      code: "/::d",
      title: "奇",
      reg: /@::tt;;@134c72ddb7863f00d779dec5f91c2328@/g,
      id: "134c72ddb7863f00d779dec5f91c2328"
    },
    {
      sign: "@::tt;;@bb88dbaa22df021e3c2fe60a278e77f7@",
      file: "123.gif",
      code: "/:,@o",
      title: "傲",
      reg: /@::tt;;@bb88dbaa22df021e3c2fe60a278e77f7@/g,
      id: "bb88dbaa22df021e3c2fe60a278e77f7"
    },
    {
      sign: "@::tt;;@bcef0a306a9e8e261a968a6df3184dbf@",
      file: "124.gif",
      code: "/::g",
      title: "饿",
      reg: /@::tt;;@bcef0a306a9e8e261a968a6df3184dbf@/g,
      id: "bcef0a306a9e8e261a968a6df3184dbf"
    },
    {
      sign: "@::tt;;@a969ccfcc3a3d38df58239ad03264580@",
      file: "125.gif",
      code: "/:|-)",
      title: "累",
      reg: /@::tt;;@a969ccfcc3a3d38df58239ad03264580@/g,
      id: "a969ccfcc3a3d38df58239ad03264580"
    },
    {
      sign: "@::tt;;@fb621ae0139922d295053d202e91e0e2@",
      file: "126.gif",
      code: "/::!",
      title: "吓",
      reg: /@::tt;;@fb621ae0139922d295053d202e91e0e2@/g,
      id: "fb621ae0139922d295053d202e91e0e2"
    },
    {
      sign: "@::tt;;@1a6335f67cc1c053b985044087969a2b@",
      file: "127.gif",
      code: "/::L",
      title: "汗",
      reg: /@::tt;;@1a6335f67cc1c053b985044087969a2b@/g,
      id: "1a6335f67cc1c053b985044087969a2b"
    },
    {
      sign: "@::tt;;@4ff0999d86a4027d888f7ed0c9176bd9@",
      file: "128.gif",
      code: "/::>",
      title: "高兴",
      reg: /@::tt;;@4ff0999d86a4027d888f7ed0c9176bd9@/g,
      id: "4ff0999d86a4027d888f7ed0c9176bd9"
    },
    {
      sign: "@::tt;;@17c07d6a3cd57c6654c75728987b93dc@",
      file: "129.gif",
      code: "/::,@",
      title: "闲",
      reg: /@::tt;;@17c07d6a3cd57c6654c75728987b93dc@/g,
      id: "17c07d6a3cd57c6654c75728987b93dc"
    },
    {
      sign: "@::tt;;@b85b57d747a269bb09195ca14bba8d21@",
      file: "130.gif",
      code: "/:,@f",
      title: "努力",
      reg: /@::tt;;@b85b57d747a269bb09195ca14bba8d21@/g,
      id: "b85b57d747a269bb09195ca14bba8d21"
    },
    {
      sign: "@::tt;;@3df9ccfc7ec35fa45e4bdfb5b3babb4a@",
      file: "131.gif",
      code: "/::-S",
      title: "骂",
      reg: /@::tt;;@3df9ccfc7ec35fa45e4bdfb5b3babb4a@/g,
      id: "3df9ccfc7ec35fa45e4bdfb5b3babb4a"
    },
    {
      sign: "@::tt;;@0b5a0d2de31fe977a592a4260143e387@",
      file: "133.gif",
      code: "/:,@x",
      title: "秘密",
      reg: /@::tt;;@0b5a0d2de31fe977a592a4260143e387@/g,
      id: "0b5a0d2de31fe977a592a4260143e387"
    },
    {
      sign: "@::tt;;@462febe1d3f1e5875eacf0c26430bd3f@",
      file: "134.gif",
      code: "/:,@@",
      title: "乱",
      reg: /@::tt;;@462febe1d3f1e5875eacf0c26430bd3f@/g,
      id: "462febe1d3f1e5875eacf0c26430bd3f"
    },
    {
      sign: "@::tt;;@29df5d6d123a472a6232058850630d58@",
      file: "135.gif",
      code: "/::8",
      title: "疯",
      reg: /@::tt;;@29df5d6d123a472a6232058850630d58@/g,
      id: "29df5d6d123a472a6232058850630d58"
    },
    {
      sign: "@::tt;;@0bc574c5ce818a0ce53303e2a845e870@",
      file: "136.gif",
      code: "/:,@!",
      title: "哀",
      reg: /@::tt;;@0bc574c5ce818a0ce53303e2a845e870@/g,
      id: "0bc574c5ce818a0ce53303e2a845e870"
    },
    {
      sign: "@::tt;;@29d7abf636d7b27d2b1e9860c676f837@",
      file: "137.gif",
      code: "/:!!!",
      title: "鬼",
      reg: /@::tt;;@29d7abf636d7b27d2b1e9860c676f837@/g,
      id: "29d7abf636d7b27d2b1e9860c676f837"
    },
    {
      sign: "@::tt;;@48fd3166cf469c4d4ef373b440528970@",
      file: "138.gif",
      code: "/:xx",
      title: "打击",
      reg: /@::tt;;@48fd3166cf469c4d4ef373b440528970@/g,
      id: "48fd3166cf469c4d4ef373b440528970"
    },
    {
      sign: "@::tt;;@355b1fc77e01efe9df1aa7ef79fa795e@",
      file: "139.gif",
      code: "/:bye",
      title: "bye",
      reg: /@::tt;;@355b1fc77e01efe9df1aa7ef79fa795e@/g,
      id: "355b1fc77e01efe9df1aa7ef79fa795e"
    },
    {
      sign: "@::tt;;@f48a8e03a205440524e8771d2af651fc@",
      file: "142.gif",
      code: "/:handclap",
      title: "鼓掌",
      reg: /@::tt;;@f48a8e03a205440524e8771d2af651fc@/g,
      id: "f48a8e03a205440524e8771d2af651fc"
    },
    {
      sign: "@::tt;;@2f79734263557bf9ef9e5735b6e55d9e@",
      file: "145.gif",
      code: "/:<@",
      title: "什么",
      reg: /@::tt;;@2f79734263557bf9ef9e5735b6e55d9e@/g,
      id: "2f79734263557bf9ef9e5735b6e55d9e"
    },
    {
      sign: "@::tt;;@ba9de0195f8c074887fd42ff40ed7fc4@",
      file: "147.gif",
      code: "/::-O",
      title: "累",
      reg: /@::tt;;@ba9de0195f8c074887fd42ff40ed7fc4@/g,
      id: "ba9de0195f8c074887fd42ff40ed7fc4"
    },
    {
      sign: "@::tt;;@eaf33fcf7ca79fd880dc452935e56b5d@",
      file: "153.gif",
      code: "/:@x",
      title: "吓",
      reg: /@::tt;;@eaf33fcf7ca79fd880dc452935e56b5d@/g,
      id: "eaf33fcf7ca79fd880dc452935e56b5d"
    },
    {
      sign: "@::tt;;@029d557f8df103f1e7c01756edd76925@",
      file: "155.gif",
      code: "/:pd",
      title: "刀",
      reg: /@::tt;;@029d557f8df103f1e7c01756edd76925@/g,
      id: "029d557f8df103f1e7c01756edd76925"
    },
    {
      sign: "@::tt;;@d951791a7736204ba05800effe1add00@",
      file: "156.gif",
      code: "/:<W>",
      title: "水果",
      reg: /@::tt;;@d951791a7736204ba05800effe1add00@/g,
      id: "d951791a7736204ba05800effe1add00"
    },
    {
      sign: "@::tt;;@0dce1f683af61ade7464712af3d327b3@",
      file: "157.gif",
      code: "/:beer",
      title: "酒",
      reg: /@::tt;;@0dce1f683af61ade7464712af3d327b3@/g,
      id: "0dce1f683af61ade7464712af3d327b3"
    },
    {
      sign: "@::tt;;@aef9805cdbaacdd52d57f02a9d868c2e@",
      file: "158.gif",
      code: "/:basketb",
      title: "篮球",
      reg: /@::tt;;@aef9805cdbaacdd52d57f02a9d868c2e@/g,
      id: "aef9805cdbaacdd52d57f02a9d868c2e"
    },
    {
      sign: "@::tt;;@47fe0e89215badee7b4669b0e5d3876e@",
      file: "159.gif",
      code: "/:oo",
      title: "乒乓",
      reg: /@::tt;;@47fe0e89215badee7b4669b0e5d3876e@/g,
      id: "47fe0e89215badee7b4669b0e5d3876e"
    },
    {
      sign: "@::tt;;@fff800a15c2cfbce7fea77afa302d331@",
      file: "195.gif",
      code: "/:circle",
      title: "跳舞",
      reg: /@::tt;;@fff800a15c2cfbce7fea77afa302d331@/g,
      id: "fff800a15c2cfbce7fea77afa302d331"
    },
    {
      sign: "@::tt;;@21fbc6afc1969b206ca5485de3aa1bd7@",
      file: "160.gif",
      code: "/:coffee",
      title: "咖啡",
      reg: /@::tt;;@21fbc6afc1969b206ca5485de3aa1bd7@/g,
      id: "21fbc6afc1969b206ca5485de3aa1bd7"
    }
  ],
  // 得知当前选择的是哪个对话
  selectId: 1,
  // 得知当前选择的是哪个好友
  selectFriendWxid: '1737401145'
}

const mutations = {
  setWindowWidth(state, value) {
    state.windowWidth = value;
  },
  setwindowHeight(state, value) {
    state.windowHeight = value;
  },
  // 从localStorage 中获取数据
  initData(state) {
    let data = localStorage.getItem('vue-chat');
    if (data) {
      state.chatlist = JSON.parse(data);
    }
  },
  // 获取搜索值
  search(state, value) {
    state.searchText = value
  },
  // 得知用户当前选择的是哪个对话。便于匹配对应的对话框
  selectSession(state, value) {
    state.selectId = value
  },
  // 得知用户当前选择的是哪个好友。
  selectFriend(state, value) {
    state.selectFriendWxid = value
  },
  // 发送信息
  sendMessage(state, msg) {
    let result = state.chatlist.find(session => session.id === state.selectId);
    let now = new Date();
    // 获取最后一条消息记录
    let lastMsg = result.messages[result.messages.length - 1];
    let interval = timeDifference(new Date(lastMsg.date), now);
    let showTime = false;
    if (interval > 3) {
      showTime = true;
    }
    result.messages.push({
      content: msg.content,
      date: now,
      self: true,
      showTime: showTime
    });
    if (result.info.name === '机器人') {
      setTimeout(() => {
        result.messages.push({
          content: msg.reply,
          date: now,
          self: false,
          showTime: showTime
        });
      }, 500)
    }
  },

  // 选择好友后，点击发送信息。判断在聊天列表中是否有该好友，有的话跳到该好友对话。没有的话
  // 添加该好友的对话 并置顶
  send(state) {
    let result = state.friendlist.find(friend => friend.id === state.selectFriendId)
    let msg = state.chatlist.find(msg => msg.info.remark === result.remark)
    if (!msg) {
      state.selectId = 1
      for (let i = 0; i < state.chatlist.length; i++) {
        state.chatlist[i].id++;
        state.chatlist[i].index++;
      }
      state.chatlist.unshift({
        id: 1,
        info: {
          name: result.remark,
          img: result.img
        },
        messages: [{
          content: '已经置顶聊天，可以给我发信息啦！',
          date: new Date()
        }],
        index: 1
      })
    } else {
      state.selectId = msg.index
      router.push({
        path: '/chat'
      })
    }
  }
}
const getters = {
  // 筛选出含有搜索值的聊天列表
  searchedChatlist(state) {
    let sessions = state.chatlist.filter(sessions => sessions.info.remark.includes(state.searchText));
    return sessions
  },
  // 筛选出含有搜索值的好友列表
  searchedFriendlist(state) {
    let friends = state.friendlist.filter(friends => friends.remark.includes(state.searchText));
    return friends
  },
  // 通过当前选择是哪个对话匹配相应的对话
  selectedChat(state) {
    let session = state.chatlist.find(session => session.id === state.selectId);
    return session
  },
  // 通过当前选择是哪个好友匹配相应的好友
  selectedFriend(state) {
    let friend = state.friendlist.find(friend => friend.wxid === state.selectFriendWxid);
    return friend
  },
  selectedChatFriend(state) {
    let session = state.chatlist.find(session => session.id === state.selectId);
    let friend = state.friendlist.find(friend => friend.wxid === session.wxid);
    return friend
  },
  messages(state) {
    let session = state.chatlist.find(session => session.id === state.selectId);
    return session.messages
  }
}

const actions = {
  search: ({
    commit
  }, value) => {
    setTimeout(() => {
      commit('search', value)
    }, 100)
  },
  selectSession: ({
    commit
  }, value) => commit('selectSession', value),
  selectFriend: ({
    commit
  }, value) => commit('selectFriend', value),
  sendMessage: ({
    commit
  }, msg) => commit('sendMessage', msg),
  send: ({
    commit
  }) => commit('send'),
  initData: ({
    commit
  }) => commit('initData')
}
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

// 监听聊天列表的值， 发生变化就保存在localStorage中
store.watch(
  (state) => state.chatlist,
  (val) => {
    localStorage.setItem('vue-chat', JSON.stringify(val));
  }, {
    deep: true
  }
)
export default store;
