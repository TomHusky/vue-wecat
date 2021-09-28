import {
    sendMessage
} from '@/libs/websocket'
import {
    getTimestamp
} from '@/libs/tools'

/**
 * 获取用户信息
 */
export const sendFriendMsg = (username, msg) => {
    let time = getTimestamp();
    const params = {
        url: "/msg/send",
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