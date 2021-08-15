import { createRouter, createWebHistory } from 'vue-router'
import Auth from '@/views/Auth.vue'
const Dashboard = () => import('@/views/Dashboard.vue')

import { appAuth } from '@/firebase/config'

// auth guard
const requireAuth = (to, from, next) => {
  let user = appAuth.currentUser
  if(!user) {
      next({ name: 'Auth' })
  } else {
      next()
  }
}
const requireNoAuth = (to, from, next) => {
  let user = appAuth.currentUser
  if(user) {
      next({ name: 'Dashboard' })
  } else {
      next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
    beforeEnter: requireNoAuth
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
