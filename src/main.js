import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css'
import 'element-plus/dist/index.css'
import './index.css'

const app = createApp(App)
app.use(router)
app.use(Antd)
app.use(ElementPlus)
app.mount('#app')
