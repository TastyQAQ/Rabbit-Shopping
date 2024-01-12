import request from '@/utils/http'

export function getBannerImg() {
    return request.get('/home/banner')
}