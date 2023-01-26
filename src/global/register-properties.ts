import { App } from 'vue'
import { formatUtcString } from '@/utile/date-format'
export default function registerOrioerties(app: App) {
  app.config.globalProperties.$filters = {
    foo() {
      console.log('FOO')
    },
    formatTime(date: string) {
      return formatUtcString(date)
    }
  }
}
