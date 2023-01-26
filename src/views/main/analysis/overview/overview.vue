<template>
  <div class="overview">
    <card title="关于">
      <div style="text-align: start">
        Vue3Admin 是基于 Vue3、Vuex、VueRouter、Vite、 ElementPlus
        、TypeScript、Echart5 等后台系统解决方案。
      </div>
    </card>
    <card title="技术栈">
      <div style="text-align: start">
        <li
          v-for="item in technologyStacks"
          :key="item.title"
          style="font-size: 16px; margin-bottom: 10px"
        >
          <span>{{ item.title }}：</span>
          <span>{{ item.desp }}</span>
        </li>
      </div>
    </card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import card from '@/base-ui/card/src/card.vue'
export default defineComponent({
  components: { card },
  name: 'overview',
  setup() {
    const technologyStacks = [
      {
        title: '开发工具',
        desp: 'Visual Studio Code'
      },

      {
        title: '编程语言',
        desp: 'TypeScript 4.x + JavaScript'
      },

      {
        title: '构建工具',
        desp: 'Vite 2.x / Webpack5.x'
      },

      {
        title: '前端框架',
        desp: 'Vue 3.x'
      },

      {
        title: '路由工具',
        desp: 'Vue Router 4.x'
      },

      {
        title: '状态管理',
        desp: 'Vuex 4.x'
      },

      {
        title: 'UI 框架',
        desp: 'Element Plus'
      },

      {
        title: '可视化',
        desp: 'Echart5.x'
      },

      {
        title: '富文本',
        desp: 'WangEditor'
      },

      {
        title: '工具库',
        desp: ' @vueuse/core + dayjs + countup.js'
      },

      {
        title: 'CSS 预编译',
        desp: 'Sass / Less'
      },

      {
        title: 'HTTP 工具',
        desp: 'Axios'
      },

      {
        title: 'Git Hook 工具',
        desp: 'husky'
      },

      {
        title: '代码规范',
        desp: 'EditorConfig + Prettier + ESLint'
      },

      {
        title: '提交规范',
        desp: 'Commitizen + Commitlint'
      }
    ]
    return {
      technologyStacks
    }
  }
})
</script>

<style scoped></style>
