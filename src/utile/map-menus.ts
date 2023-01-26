import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null
export function mapMenusToRouter(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.先去加载所有得routes
  const allRoutes: RouteRecordRaw[] = []
  // 加载文件夹  第二个参数是要不要递归查找文件  第三个参数是匹配
  // 拿到所有得组件路径
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // 2. 简单来说就是 拿到上面所有组件得路径 然后根据后端返回得菜单去做匹配 就是过滤得意思 拿到需要注册得组件路径
  const _recurseGerRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGerRoute(menu.children)
      }
    }
  }
  _recurseGerRoute(userMenus)
  return routes
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: any[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: any[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const find = pathMapToMenu(menu.children, currentPath)
      if (find) {
        breadcrumbs?.push(menu)
        breadcrumbs?.push(find)
        return find
      }
    } else if (menu.url === currentPath && menu.type === 2) {
      return menu
    }
  }
}
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []
  const _reccurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _reccurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _reccurseGetPermission(userMenus)
  return permissions
}

export function getMenuLeafKeys(menList: any[]) {
  const leftKeys: number[] = []
  console.log(menList);

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menList)
  return leftKeys
}
export { firstMenu }
