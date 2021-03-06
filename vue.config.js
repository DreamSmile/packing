const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    productionSourceMap: false,
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
        // 移除 preload 插件
        config.plugins.delete('preload');
    },
    configureWebpack: (config) => {
        config.plugins.forEach((val) => {
            if (val instanceof HtmlWebpackPlugin) {
                val.options.title = '停车场优惠券';
            }
        })
    },
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            '/shareApi': {
                target: 'http://tm.lilanz.com/oa/api/BrandNewsCore.ashx',
                changeOrigin: true,
                pathRewrite: {
                    '^/shareApi': ''
                }
            }
        }
    }
}