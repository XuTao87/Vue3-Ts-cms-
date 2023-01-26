import hyRequest from '../index'
import { IAccount, IloginResult, IDataType } from './type'
enum LoginAPI {
  Accountlogin = '/login',
  LofinUserInfo = '/users/',
  UserMenus = '/role/'
}
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<IloginResult>>({
    url: LoginAPI.Accountlogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return hyRequest.get<any>({
    url: LoginAPI.LofinUserInfo + id
  })
}

export function requestUserMenusByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
