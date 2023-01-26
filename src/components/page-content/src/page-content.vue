<template>
  <div>
    <HyTable
      :userList="dataList"
      v-bind="contentTableConfig"
      :dataCount="userCount"
      v-model:page="pageInfo"
    >
      <template #header>
        <div v-if="isCreate">
          <el-button type="primary" @click="handleNewClick">新建用户</el-button>
        </div>
        <el-button icon="Refresh" size="small" circle />
      </template>
      <template #operation="scope">
        <div class="operation">
          <el-button
            size="mini"
            type="text"
            @click="handleEditClick(scope.row)"
            v-if="isUpdate"
            ><el-icon style="margin-right: 5px"><EditPen /></el-icon
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            link
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
            ><el-icon style="margin-right: 5px"><Delete /></el-icon
            >删除</el-button
          >
        </div>
      </template>
      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>

      <template
        v-for="item in otherPropslots"
        :key="item.prop"
        #[item.prop]="scope"
      >
        <slot :name="item.prop" :row="scope.row"></slot>
      </template>
    </HyTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import HyTable from '@/base-ui/tabel/src/tabel.vue'
import { userPermission } from '@/hooks/userPermission'
export default defineComponent({
  components: { HyTable },
  emits: ['newBtnClick', 'editBtnClick'],
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const isCreate = userPermission(props.pageName, 'create')
    const isUpdate = userPermission(props.pageName, 'update')
    const isDelete = userPermission(props.pageName, 'delete')
    const isQuery = userPermission(props.pageName, 'query')
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 5
    })
    watch(pageInfo, () => getPageData(), { deep: true })
    const getPageData = (value?: any) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageUrl: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...value
        }
      })
    }
    const handleDeleteClick = (row: any) => {
      store.dispatch('system/deletPageDataAction', {
        pageName: props.pageName,
        id: row.id
      })
    }
    getPageData()
    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    const userCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )

    // 获取其他的动态插槽名称
    const otherPropslots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.prop === 'operation') return false
        if (item.prop === 'header') return false
        if (item.prop === 'createAt') return false
        if (item.prop === 'updateAt') return false
        if (item.prop === 'handler') return false
        return true
      }
    )
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }
    return {
      dataList,
      getPageData,
      userCount,
      pageInfo,
      otherPropslots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped></style>
