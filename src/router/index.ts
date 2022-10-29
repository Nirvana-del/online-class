import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Layout.vue';
import store from '../store'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/userlogin'
  },
  {
    path: '/userlogin',
    name: 'login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/home',
    name: 'layout',
    component: Layout,
    redirect: '/home/dataAssess',
    children: [
      {
        path: '/home/dataAssess',
        name: 'DataAssess',
        component: () => import('@/views/DataAssess.vue'),
      },
      {
        path: '/home/courseList',
        name: 'CourseList',
        component: () => import('@/views/CourseList.vue'),
      },
      {
        path: '/home/chapterList',
        name: 'ChapterList',
        component: () => import('@/views/Chapter.vue'),
      },
      {
        path: '/home/teacher',
        name: 'Teacher',
        component: () => import('@/views/Teacher.vue'),
      },
      {
        path: '/home/class',
        name: 'Class',
        component: () => import('@/views/Class.vue'),
      },
      {
        path: '/home/user',
        name: 'User',
        component: () => import('@/views/User.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  console.log(store.state);

  if (store.state.userName !== '' && store.state.userName !== null) {
    console.log(111);
    
    if (to.path == '/userlogin') {
      next('/home')
    } else {
      next()
    }
  } else {
    let toPath = to.path
    // next('/login?redirect='+toPath)

    if (toPath.indexOf('/home') != -1) {
      next('/userlogin')

    } else {
      next()
    }
  }

})

export default router
