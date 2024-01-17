import request from '@/utils/http'
// 獲取商品詳情(根據路由動態參數商品id)
export function getGoodsDetail(id) {
    return request.get('/goods', { params: { id } })
}
// 獲取熱榜商品
export function getHotGoodsList(params) {
    return request.get('/goods/hot', params)
}