import request from '@/utils/http'
// 登入獲取用戶資料
export function getUserInfo(data) {
    return request.post('/login', data)
}