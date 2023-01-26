import hyRequest from '../../index'
enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale',
  amount = '/goods/amount/list'
}
export function getCategoryGoodsCount() {
  return hyRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}
export function getCategoryGoodsSale() {
  return hyRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}
export function getCategoryGoodsFavor() {
  return hyRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}
export function getCategoryGoodsAddSale() {
  return hyRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}
export function getAmount() {
  return hyRequest.get({
    url: DashboardAPI.amount
  })
}
