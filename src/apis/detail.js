import request from '@/utils/http'
// 獲取商品詳情(根據路由動態參數商品id)
export function getGoodsDetail(id) {
    return request.get('/goods', { params: { id } })
}