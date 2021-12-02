//打包去掉console等
const TerserPlugin = require('terser-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');

//生产环境的webPack配置
const proWebpackConfig = {
    plugins: [
        new PrerenderSPAPlugin({
            // 生成文件的路径，也可以与webpakc打包的一致。
            // 下面这句话非常重要！！！
            // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
            staticDir: path.join(__dirname, 'dist'),
            // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
            routes: ['/', '/home', ],
            // 这个很重要，如果没有配置这段，也不会进行预编译
            renderer: new Renderer({
                inject: {
                    foo: 'bar'
                },
                headless: false,
                // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
                renderAfterDocumentEvent: 'render-event'
            })
        }),

    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    }
                }
            })
        ]
    },
    module: {
        rules: [{
            test: /\.mjs$/,
            include: /node_modules/,
            type: "javascript/auto"
        }, ]
    }

}

//开发下的webPack配置
const devWebPackConfig = {
    module: {
        rules: [{
            test: /\.mjs$/,
            include: /node_modules/,
            type: "javascript/auto"
        }]
    }
}

//新增token配置
module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV == 'production') {
            return {
                ...proWebpackConfig
            };
        }
        return {
            ...devWebPackConfig
        }
    },
    devServer: {
        disableHostCheck: true,
        port: 8080,
        proxy: {
            "/api": {
                target: "https://nebula.handsmap.cn/appproxy/gateway/",
                ws: false,
                //将主机头的原点改为目标的url地址
                changeOrgin: true,
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    },
    lintOnSave: false
}