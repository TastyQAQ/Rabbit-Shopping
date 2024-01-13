<script setup>
import HomePanel from './HomePanel.vue'
import { getHotProduct } from '@/apis/home'
import { ref } from 'vue'

const hotProduct = ref([])
const getHot = async() => {
    const res = await getHotProduct()
    hotProduct.value = res.result
}
getHot()
</script>

<template>
    <HomePanel title="人氣推薦" subTitle="人氣爆款 不容錯過">
        <ul class="goods-list">
            <li v-for="item in hotProduct" :key="item.id">
                <router-link to="/">
                    <img :src="item.picture" alt="">
                    <div class="info">
                        <p>{{ item.title }}</p>
                        <p class="desc">{{ item.alt }}</p>
                    </div>
                </router-link>
            </li>
        </ul>
    </HomePanel>
</template>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 12px 12px 0 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>