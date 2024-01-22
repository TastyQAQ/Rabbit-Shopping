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
    // 商品總數量
    const allCount = computed(() => {
        return cartList.value.reduce((prev, current) => { return prev + current.count }, 0)
    })
    // 商品總價
    const allPrice = computed(() => {
        return cartList.value.reduce((prev, current) => { return prev + (current.price * current.count) }, 0)
    })
    // 從購物車移除
    const delCart = (id) => {
        cartList.value = cartList.value.filter(item => {
            return item.skuId !== id
        })
    }
    // 商品單選功能
    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find(item => {
            return item.skuId === skuId
        })
        item.selected = selected
    }
    // 商品全選功能(根據單選框決定全選框是否勾選)
    const allCheck = computed(() => {
        return cartList.value.every((item) => { return item.selected })
    })
    // 商品全選功能(根據全選框決定每個單選框是否勾選)
    const isAll = (selected) => {
        cartList.value.forEach(item => { item.selected = selected })
    }
    // 已選取商品數量
    const checkedAllCount = computed(() => {
        return cartList.value.filter(item => { return item.selected }).reduce((prev, current) => { return prev + current.count }, 0)
    })
    // 已選取商品價格
    const checkedAllPrice = computed(() => {
        return cartList.value.filter(item => { return item.selected }).reduce((prev, current) => { return prev + (current.count * current.price) }, 0)
    })
    return {
        cartList,
        addCart,
        allCount,
        allPrice,
        delCart,
        singleCheck,
        allCheck,
        isAll,
        checkedAllCount,
        checkedAllPrice
    }
}, {
  persist: true
})