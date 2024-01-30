import request from '@/utils/http'
// 獲取猜您喜歡商品列表
export function getLikeRelative({ limit = 4 }) {
    return request.get('/goods/relevant', { params: {limit} })
}
// 獲取用戶訂單訊息
export function getMyOrder(params) {
    return request.get('/member/order', {params})
}