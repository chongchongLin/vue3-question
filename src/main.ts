import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './route'
import '@/assets/iconfont/iconfont.js'
const app = createApp(App)
app.use(ElementPlus).use(router)
app.mount('#app')