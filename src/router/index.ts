import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import loginPage from '@/components/login.vue'
import main from '@/views/main.vue'
import area from '@/components/area.vue'
import card from '@/components/card.vue'
import mainbody from '@/components/mainbody.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: main,
    children: [
      {
        path: '/',
        name: 'mainbody',
        component: mainbody
      }
    ]
  },
  {
    path: '/login/:id',
    name: 'login',
    component: loginPage,
    children: [
      {
        path: '/login/area',
        name: 'area',
        component: area
      },
      {
        path: '/login/card',
        name: 'card',
        component: card
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/AboutView.vue')
  },
  // {
  //   path: '/area',
  //   name: 'area',
  //   component: () => import('../components/area.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
