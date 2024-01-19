import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import AdminPage from '@/views/AdminPage.vue'
import UserPage from '@/views/UserPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import UserContent from '@/components/UserContent.vue'
import UserPlay from '@/components/UserPlay.vue'
import AdminContent from '@/components/AdminContent.vue'
import AdminAnswer from '@/components/AdminAnswer.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpPage,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage,
      children: [
        {
          path: '',
          name: 'admin-content',
          component: AdminContent,
        },
        {
          path: 'answer',
          name: 'admin-answer',
          component: AdminAnswer,
        }
      ]
    },
    {
      path: '/user/:id',
      name: 'user',
      component: UserPage,
      children: [
        {
          path: '',
          name: 'user-content',
          component: UserContent
        },
      ],
    },
    {
      path: '/play/:questionId',
      name: 'user-play',
      component: UserPlay
    }
  ]
})
export default router
