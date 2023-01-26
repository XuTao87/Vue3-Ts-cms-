import HttpsRequsts from './request'
// 可以创建多个实例
// 如果你的项目有多个不同的地址可以导出不同的实力
// const p1 = new HttpsRequsts({
//   baseURL: '123'
// })
// const p2 = new HttpsRequsts({
//   baseURL: '456'
// })

export default new HttpsRequsts({
  // baseURL: process.env.VUE_APP_BASE_URL
  baseURL: 'http://152.136.185.210:5000'
  // interceptor: {
  //   requestSurres(config) {
  //     return config
  //   },
  //   requestErro(error) {
  //     return error
  //   },
  //   responseSurres(config) {
  //     return config.data
  //   },
  //   responseErro(error) {
  //     return error
  //   }
  // }
})
