import request from '@/utils/http'
// 提交訂單
export function submitOrder(data) {
    return request.post('/member/order', data)
}
// 獲取訂單數據
export function getOrderDetails(id) {
    return request.get(`/member/order/${id}`)
}
// 支付寶付款
export function handleAliPay (params) {
    return request.get('/pay/aliPay', params)
}