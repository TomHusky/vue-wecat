import qs from 'qs'
import store from '@/store/index.js'
import {
    listFriendInfo
} from '@/api/friend.js'


export function initFriendList() {
    let state = store.state;
    listFriendInfo(state.user.info.username)
        .then((res) => {
            if (res.code == 0) {
                store.commit("friend/addFriend", res.data);
            }
        }).catch(err => {
            console.log(err);
        })
}