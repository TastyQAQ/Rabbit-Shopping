import request from '@/utils/http'
// 加入商品至購物車
export function addCartList(data) {
    return request.post('/member/cart', data)
}
// 獲取購物車列表
export function getCartList() {
    return request.get('/member/cart')
}
// 刪除購物車商品
export function delCartList(data) {
    return request.delete('/member/cart', { data })
}
// 合併非登入及登入狀態下的購物車
export function mergeCartList(data) {
    return request.post('/member/cart/merge', data)
}
// 修改購物車商品數量
export function changeCartCount(id, data) {
    return request.put(`/member/cart/${id}`, data)
}