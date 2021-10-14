import {
    sendMessage
} from '@/libs/websocket'
import {
    getTimestamp
} from '@/libs/tools'

/**
 * 发送好友消息
 */
export const sendFriendMsg = (username, msg) => {
    let time = getTimestamp();
    const params = {
        url: "/chat/send",
        body: {
            receiveId: username,
            msgContent: msg,
            msgType: 1,
            sendTime: time,
            msgId: username + time
        }
    }
    sendMessage(params);
}