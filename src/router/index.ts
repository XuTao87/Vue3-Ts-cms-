import { createRouter,createWebHistory   } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import localeCache from '@/utile/cache'
import { firstMenu } from '@/utile/map-menus'
const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/main' },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    name: 'main',
    path: '/main',
    component: () => import('@/views/main/main.vue'),
    children: []
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/not-found/not-found.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localeCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
