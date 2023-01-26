<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.dc60b56c.svg" alt="logo" />
      <span class="title" v-if="coolapse">Vue3+Ts</span>
    </div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :unique-opened="true"
      :collapse="!coolapse"
      @open="open"
      @close="close"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id">
            <template #title>
              <el-icon>
                <component :is="item.icon.substr(8)"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-if="item.children">
              <el-menu-item-group
                title=""
                v-for="(chils, index) in item.children"
                :key="index"
                @click="handleMenuItemClick(chils)"
              >
                <el-menu-item :index="chils.id">{{ chils.name }}</el-menu-item>
              </el-menu-item-group>
            </template>
          </el-sub-menu>
        </template>
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store/index'
import router from '@/router'
import { useRoute } from 'vue-router'
import { pathMapToMenu, pathMapBreadcrumbs } from '@/utile/map-menus'
import userEchat from '@/base-ui/echart/hooks/useEchart'
export default defineComponent({
  props: ['coolapse'],
  setup(props, { emit }) {
    const store = useStore()
    const route = useRoute()
    const defaultActive = ref()
    const userMenus = computed(() => store.state.loginModule.userMenus)
    const handleMenuItemClick = (item: any) => {
      router.push(item.url ?? '/not-found')
    }
    const open = () => {
      // const { serReize } = userEchat()
      // serReize()
    }
    const close = () => {
      // const { serReize } = userEchat()
      // serReize()
    }
    watch(
      () => route.path,
      () => {
        defaultActive.value = pathMapToMenu(store.state.loginModule.userMenus,route.path).id
      },
      {
        deep: true,
        immediate: true
      }
    )
    return {
      userMenus,
      handleMenuItemClick,
      defaultActive,
      open,
      close
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
</style>
