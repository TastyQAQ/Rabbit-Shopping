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