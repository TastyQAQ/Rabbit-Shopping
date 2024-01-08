import request from '@/utils/http'

export function getCategoryList() {
    return request.get('/home/category/head')
}