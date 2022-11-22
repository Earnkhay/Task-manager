import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import login from '@/views/login.vue'
// import main from '@/views/main.vue'
// import exlandingpage from '@/components/exlandingpage.vue'
// import landingpage from '@/views/landingpage.vue'
// import dashboard from '@/views/dashboard.vue'
// import example from '@/components/example.vue'
// import todo from '@/views/todo.vue'
import notFoundPage from '@/views/notFoundPage.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/main',
    name: 'main',
    component: () => import( '@/views/main.vue'),
    children: [
      {
        path: '/main',
        name: 'exlandingpage',
        component: () => import( '@/components/exlandingpage.vue'),
      }
    ]
  },
  {
    path: '/',
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
    path: '/landingpage',
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
    // children: [
    //   {
    //     path: '/todo/all',
    //     name: 'alltodos',
    //     component: () => import( '@/components/alltodos.vue'),
    //     meta: {
    //       requiresAuth: true,
    //     },
    //   },
    //   {
    //     path: '/todo/done',
    //     name: 'taskdone',
    //     component: () => import( '@/components/taskdone.vue'),
    //     meta: {
    //       requiresAuth: true,
    //     },
    //   }
    // ]
  },
  {
        path: '/todo/all',
        name: 'alltodos',
        component: () => import( '@/components/alltodos.vue'),
        meta: {
          requiresAuth: true,
        },
  },
  {
        path: '/todo/done',
        name: 'taskdone',
        component: () => import( '@/components/taskdone.vue'),
        meta: {
          requiresAuth: true,
        },
  },
  {
        path: '/todo/undone',
        name: 'undone',
        component: () => import( '@/components/undone.vue'),
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
    component: () => import( '@/components/example.vue')
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
