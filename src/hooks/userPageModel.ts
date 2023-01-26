import { ref } from 'vue'
import pageModel from '@/components/page-modal/index'

type CallbackFn = (item?:any) => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof pageModel>>()
  const defaultInfo = ref<any>({})
  const newBtnClick = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true
    }
    newCb && newCb()
  }
  const editBtnClick = (value: any) => {
    if (pageModalRef.value) {
      defaultInfo.value = { ...value }
      pageModalRef.value.centerDialogVisible = true
    }

    editCb && editCb(value)
  }
  return [pageModalRef, defaultInfo, newBtnClick, editBtnClick]
}
