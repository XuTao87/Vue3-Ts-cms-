import { Module } from 'vuex'
import { ILoginState } from './types'
import { IRootState } from '../types'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import { IAccount } from '@/service/login/type'
import localeCache from '@/utile/cache'
import router from '@/router'
import { mapMenusToRouter, mapMenusToPermissions } from '../../utile/map-menus'
export const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permission: []
    }
  },
  mutations: {
    changeTokken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userIfo: any) {
      state.userInfo = userIfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      const routes = mapMenusToRouter(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      // router.push(routes[0].path)

      const permission = mapMenusToPermissions(userMenus)
      state.permission = permission
    }
  },
  actions: {
    async accountLoginAcction({ commit, dispatch }, payload: IAccount) {
      // 登录
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeTokken', token)
      localeCache.setCache('token', token)
      if (token) {
        dispatch('getInitialDataAction', null, { root: true })
      }

      const userInforResult = await requestUserInfoById(id)
      // 用户信息
      const userInfo = userInforResult.data
      commit('changeUserInfo', userInfo)
      localeCache.setCache('userInfo', userInfo)
      // 用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localeCache.setCache('userMenus', userMenus)

      // 跳到首页
      router.push('/main')
    },

    loadLocalLogin({ commit, dispatch }) {
      const token = localeCache.getCache('token')
      if (token) {
        commit('changeTokken', token)
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localeCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localeCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}
