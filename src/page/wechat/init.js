import qs from 'qs'
import store from '@/store/index.js'
import {
    listFriendInfo
} from '@/api/account.js'


export function initFriendList() {
    let state = store.state;
    // if (state.friend.friendlist == null || state.friend.friendlist.length <= 0) {
    listFriendInfo(state.user.info.username)
        .then((res) => {
            console.log(res);
            if (res.code == 0) {
                store.commit("friend/addFriend", res.data);
            }
        })
    // }
}