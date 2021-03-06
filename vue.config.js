const TerserPlugin = require('terser-webpack-plugin');
const path = require('path')
const config = require('./src/config')


let BASE_URL = ''
switch (process.env.NODE_ENV) {
    case 'development':
        BASE_URL = config.publicPath.dev //这里是本地的请求url
        break
    case 'production':
        BASE_URL = config.publicPath.pro //生产环境url
        break
}

module.exports = {
    // 项目部署基础
    // 默认情况下，我们假设你的应用将被部署在域的根目录下,
    // 例如：https://www.my-app.com/
    // 默认：'/'
    // 如果您的应用程序部署在子路径中，则需要在这指定子路径
    // 例如：https://www.foobar.com/my-app/
    // 需要将它改为'/my-app/'
    publicPath: BASE_URL,
    devServer: {
        port: 8000, // 端口
    },
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    lintOnSave: false,
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    // 打包时不生成.map文件
    productionSourceMap: false,
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    // devServer: {
    //   proxy: 'localhost:3000'
    // }
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
    },
}