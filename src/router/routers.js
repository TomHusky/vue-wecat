export default [{
  path: '/login',
  name: 'login',
  component: () => import('@/page/login/login.vue')
},
{
  path: "/",
  component: () => import('@/page/wechat/wechat.vue'),
  redirect: '/chat',
  children: [{
    path: '/chat',
    component: () => import('@/page/chat/chat.vue')
  },
  {
    path: '/friend',
    component: () => import('@/page/friend/friend.vue')
  },
  {
    path: '/game',
    component: () => import('@/page/game/game.vue')
  }
  ]
},
]
