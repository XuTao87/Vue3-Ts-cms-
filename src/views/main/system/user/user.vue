<template>
  <div class="user">
    <div class="search">
      <pageSearch
        :formConfig="formConfig"
        @resetBtnClick="handleReseClick"
        @queryBtnClick="handleQueryClick"
      ></pageSearch>
      <pageContent
        :contentTableConfig="contentTableConfig"
        pageName="users"
        ref="pageCountRef"
        @newBtnClick="newBtnClick"
        @editBtnClick="editBtnClick"
      >
        <template #enable="scope">
          <el-switch
            class="mb-2"
            active-text="禁用"
            inactive-text="启用"
            v-model="scope.row.enable"
          />
        </template>
      </pageContent>
    </div>
    
    <pageModel
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalCongiRef"
      pageName="users"
    ></pageModel>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import { formConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { usePageSearch } from '@/hooks/usePageSearch'
import { modalConfig } from './config/mode.config'
import { usePageModal } from '@/hooks/userPageModel'
import pageModel from '@/components/page-modal/index'
import { useStore } from 'vuex'
export default defineComponent({
  components: { pageSearch, pageContent, pageModel },
  name: 'users',
  setup() {
    const [pageCountRef, handleQueryClick, handleReseClick] = usePageSearch()
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      if (passwordItem) passwordItem.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      if (passwordItem) passwordItem.isHidden = true
    }
    const store = useStore()

    const modalCongiRef = computed(() => {
      const departmentTtem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentTtem!.options = store.state.entireDepartment.map(
        (item: any) => {
          return {
            title: item.name,
            value: item.id
          }
        }
      )
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item: any) => {
        return {
          title: item.name,
          value: item.id
        }
      })
      return modalConfig
    })

    const [pageModalRef, defaultInfo, newBtnClick, editBtnClick] = usePageModal(
      newCallback,
      editCallback
    )

    return {
      formConfig,
      contentTableConfig,
      handleReseClick,
      handleQueryClick,
      pageCountRef,
      modalConfig,
      newBtnClick,
      editBtnClick,
      pageModalRef,
      defaultInfo,
      modalCongiRef
    }
  }
})
</script>

<style scoped lang="less"></style>
