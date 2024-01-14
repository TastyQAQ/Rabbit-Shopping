import request from '@/utils/http'
// 獲取輪播圖
export function getBannerImg(distributionSite) {
    return request.get('/home/banner', { params: { distributionSite } })
}
// 獲取新鮮好物數據
export function getNewProduct() {
    return request.get('/home/new')
}
// 獲取人氣推薦
export function getHotProduct() {
    return request.get('/home/hot')
}
// 獲取首頁商品數據
export function getGoodsList() {
    return request.get('/home/goods')
}