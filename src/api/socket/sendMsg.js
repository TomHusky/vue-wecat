import {
    sendMessage
} from '@/libs/websocket'
import {
    getTimestamp
} from '@/libs/tools'


/**
 * 发送好友消息
 */
export const sendMsgObj = (chatId, msg, msgType, contentType) => {
    if (msgType == 1) {
        sendFriendMsg(chatId, msg, contentType);
    } else if (msgType == 2) {
        sendGroupMsg(chatId, msg, contentType);
    }
}


/**
 * 发送好友消息
 */
export const sendFriendMsg = (chatId, msg, contentType) => {
    let time = getTimestamp();
    const params = {
        url: "/chat/send",
        body: {
            receiveId: chatId,
            msgContent: msg,
            msgType: 1,
            contentType: contentType,
            sendTime: time,
            msgId: chatId + time
        }
    }
    sendMessage(params);
}

/**
 * 发送群聊消息
 */
export const sendGroupMsg = (chatId, msg, contentType) => {
    let time = getTimestamp();
    const params = {
        url: "/chat/send",
        body: {
            receiveId: chatId,
            msgContent: msg,
            msgType: 2,
            contentType: contentType,
            sendTime: time,
            msgId: chatId + time
        }
    }
    sendMessage(params);
}