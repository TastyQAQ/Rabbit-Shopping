<script setup>
import HomePanel from './HomePanel.vue'
import { getNewProduct } from '@/apis/home'
import { ref } from 'vue'

const NewProduct = ref([])
const getNew = async() => {
    const res = await getNewProduct()
    NewProduct.value = res.result
}
getNew()

</script>

<template>
    <!-- 標題組件(共用) -->
    <HomePanel title="新鮮好物" subTitle="新鮮出爐 品質靠譜">
        <!-- 具名插槽 -->
        <template #hot>
            <ul class="goods-list">
                <li v-for="item in NewProduct" :key="item.id">
                    <router-link to="`/detail/${item.id}`">
                        <img :src="item.picture" alt="">
                        <div class="info">
                            <p>{{ item.name }}</p>
                            <p class="price">$ {{ item.price }}</p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </template>
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
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>