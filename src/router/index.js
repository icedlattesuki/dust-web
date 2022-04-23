import { createRouter, createWebHistory } from 'vue-router'
import MarketView from '../views/MarketView.vue'
import LoginView from '../views/LoginView.vue'
import UserProfileSettingView from '../views/UserProfileSettingView.vue'
import SteamSettingView from '../views/SteamSettingView'

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
    path: '/user/setting/profile',
    name: 'userProfileSetting',
    component: UserProfileSettingView
  },
  {
    path: '/user/setting/steam',
    name: 'steamSetting',
    component: SteamSettingView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
