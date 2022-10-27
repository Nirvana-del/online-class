import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Layout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect:'/dataAssess',
    children:[
      {
        path: '/dataAssess',
        name: 'DataAssess',
        component: () => import('@/views/DataAssess.vue'),
      },
      {
        path: '/courseList',
        name: 'CourseList',
        component: () => import('@/views/CourseList.vue'),
      },
      {
        path: '/chapterList',
        name: 'ChapterList',
        component: () => import('@/views/Chapter.vue'),
      },
      {
        path: '/teacher',
        name: 'Teacher',
        component: () => import('@/views/Teacher.vue'),
      },
      {
        path: '/class',
        name: 'Class',
        component: () => import('@/views/Class.vue'),
      },
      {
        path: '/user',
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

export default router
