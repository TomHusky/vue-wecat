import {
    sendMessage
} from '@/libs/websocket'
import {
    getTimestamp
} from '@/libs/tools'

/**
 * 发送好友消息
 */
export const sendFriendMsg = (chatId, msg,type) => {
    let time = getTimestamp();
    const params = {
        url: "/chat/send",
        body: {
            receiveId: chatId,
            msgContent: msg,
            msgType: type,
            sendTime: time,
            msgId: chatId + time
        }
    }
    sendMessage(params);
}