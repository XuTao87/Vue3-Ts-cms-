<template>
  <div class="page-model">
    <el-dialog
      v-model="centerDialogVisible"
      destroy-on-close
      title="Warning"
      width="30%"
      center
    >
      <HyForm v-bind="modalConfig" v-model="formData"></HyForm>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import HyForm from '@/base-ui/form'
import { useStore } from 'vuex'
export default defineComponent({
  components: { HyForm },
  props: {
    modalConfig: {
      type: Object,
      requise: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      requise: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const centerDialogVisible = ref(false)
    const formData = ref<any>({})
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig?.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      },
      { deep: true }
    )
    const store = useStore()
    const handleConfirmClick = () => {
      centerDialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新增
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return {
      formData,
      centerDialogVisible,
      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
