const {
  defineConfig
} = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  // 1. 配置方式一 ：CLI提供的属性
  outputDir: './dist3',
  transpileDependencies: true,
  // devServer: {
  //   proxy: {
  //     '^/api': {
  //       target: 'http://152.136.185.210:5000',
  //       pathRewrite: {
  //         '^/api': ''
  //       },
  //       changeOrigin: true
  //     }
  //   }
  // },
  // publicPath: './', // 如果要部署到服务器那就不要改这个
  // 2. 配置方式二：和webpack属性完全一致，最后进行合并
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       components: '@/components'
  //     }
  //   }
  // }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // }

  // 配置方式三：
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components')
  }
})