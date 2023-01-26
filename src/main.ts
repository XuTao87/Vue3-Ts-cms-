import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from './i18n/index'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'normalize.css'
import './assets/css/index.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { setupStore } from './store'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { globalRegister } from './global/index'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

setupStore()

app
  .use(store)
  .use(router)
  .use(i18n)
  .use(ElementPlus, { locale: zhCn })
  .use(globalRegister)
  .mount('#app')
