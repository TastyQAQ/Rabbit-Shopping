import request from '@/utils/http'
// 獲取訂單數據
export function getOrderData() {
    return request.get('/member/order/pre')
}