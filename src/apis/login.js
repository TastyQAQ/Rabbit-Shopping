import request from '@/utils/http'
// 登入獲取用戶資料
export function loginApi(data) {
    return request.post('/login', data)
}