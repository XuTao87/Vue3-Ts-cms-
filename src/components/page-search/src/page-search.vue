<template>
  <HyForm v-bind="formConfig" v-model="fromData" ref="HyForm">
    <template #footer>
      <div class="footer">
        <el-button type="primary" @click="handleQueryClick">
          <el-icon style="margin-right: 10px"><Search /></el-icon>
          查询
        </el-button>
        <el-button @click="resetForm"
          ><el-icon style="margin-right: 10px"><Refresh /></el-icon
          >重置</el-button
        >
      </div>
    </template>
  </HyForm>
</template>

<script lang="ts">
import HyForm from '@/base-ui/form'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: { HyForm },
  emits: ['resetBtnClick', 'queryBtnClick'],
  props: {
    formConfig: {
      type: Object,
      reuqired: true
    }
  },
  setup(props, { emit }) {
    const HyForm = ref()
    const formItems = props.formConfig?.formItems ?? []
    const formOriginData: any = {}
    const fromData: any = ref({ id: '' })
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const resetForm = () => {
      for (const key in formOriginData) {
        fromData.value[`${key}`] = formOriginData[key]
      }
      emit('resetBtnClick')
    }
    // 搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', fromData.value)
    }
    return {
      fromData,
      resetForm,
      HyForm,
      handleQueryClick
    }
  }
})
</script>

<style scoped lang="less">
.footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px 40px;
}
</style>
