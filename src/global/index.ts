import { App } from 'vue'
import registerOrioerties from './register-properties'
export function globalRegister(app: App): void {
  app.use(registerOrioerties)
}
