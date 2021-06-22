/*
 * @Author: cui DengKe
 * @Date: 2021-04-15 20:33:01
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-21 10:53:44
 * @Description: file content
 * @FilePath: \vue-salary-management\vue.config.js
 */
// vue.config.ts

const url = 'http://localhost:3000' // 代理服务器地址

module.exports = {
  // 生产环境和开发环境都用 '/'
  publicPath: '/',
  // 构建项目生成的目录
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devDist',
  // 关闭编译时的语法编译警告
  lintOnSave: false,
  // 配置scss
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "./src/styles/main.scss";`
      },
    }
  },
  devServer: {
    proxy: {
      '/salary': {
        target: url,
        // ws: true, // 需要websocket 开启
        changeOrigin: true,
        pathRewrite: {
          '^/salary/': ''
        }
      }
    }
  }
}