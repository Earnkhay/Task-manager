import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import login from '@/components/login.vue'
import main from '@/views/main.vue'
import area from '@/components/area.vue'
import card from '@/components/card.vue'
import mainbody from '@/components/mainbody.vue'
import landingpage from '@/components/landingpage.vue'
import dashboard from '@/components/dashboard.vue'
import example from '@/components/example.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/main',
    name: 'main',
    component: main,
    children: [
      {
        path: '/main',
        name: 'mainbody',
        component: mainbody
      }
    ]
  },
  {
    path: '/',
    name: 'login',
    component: login,
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
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard
  },
  {
    path: '/landingpage',
    name: 'landingpage',
    component: landingpage
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import( '../views/AboutView.vue')
  // },
  {
    path: '/example',
    name: 'example',
    component: example
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
