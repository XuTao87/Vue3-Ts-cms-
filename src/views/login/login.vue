<template>
  <div class="login">
    <!-- {{ $t('see') }} -->
    <loginPanel></loginPanel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import loginPanel from './cpns/login-panel.vue'
export default defineComponent({
  components: { loginPanel },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img/bg.a2d1cf1a.svg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
