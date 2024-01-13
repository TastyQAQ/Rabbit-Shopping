import request from '@/utils/http'
// 獲取輪播圖
export function getBannerImg() {
    return request.get('/home/banner')
}
// 獲取新鮮好物數據
export function getNewProduct() {
    return request.get('/home/new')
}
// 獲取人氣推薦
export function getHotProduct() {
    return request.get('/home/hot')
}