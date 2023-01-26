import { IDataType } from '@/service/login/type'
import hyRequest from '../../index'

export function getPageListDate(url: string, queryInfo: any) {
  return hyRequest.post<any>({
    url: url,
    data: queryInfo,
    showLodings: false
  })
}

export function deletePageData(url: string) {
  return hyRequest.delete<IDataType>({
    url: url
  })
}

export function createPageDate(url: string, newData: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: newData
  })
}
export function editPageDate(url: string, editData: any) {
  return hyRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
