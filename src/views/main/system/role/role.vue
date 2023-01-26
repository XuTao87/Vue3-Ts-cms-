<template>
  <div class="role">
    <pageSearch :formConfig="formConfig"></pageSearch>
    <pageContent
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="newBtnClick"
      @editBtnClick="editBtnClick"
    >
    </pageContent>
    <pageModel
      :modalConfig="modalConfig"
      pageName="role"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <div class="valueTree">
        <el-tree
          ref="treeRef"
          :props="{ children: 'children', label: 'name' }"
          show-checkbox
          @check="handleCheckChange"
          node-key="id"
          :data="menus"
        />
      </div>
    </pageModel>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick } from 'vue'
import pageContent from '@/components/page-content/src/page-content.vue'
import { contentTableConfig } from './config/content.config'
import pageSearch from '@/components/page-search'
import { formConfig } from './config/search.config'
import pageModel from '@/components/page-modal/index'

import { modalConfig } from './config/mode.config'
import { usePageModal } from '@/hooks/userPageModel'

import { useStore } from '@/store/index'

import { getMenuLeafKeys } from '@/utile/map-menus'
import { ElTree } from 'element-plus'
export default defineComponent({
  components: { pageContent, pageSearch, pageModel },
  name: 'role',
  setup() {
    const store = useStore()
    const treeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      nextTick(() => {
        const leafKeys = getMenuLeafKeys(item.menuList)
        treeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, newBtnClick, editBtnClick] = usePageModal(
      undefined,
      editCallback
    )
    const menus = computed(() => store.state.entireMenu)
    const otherInfo = ref()
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      contentTableConfig,
      formConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      newBtnClick,
      editBtnClick,
      menus,
      handleCheckChange,
      otherInfo,
      treeRef
    }
  }
})
</script>

<style scoped>
.valueTree {
  margin-left: 90px;
}
</style>
