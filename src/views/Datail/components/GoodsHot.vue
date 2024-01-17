<script setup>
import { getHotGoodsList } from '@/apis/detail'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
    type: {
        type: Number, // 1代表24小時熱銷榜 2代表周熱銷榜 3代表總熱銷榜 可以使用type去適配title和數據列表
        default: 1
    }
})
const titleMap = {
    1: '24小時熱榜',
    2: '周熱榜'
}
const title = computed(() => { return titleMap[props.type]})

const route = useRoute()
const HotGoods = ref({})
const getHotGoods = async() => {
    const { result } = await getHotGoodsList({
        id: route.params.id,
        type: props.type,
        limit: 3
    })
    HotGoods.value = result
}
getHotGoods()
</script>


<template>
  <div class="goods-hot">
    <h3> {{ title }} </h3>
    <!-- 商品区块 -->
    <RouterLink :to="`/detail/${item.id}`" class="goods-item" v-for="item in HotGoods" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">${{ item.price }}</p>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>