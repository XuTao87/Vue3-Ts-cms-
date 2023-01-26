<template>
  <div>
    <el-form :rules="rules" :model="account" ref="fromRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" type="password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import localCache from '@/utile/cache'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()

    const fromRef = ref<InstanceType<typeof ElForm>>()
    const account = reactive({
      name: ('kobe' || localCache.getCache('name')) ?? '',
      password: ('123456' || localCache.getCache('password')) ?? ''
    })
    const loginAction = (iskeepPassword: boolean) => {
      fromRef.value?.validate((valid) => {
        if (valid) {
          // 判断是否记住密码
          if (iskeepPassword) {
            // 本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          store.dispatch('loginModule/accountLoginAcction', { ...account })
        }
      })
    }
    // 规则
    return {
      account,
      rules,
      loginAction,
      fromRef
    }
  }
})
</script>

<style scoped></style>
