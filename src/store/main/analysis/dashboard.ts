import { Module } from 'vuex'
import { IDashbordState } from './type'
import { IRootState } from '@/store/types'
import {
  getCategoryGoodsAddSale,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale,
  getAmount
} from '@/service/main/analysis/dashboard'
const dashboarModule: Module<IDashbordState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsFavor: [],
      categoryGoodsSale: [],
      addressGoodsSale: [],
      amount: []
    }
  },
  actions: {
    async getDashboarDataAction({ commit }) {
      const AddSale: any = await getCategoryGoodsAddSale()
      commit('changeCategoryGoodsAddSale', AddSale.data)
      const Count: any = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', Count.data)
      const Favor: any = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', Favor.data)
      const Sale: any = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', Sale.data)
      const Amount: any = await getAmount()
      commit('changeCategoryGoodsAmount', Amount.data)
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeCategoryGoodsAddSale(state, list) {
      state.addressGoodsSale = list
    },
    changeCategoryGoodsAmount(state, list) {
      state.amount = list
    }
  }
}
export default dashboarModule
