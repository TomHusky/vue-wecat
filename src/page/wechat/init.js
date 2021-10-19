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

function initFriendList() {
    let state = store.state;
    listFriendInfo(state.user.info.username)
        .then((res) => {
            if (res.code == 0) {
                store.commit("friend/addFriendList", res.data);
            }
        }).catch(err => {
            console.log(err);
        })
}

function initGroupChatList() {
    listGroupChat()
        .then((res) => {
            if (res.code == 0) {
                store.commit("groupchat/addGroupChatList", res.data);
            }
        })
}