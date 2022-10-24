import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import CourseList from '../views/CourseList.vue';
import Layout from '@/layout/Layout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect:'/courseList',
    children:[
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
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
