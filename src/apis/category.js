import request from '@/utils/http'
// 獲取分類數據
export function getCategoryList(id) {
    return request.get('/category', { params: { id } })
}
// 獲取二級分類數據
export function getSubCategoryList(id) {
    return request.get('/category/sub/filter', { params: { id } })
}
// 獲取二級分類商品數據
export function getSubCategoryGoods(data) {
    return request.post('/category/goods/temporary', data)
}