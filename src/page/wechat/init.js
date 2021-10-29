import qs from 'qs'
import store from '@/store/index.js'
import {
    listFriendInfo
} from '@/api/friend.js'
import {
    listSystemIcon
} from '@/api/source.js'
import {
    listGroupChat
} from "@/api/groupchat";


export function initInfo() {
    initFriendList();
    initGroupChatList();
}

export function initSystemInfo() {
    initSystemIcon();
}

function initSystemIcon() {
    if (store.state.system.systemFileIcon != null) {
        return;
    }
    listSystemIcon().then((res) => {
        if (res.code == 0) {
            store.commit("system/setSystemFileIcon", res.data);
        }
    })
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