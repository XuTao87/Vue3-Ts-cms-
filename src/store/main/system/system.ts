import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './types'
import {
  getPageListDate,
  deletePageData,
  createPageDate,
  editPageDate
} from '@/service/main/system/system'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, paylod: any) {
      console.log(paylod)

      const pageName = paylod.pageUrl
      const pageUrl = `/${pageName}/list`
      // 发送网络请求
      const pageResult = await getPageListDate(pageUrl, paylod.queryInfo)
      const { list, totalCount } = pageResult.data

      // 首字母转大小写
      const chagePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      // 将数据保存在 vuex 里
      commit(`change${chagePageName}List`, list)
      commit(`change${chagePageName}Count`, totalCount)
    },
    async deletPageDataAction(context, payload: any) {
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await deletePageData(pageUrl).then((v) => {
        context.dispatch('getPageListAction', {
          pageUrl: pageName,
          queryInfo: {
            offset: 0,
            size: 5
          }
        })
      })
    },
    async createPageDataAction({ dispatch }, playload: any) {
      const { pageName, newData } = playload
      const pageUrl = `/${pageName}/`
      await createPageDate(pageUrl, newData)
      dispatch('getPageListAction', {
        pageUrl: pageName,
        queryInfo: {
          offset: 0,
          size: 5
        }
      })
    },
    async editPageDataAction({ dispatch }, playload: any) {
      const { pageName, editData, id } = playload
      const pageUrl = `/${pageName}/${id}`
      await editPageDate(pageUrl, editData)
      dispatch('getPageListAction', {
        pageUrl: pageName,
        queryInfo: {
          offset: 0,
          size: 5
        }
      })
    }
  }
}

export default systemModule
