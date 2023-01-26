<template>
  <div class="goods">
    <pageContent :contentTableConfig="contentTableConfig" pageName="goods">
      <template #imgUrl="scope">
        <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          preview-teleported
          hide-on-click-modal
          fit="cover"
        />
      </template>
      <template #oldPrice="scope">
        {{ '￥' + scope.row.oldPrice }}
      </template>
      <template #newPrice="scope">
        {{ '￥' + scope.row.newPrice }}
      </template>
    </pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content/src/page-content.vue'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  components: { pageContent },
  name: 'goods',
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped lang="less">
.goods {
  position: relative;
  top: -40px;
}
</style>
