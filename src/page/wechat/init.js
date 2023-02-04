import qs from 'qs'
import store from '@/store/index.js'
import {
    listFriendInfo
} from '@/api/friend.js'
import {
    listGroupChat
} from "@/api/groupchat";


export function initInfo() {
    initFriendList();
    initGroupChatList();
}

export function initFriendList() {
    listFriendInfo()
        .then((res) => {
            if (res.code == 0) {
                store.commit("friend/addFriendList", res.data);
            }
        }).catch(err => {
            console.log(err);
        })
}

export function initGroupChatList() {
    listGroupChat()
        .then((res) => {
            if (res.code == 0) {
                store.dispatch("groupchat/addGroupChatList", res.data);
            }
        })
}