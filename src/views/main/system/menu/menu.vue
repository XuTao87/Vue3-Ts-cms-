<template>
  <div class="menu">
    <pageContent :contentTableConfig="contentTableConfig" pageName="menu">
      <!-- <template #operation>
        <div class="operation">
          <el-button size="mini" type="text"
            ><el-icon style="margin-right: 5px"><EditPen /></el-icon
            >编辑</el-button
          >
          <el-button size="mini" type="danger" link
            ><el-icon style="margin-right: 5px"><Delete /></el-icon
            >删除</el-button
          >
        </div>
      </template> -->
    </pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  components: { pageContent },
  name: 'menu',
  setup() {
    return { contentTableConfig }
  }
})
</script>

<style scoped></style>
