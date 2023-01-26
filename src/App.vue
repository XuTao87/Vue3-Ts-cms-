<template>
  <!-- <router-link to="/login">登录</router-link>
  <router-link to="/main">首页</router-link>
  <el-button> {{ $t('add') }} </el-button>
  <button @click="changeLang">点击切换</button> -->
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'App',
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const { locale }: any = useI18n()
    // const changeLang = () => {
    //   locale.value = localStorage.getItem('lang') === 'zh' ? 'en' : 'zh'
    //   localStorage.setItem('lang', locale.value)
    // }
    return {
      // changeLang
    }
  }
})
</script>

<style lang="less"></style>
