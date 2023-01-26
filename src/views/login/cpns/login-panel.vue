<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <loginAccount ref="accpuntRef"></loginAccount>
      </el-tab-pane>
      <el-tab-pane name="iphone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <loginPhone />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="iskeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="loginButton" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { User, Iphone } from '@element-plus/icons-vue'
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'
export default defineComponent({
  components: { User, Iphone, loginAccount, loginPhone },
  setup() {
    const iskeepPassword = ref(true)
    const accpuntRef = ref<InstanceType<typeof loginAccount>>()
    const currentTab = ref<string>('account')
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accpuntRef.value?.loginAction(iskeepPassword.value)
      } else {
        console.log(1)
      }
    }
    return {
      iskeepPassword,
      handleLoginClick,
      accpuntRef,
      currentTab
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-top: -120px;
  .title {
    text-align: center;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
  }
  .loginButton {
    margin-top: 10px;
    width: 100%;
    height: 45px;
  }
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
