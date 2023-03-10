import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
import { IDashbordState } from './main/analysis/type'
export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  loginModule: ILoginState
  system: ISystemState
  dashboarModule: IDashbordState
}

export type IStoreType = IRootState & IRootWithModule
