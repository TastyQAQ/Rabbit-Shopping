<script setup>
// 導入pinia倉庫
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutSticky from './components/LayoutSticky.vue'

const categoryStore = useCategoryStore()
// 頁面創建後, 獲取分類列表
onMounted(() => {categoryStore.getCategory()})
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