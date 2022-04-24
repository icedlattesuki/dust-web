import { createRouter, createWebHistory } from 'vue-router'
import MarketView from '../views/MarketView.vue'
import LoginView from '../views/LoginView.vue'
import UserProfileView from '../views/UserProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MarketView
  },
  {
    path: '/market',
    name: 'market',
    component: MarketView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: UserProfileView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
