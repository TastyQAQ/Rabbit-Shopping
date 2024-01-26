import request from '@/utils/http'
// 獲取訂單數據
export function getOrderData() {
    return request.get('/member/order/pre')
}
// 添加收貨地址
export function addAddress(data) {
    return request.post('/member/address', data)
}
// 刪除收貨地址
export function delAddress(id) {
    return request.delete(`/member/address/${id}`)
}
// 修改收貨地址
export function editAddress(id, data) {
    return request.put(`/member/address/${id}`, data)
}