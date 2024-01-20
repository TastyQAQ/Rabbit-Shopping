import { loginApi } from '@/apis/login'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({})
    const getUserInfo = async(data) => {
        const res = await loginApi(data)
        userInfo.value = res.result
    }
    return {
        userInfo,
        getUserInfo
    }
}, {
    persist: true,
})