<script setup>
// 導入分類倉庫
import { useCategoryStore } from '@/stores/category'
const categoryStore = useCategoryStore()
// 導入購物車模塊
import HeaderCart from './HeaderCart.vue'
</script>

<template>
    <header class="app-header">
        <div class="container">
            <h1 class="logo">
                <router-link to="/">小兔鮮</router-link>
            </h1>
            <ul class="app-header-nav">
                <li>
                    <router-link to="/">首頁</router-link>
                </li>
                <!-- 由於在layout頁面已調用獲取categoryList方法, 因此可以直接使用categoryStore.categoryList獲取列表 -->
                <li v-for="item in categoryStore.categoryList" :key="item.id">
                    <router-link :to="`/category/${item.id}`" active-class="active">{{item.name}}</router-link>
                </li>
            </ul>
            <div class="search">
              <i class="iconfont icon-search"></i>
              <input type="text" placeholder="搜一搜">
            </div>
            <!-- 購物車 -->
            <HeaderCart></HeaderCart>
        </div>
    </header>
</template>

<style scoped lang="scss">
.app-header {
  background: #fff;
  width: 100%;

  .container {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .logo {
    width: 200px;
    a {
      display: block;
      width: 100%;
      height: 132px;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    }
  }
  .app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    li {
      margin-right: 40px;
      width: 38px;
      a {
        font-size: 16px;
        padding-bottom: 5px;
        &:hover {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;
        }
      }
      .active {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }
  }
  .search {
    border-bottom: 1px solid #e7e7e7;
    .icon-search {
      font-size: 18px;
      // margin-left: 5px;
    }
    input {
      padding-left: 5px;
      color: #666;
      width: 152px;
    }
  }
}
</style>