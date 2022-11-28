const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  lintOnSave: false,
  configureWebpack: config => {
    config.plugins.forEach((val) => {
      if (val instanceof HtmlWebpackPlugin) {
        // console.log(val)
        // console.log(val.options.templateParameters.toString())
        val.options.title = '仪表板 - 野漫横江'
      }
    })
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    proxy: {//配置跨域
      '/api': {
        target: process.env.VUE_APP_BASE_URL,//这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true,//允许跨域
        pathRewrite: {
          '^/api': ''//请求的时候使用这个api就可以
        }
      }

    }
  },
  productionSourceMap:false

}
