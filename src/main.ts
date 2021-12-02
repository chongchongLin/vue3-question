import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './route'
import '@/assets/iconfont/iconfont.js'

// import hls from 'videojs-contrib-hls'
// import VideoPlayer from 'vue-video-player/src';
import "video.js/dist/video-js.css"
import "vue-video-player/src/custom-theme.css"
const app = createApp(App)
// app.use(ElementPlus).use(router).use(hls).use(VideoPlayer)
app.use(ElementPlus).use(router)
app.mount('#app')