export default [{
    path: '/login',
    name: 'login',
    component: require('@/page/login/login.vue')
  },
  {
    path: "/",
    component: require('@/page/wechat/wechat.vue'),
    redirect: '/chat',
    children: [{
        path: '/chat',
        component: require('@/page/chat/chat.vue')
      },
      {
        path: '/friend',
        component: require('@/page/friend/friend.vue')
      },
      {
        path: '/game',
        component: require('@/page/game/game.vue')
      }
    ]
  },
]
