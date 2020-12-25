import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Live',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/live'),
    meta: { title: '南瓜影院' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Live',
    component: () => import('../views/live')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    return {
      el: '#app',
      top: 0
    }
  },
  routes
})

router.resolve({
  name: 'Live',
  params: { pathMatch: ['not', 'found'] },
}).href

export default router
