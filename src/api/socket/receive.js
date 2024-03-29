import store from '@/store/index.js'
import {
  sendNotifi
} from "@/libs/notification.js";
import {
  getImgToBase64
} from "@/libs/tools";
/**
 * 接收消息
 */
export function chatMsg(body) {
  const dataJson = body;
  console.log(dataJson);
  let info = {};
  if (dataJson.data.msgType == 1) {
    info = store.getters['friend/selectedFriendByUsername'](dataJson.data.sendId);
  } else {
    let groupChat = store.getters['groupchat/selectedGroupChatByNo'](dataJson.data.sendId);
    info.nickname = groupChat.groupName;
    info.avatar = groupChat.groupAvatar;
    info.remark = groupChat.remark;
    info.notDisturb = groupChat.notDisturb;
  }
  // 消息免打扰模式出现弹窗提醒
  if (info.notDisturb) {
    return;
  }
  let msg = {
    avatar: info.avatar,
    nickname: info.nickname,
    remark: info.remark == null ? info.nickname : info.remark,
    msgContent: dataJson.data.msgContent,
  };
  msg.msgContent = replaceFace(dataJson.data);
  if (dataJson.data.contentType == 2) {
    let msgContent = JSON.parse(dataJson.data.msgContent);
    getImgToBase64(msgContent.url, (base64Str, width, height) => {
      msgContent.src = base64Str;
      dataJson.data.msgContent = msgContent;
      store.dispatch("chat/receiveMessage", dataJson.data);
    });
  } else if (dataJson.data.contentType == 3) {
    let msgContent = JSON.parse(dataJson.data.msgContent);
    dataJson.data.msgContent = msgContent;
    store.dispatch("chat/receiveMessage", dataJson.data);
  } else {
    store.dispatch("chat/receiveMessage", dataJson.data);
  }
  sendNotifi(this, msg);
}


// 将内容中属于表情的部分替换成emoji图片标签
function replaceFace(msg) {
  if (msg === "") {
    return "";
  }
  if (msg.contentType == 2) {
    return "[图片]";
  }
  if (msg.contentType == 3) {
    return "[文件]";
  }
  let con = msg.msgContent;
  if (con.includes("@::tt;;@")) {
    let emojis = store.state.system.emojis;
    for (let i = 0; i < emojis.length; i++) {
      con = con.replace(
        emojis[i].reg, "["+emojis[i].title+"]"
      );
    }
    return con;
  }
  return con;
}


export function friendAddFriend(body) {
  const dataJson = body.data;
  store.dispatch("friend/addFriend", dataJson);
}


export function friendNewFriend(body) {
  const dataJson = body.data;
  store.dispatch("friend/addNewFriend", dataJson);
  if (dataJson.length == 1) {
    let msg = {
      avatar: dataJson[0].avatar,
      nickname: dataJson[0].nickname,
      remark: dataJson[0].remark == null ? dataJson[0].nickname : dataJson[0].remark,
      msgContent: dataJson[0].info,
    };
    sendNotifi(this, msg);
  }
}

export default {
  chatMsg,
  friendAddFriend,
  friendNewFriend,
}