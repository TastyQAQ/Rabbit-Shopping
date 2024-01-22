import { defineStore } from "pinia"
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const cartList = ref([])
    const addCart = (goods) => {
        // 根據商品的skuId查看傳入的商品是否已存在購物車內
        const item = cartList.value.find(item => {
            return item.skuId === goods.skuId
        })
        // 若商品已在購物車內, 則商品數量加1
        if(item) {
            item.count += goods.count
            // 若商品不在購物車內, 則將商品添加至購物車
        } else {
            cartList.value.push(goods)
        }
    }
    const allCount = computed(() => {
        return cartList.value.reduce((prev, current) => { return prev + current.count }, 0)
    })
    const allPrice = computed(() => {
        return cartList.value.reduce((prev, current) => { return prev + (current.price * current.count) }, 0)
    })
    const delCart = (id) => {
        cartList.value = cartList.value.filter(item => {
            return item.skuId !== id
        })
    }
    return {
        cartList,
        addCart,
        allCount,
        allPrice,
        delCart
    }
}, {
  persist: true
})