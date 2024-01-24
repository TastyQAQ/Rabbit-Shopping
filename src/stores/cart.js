import { defineStore } from "pinia"
import { ref, computed } from 'vue'
import { useUserStore } from './user'
import { addCartList, getCartList, delCartList } from '@/apis/cart'
import { ElMessage } from "element-plus"

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const cartList = ref([])
    // 獲取登入後的購物車列表數據
    const updateCartList = async() => {
        const res = await getCartList()
        cartList.value = res.result
    }
    const addCart = async(goods) => {
        if(userStore.userInfo.token) {
            // 加入個人購物車(登入)
           await addCartList({skuId: goods.skuId, count: goods.count})
           // 獲取登入後的購物車數據
           updateCartList()
        } else {
            // 未登入的加入購物車操作
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
    const delCart = async(skuId) => {
        if(userStore.userInfo.token) {
            // 刪除個人購物車(登入)
            await delCartList({ids: [skuId]})
            ElMessage.success('已從購物車中移除')
            // 重新獲取並渲染購物車列表
            const res = await getCartList()
            cartList.value = res.result
        } else {
            // 未登入的刪除購物車操作
            cartList.value = cartList.value.filter(item => {
                return item.skuId !== skuId
            })
        }
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
    // 清除購物車數據(避免登出後購物車仍有數據)
    const clearCart = () => {
        cartList.value = []
    }
    // 選中的商品id
    const selectedCart = computed(() => {
        return cartList.value.filter(item => { return item.selected === allCheck.value }).map(item => { return item.skuId })
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
        checkedAllPrice,
        updateCartList,
        clearCart,
        selectedCart
    }
}, {
  persist: true
})