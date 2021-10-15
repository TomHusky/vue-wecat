import store from '@/store/index.js'
import {
  sendNotifi
} from "@/libs/notification.js";
/**
 * 发送好友消息
 */
export function chatMsg(body) {
  const dataJson = body;
  store.dispatch("chat/receiveMessage", dataJson.data);
  let friend = store.getters["friend/selectedFriendByUsername"](
    dataJson.data.username
  );
  let msg = {
    avatar: friend.avatar,
    nickname: friend.nickname,
    remark: friend.remark == null ? friend.nickname : friend.remark,
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