import { createI18n } from 'vue-i18n'
import ZH from './zh'
import EN from './en'
const messages = {
  zh: { ...ZH },
  en: { ...EN }
}
const obj = {
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem('lang') || 'zhCN', // 注意locale属性~~~~~~~~！
  messages
}
const i18n = createI18n(obj)
export default i18n
