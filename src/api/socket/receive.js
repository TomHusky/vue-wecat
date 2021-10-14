import store from '@/store/index.js'
import { sendNotifi } from "@/libs/notification.js";
/**
 * 发送好友消息
 */
export function chatMsg(body){
    const dataJson = body;
    store.dispatch("chat/receiveMessage", dataJson.data);
    let friend = store.getters["friend/selectedFriendByUsername"](
      dataJson.data.username
    );
    let msg = {
      avatar: friend.avatar,
      nickname: friend.nickname,
      remark: friend.remark,
      msgContent: dataJson.data.msgContent,
    };
    sendNotifi(this, msg);
}

export function friendNewFriend(body){
    const dataJson = body;
    store.dispatch("friend/addNewFriend", dataJson.data);
    let msg = {
      avatar: dataJson.data.avatar,
      nickname: dataJson.data.nickname,
      msgContent: dataJson.data.info,
    };
    sendNotifi(this, msg);
}

export default{
    chatMsg
}