import { ref } from 'vue'
import pageContent from '@/components/page-content'
export function usePageSearch(): any {
  const pageCountRef = ref<InstanceType<typeof pageContent>>()
  const handleQueryClick = (value: any) => {
    pageCountRef.value?.getPageData(value)
  }
  const handleReseClick = () => {
    pageCountRef.value?.getPageData()
  }
  return [pageCountRef, handleQueryClick, handleReseClick]
}
