import axios from 'axios'
// 創建axios實例
const http = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
})
// 請求攔截器
http.interceptors.request.use((config) => {
    return config
}), (error) => {
    return Promise.reject(error)
}
// 響應攔截器
http.interceptors.response.use((response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  }, (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default http
