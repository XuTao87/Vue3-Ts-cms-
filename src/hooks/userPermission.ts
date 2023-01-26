import { useStore } from '@/store'
export function userPermission(pageName: any, hanldeName: string) {
  const store = useStore()
  const permission = store.state.loginModule.permission
  const verifyPermission = `system:${pageName}:${hanldeName}`

  return !!permission.find((item) => {
    return item === verifyPermission
  })
}
