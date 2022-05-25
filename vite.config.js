import {
    defineConfig
} from 'vite'
import path from 'path'
import fs from 'fs'
import vue from '@vitejs/plugin-vue'
import {
    injectHtml,
    minifyHtml
} from 'vite-plugin-html'
import dotenv from 'dotenv'

try {
    const VITE_NODE_ENV = process.env.VITE_NODE_ENV;
    const envLocalSuffix = VITE_NODE_ENV === 'dev' ? '.local' : '';
} catch (e) {
    console.error('error999999999', e)
}

const resolve = (dir) => {
    return path.join(__dirname, './', dir)
}
const pluginList = [injectHtml({
        injectData: {
            htmlWebpackPlugin: {
                options: {
                    isVite: true
                }
            },
            title: '运营管理平台'
        }
    }),vue()

]
export default defineConfig({
    root: './',
    publicDir: 'public',
    base: './',
    mode: 'development',
    plugins: [
        ...pluginList
    ],
    resolve:{
        alias:{
            '@':resolve('src'),
        }
    },
    optimizeDeps: {
        include: ['videojs-contrib-hls','vue-video-player']
      },
    css:{
	    //* 预编译支持less
	     preprocessorOptions: {
		      scss: {
                // 支持内联 JavaScript
                javascriptEnabled: true,
                //添加scss全局变量
                additionalData:`@import "@/common/mixin.scss";`
		      },
	    },
	},
    define: {
        'process.env': process.env
    },
    server: {
        host: '0.0.0.0',
        open: true,
        port: 3100,
        proxy: {}
    }
})