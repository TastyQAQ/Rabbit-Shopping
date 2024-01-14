import request from '@/utils/http'
// 獲取分類數據
export function getCategoryList(id) {
    return request.get('/category', { params: { id } })
}