import request from '@/utils/http'
export function submitOrder(data) {
    return request.post('/member/order', data)
}
export function getOrderDetails(id) {
    return request.get(`/member/order/${id}`)
}