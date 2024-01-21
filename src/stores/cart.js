import { defineStore } from "pinia"
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const cartList = ref([])
    const addCart = (goods) => {
        // 根據商品的skuId查看傳入的商品是否已存在購物車內
        const item = cartList.value.find(item => {
            goods.skuId === item.skuId
        })
        // 若商品已在購物車內, 則商品數量加1
        if(item) {
            item.count++
            // 若商品不在購物車內, 則將商品添加至購物車
        } else {
            cartList.value.push(goods)
        }
    }
    const allCount = 0
    const allPrice = 100
    return {
        cartList,
        addCart,
        allCount,
        allPrice
    }
}, {
  persist: true
})