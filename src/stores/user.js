import { loginApi } from '@/apis/login'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCartStore } from './cart'
import { mergeCartList } from '@/apis/cart'

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({})
    const cartStore = useCartStore()
    // 登入獲取用戶資料
    const getUserInfo = async(data) => {
        const res = await loginApi(data)
        userInfo.value = res.result
        // 合併購物車
        await mergeCartList(cartStore.cartList.map(item => {
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }
        }))
        cartStore.updateCartList()
    }
    // 登出清除用戶資料
    const clearUserInfo = () => {
        userInfo.value = {}
        // 清除購物車數據
        cartStore.clearCart()
    }
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
}, {
    persist: true,
})