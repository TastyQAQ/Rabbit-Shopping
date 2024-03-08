<script setup>
// 導入pinia倉庫
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutSticky from './components/LayoutSticky.vue'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'

const categoryStore = useCategoryStore()
const cartStore = useCartStore()
const userStore = useUserStore()
// 頁面創建後, 獲取分類列表以及購物車數據
onMounted(() => {
  categoryStore.getCategory()
  if(userStore.userInfo.token) {
    cartStore.updateCartList()
  }
})
</script>

<template>
  <LayoutNav></LayoutNav>
  <LayoutHeader></LayoutHeader>
  <LayoutSticky></LayoutSticky>
  <router-view></router-view>
  <LayoutFooter></LayoutFooter>
</template>

<style>

</style>