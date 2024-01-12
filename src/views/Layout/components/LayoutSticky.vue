<script setup>
// vueuse中獲取window滾動值方法
import { useWindowScroll } from '@vueuse/core'
import { useCategoryStore } from '@/stores/category'
const categoryStore = useCategoryStore()
const { y } = useWindowScroll()
</script>

<template>
    <header class="app-sticky-header" :class="{ show: y > 78 }">
        <div class="container">
            <router-link to="/" class="logo"></router-link>
            <ul class="app-header-nav">
                <li>
                    <router-link to="/">首頁</router-link>
                </li>
                <li v-for="item in categoryStore.categoryList" :key="item.id">
                    <router-link to="/">{{item.name}}</router-link>
                </li>
            </ul>
            <div class="right">
                <RouterLink to="/">品牌</RouterLink>
                <RouterLink to="/">專題</RouterLink>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.app-sticky-header {
    background: #fff;
    width: 100%;
    z-index: 999;
    height: 80px;
    position: fixed;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    opacity: 0;
    &.show {
        transform: none;
        opacity: 1;
        transition: all 0.3s linear;
    }
    .container {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .logo {
    width: 200px;
    height: 100%;
    background: url('@/assets/images/logo.png') no-repeat right 2px / 160px auto;
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

  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid $xtxColor;

    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;

      &:hover {
        color: $xtxColor;
      }
    }
  }
}
</style>