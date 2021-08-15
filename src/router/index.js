import { createRouter, createWebHistory } from 'vue-router'
import Auth from '@/views/Auth.vue'
const Dashboard = () => import('@/views/Dashboard.vue')

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
