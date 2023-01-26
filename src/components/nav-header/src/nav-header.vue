<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick"
      ><Fold v-if="isFold" />
      <Expand v-else />
    </el-icon>
    <div class="content">
      <navBreadcrumb :breadcrumbs="breadcrumbs"></navBreadcrumb>
      <div style="display: flex; align-items: center">
        <el-avatar
          size="40"
          src="https://xutao.cool/benchi.jpg"
          style="margin-right: 10px"
        />
        <el-dropdown>
          <span class="el-dropdown-link">
            您说的对
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="add">去往主页</el-dropdown-item>
              <el-dropdown-item divided @click="tc">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-icon style="margin-left: 10px; cursor: pointer" @click="qp"
          ><FullScreen
        /></el-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import navBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utile/map-menus'
import { useStore } from '@/store/index'
import localeCache from '@/utile/cache'
export default defineComponent({
  emits: ['folfChange'],
  components: { navBreadcrumb },
  setup(props, { emit }) {
    const isFold = ref(true)
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('folfChange', isFold.value)
    }
    // 面包屑数据
    let breadcrumbs: any = computed(() => {
      const userMenus = store.state.loginModule.userMenus
      const breadcrumbs = route.path
      return pathMapBreadcrumbs(userMenus, breadcrumbs)
    })
    const add = () => {
      window.open('https://xutao.cool/', '_blank')
    }
    const tc = () => {
      localeCache.clearCache()
      router.push('/login')
    }
    const qp = () => {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        document.documentElement.requestFullscreen()
      }
    }
    return {
      handleFoldClick,
      isFold,
      breadcrumbs,
      add,
      tc,
      qp
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  align-items: center;
  .fold-menu {
    font-size: 25px;
    cursor: pointer;
  }
  .content {
    flex: 1;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
