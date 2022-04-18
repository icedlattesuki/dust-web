import { createRouter, createWebHistory } from 'vue-router'
import MarketView from '../views/MarketView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import BindSteamView from '../views/BindSteamView.vue'

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
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/bind-steam',
    component: BindSteamView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
