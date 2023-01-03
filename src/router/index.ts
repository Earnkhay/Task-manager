import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import login from '@/views/login.vue'
import notFoundPage from '@/views/notFoundPage.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/main',
    name: 'main',
    component: () => import( '@/components/not-in-use/main.vue'),
    // children: [
    //   {
    //     path: '/main',
    //     name: 'exlandingpage',
    //     component: () => import( '@/components/not-in-use/exlandingpage.vue'),
    //   }
    // ]
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import( '@/views/dashboard.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/',
    name: 'landingpage',
    component: () => import( '@/views/landingpage.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import( '@/views/todo.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/404",
    name: "notFound",
    component: notFoundPage
  },
  {
    path: "/:catchAll(.*)",
    redirect: "404"
  },
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
      next("/login")
    }
  } else {
    next();
  }
})

export default router
