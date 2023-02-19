import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import login from '@/views/login.vue'
import notFoundPage from '@/views/notFoundPage.vue'
import homepage from '@/views/homepage.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/main',
  //   name: 'main',
  //   component: () => import( '@/components/not-in-use/main.vue'),
  // },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/home',
    name: 'homepage',
    component: homepage,
    meta: {
      title: 'Tictask',
    },
  },
  {
    path: '/',
    name: 'sidebar',
    component: () => import( '@/views/sidebar.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import( '@/views/dashboard.vue'),
        meta: {
          title: 'Dashboard',
        },
      },
      {
        path: 'tasks',
        name: 'todo',
        component: () => import( '@/views/todo.vue'),
        meta: {
          title: 'Task',
        },
      },
      // {
      //   path: 'landingpage',
      //   name: 'landingpage',
      //   component: () => import( '@/views/landingpage.vue'),
      // },
      {
        path: 'profile/:name?',
        name: 'profile',
        component: () => import( '@/views/profile.vue'),
        meta: {
          title: 'Profile',
        },
      },
      {
        path: 'taskcreated',
        name: 'todos',
        component: () => import( '@/views/todos.vue'),
        meta: {
          title: 'Task',
        },
      },
    ],
  },
  {
    path: "/404",
    name: "notFound",
    component: notFoundPage,
    meta: {
      title: '404',
    },
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
  document.title = `${to.meta.title}`;
  // next();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    }else{
      next("/home")
    }
  } else {
    next();
  }
})

export default router
