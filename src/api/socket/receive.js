import store from '@/store/index.js'
import {
  sendNotifi
} from "@/libs/notification.js";
/**
 * 接收消息
 */
export function chatMsg(body) {
  const dataJson = body;
  store.dispatch("chat/receiveMessage", dataJson.data);
  let info = {};
  if (dataJson.data.msgType == 1) {
    info = store.getters['friend/selectedFriendByUsername'](dataJson.data.sendId);
  } else {
    let groupChat = store.getters['groupchat/selectedGroupChatByNo'](dataJson.data.sendId);
    console.log(groupChat);
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
  sendNotifi(this, msg);
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