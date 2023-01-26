//vuex-shim.d.ts
import { Store } from 'vuex'
declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface ComponentCustomProperties {
    $store: Store
  }
}