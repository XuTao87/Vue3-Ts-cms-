import { createStore, useStore as useVuexStore, Store } from 'vuex'
import { IRootState, IStoreType } from './types'
import { loginModule } from './login/login'
import system from './main/system/system'
import { getPageListDate } from '@/service/main/system/system'
import dashboarModule from './main/analysis/dashboard'
export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export const store = createStore<IRootState>({
  state: () => {
    return {
      name: '',
      age: 0,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    changeEntireDeoartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      const menResult = await getPageListDate('/menu/list', {})
      const { list } = menResult.data
      const departmentResult = await getPageListDate('/department/list', {
        offset: 0,
        size: 1000
      })
      const departmentRole = await getPageListDate('/role/list', {
        offset: 0,
        size: 1000
      })
      const list1 = departmentResult.data.list
      const list2 = departmentRole.data.list

      commit('changeEntireDeoartment', list1)
      commit('changeEntireRole', list2)
      commit('changeEntireMenu', list)
    }
  },
  modules: {
    loginModule,
    system,
    dashboarModule
  }
})

export default store
