<template>
  <div class="content">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-table
      :data="userList"
      style="width: 100%"
      ref="tables"
      v-bind="childrenProps"
    >
      <el-table-column type="selection" width="55" v-if="showSelectColumen" />
      <el-table-column
        label="序号"
        type="index"
        min-width="30px"
        align="center"
        v-if="showIndexColum"
      ></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.prop" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          :page-sizes="[5, 10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: {
    dataCount: {
      type: Number,
      default: 0
    },
    showSelectColumen: {
      type: Boolean,
      default: false
    },
    showIndexColum: {
      type: Boolean,
      default: false
    },
    propList: {
      type: Array,
      default: () => []
    },
    userList: {
      type: Array,
      default: () => []
    },
    page: {
      type: Object,
      default: () => {
        return {
          currentPage: 0,
          pageSize: 5
        }
      }
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:page'],
  setup(props, { emit }) {
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    return {
      handleCurrentChange,
      handleSizeChange
    }
  }
})
</script>

<style scoped lang="less">
.content {
  padding: 40px;
  border-top: 20px solid #f0f2f5;
  .header {
    display: flex;
    padding-bottom: 20px;
    justify-content: space-between;
  }
  .footer {
    display: flex;
    flex-direction: row-reverse;
    padding-top: 20px;
  }
}
</style>
