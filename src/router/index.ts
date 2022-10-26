import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import login from '@/views/login.vue'
import main from '@/views/main.vue'
import area from '@/components/area.vue'
import mainbody from '@/components/mainbody.vue'
import landingpage from '@/views/landingpage.vue'
import dashboard from '@/views/dashboard.vue'
import example from '@/components/example.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
    ]
  },
  {
    path: '/dashboard/:id',
    name: 'dashboard',
    component: dashboard,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/landingpage/:id',
    name: 'landingpage',
    component: landingpage,
    meta: {
      requiresAuth: true,
    }
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

//to keep user logged in on reload
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
        (user) => {
          removeListener();
          resolve(user);
        },
      reject
    )
  })
}

//navigation guard
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    }else{
      alert("You do not have access!")
      next("/")
    }
  } else {
    next();
  }
})

export default router
