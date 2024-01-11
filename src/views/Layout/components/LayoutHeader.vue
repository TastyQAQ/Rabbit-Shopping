<script setup>
import { getCategoryList } from '@/apis/layout'
import { onMounted, ref } from 'vue';
import { useWindowScroll } from '@vueuse/core'
const { y } = useWindowScroll()
const categoryList = ref([])
const getCategory = async() => {
    const res = await getCategoryList()
    categoryList.value = res.result
}
onMounted(() => { getCategory() })
</script>

<template>
    <header class="app-header" :class="{ scroll: y > 78 }">
        <div class="container">
            <h1 class="logo">
                <router-link to="/" :class="{ small: y > 78 }">小兔鮮</router-link>
            </h1>
            <ul class="app-header-nav">
                <li>
                    <router-link to="/">首頁</router-link>
                </li>
                <li v-for="item in categoryList" :key="item.id">
                    <router-link to="/">{{item.name}}</router-link>
                </li>
            </ul>
            <div class="right" v-if=" y > 78">
              <RouterLink to="/">品牌</RouterLink>
              <RouterLink to="/">專題</RouterLink>
            </div>
            <div class="search" v-else>
              <i class="iconfont icon-search"></i>
              <input type="text" placeholder="搜一搜">
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
.app-header {
  background: #fff;
  width: 100%;
  height: 132px;
  z-index: 999;
  &.scroll {
    transition: all 0.3s linear;
    height: 80px;
    position: fixed;
    top: 0;
    left: 0;
  }

  .container {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .logo {
    width: 200px;
    height: 100%;
    a {
      display: block;
      width: 100%;
      height: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
      &.small {
        transition: all 0.3s linear;
        background: url('@/assets/images/logo.png') no-repeat right 2px / 160px auto;
      }
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
      margin-left: 5px;
    }
    input {
      padding-left: 5px;
      color: #666;
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
  .cart {
    width: 50px;

    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      .icon-cart {
        font-size: 22px;
      }

      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: $helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
</style>