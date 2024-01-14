<script setup>
import HomePanel from './HomePanel.vue'
import GoodsItem from '@/components/GoodsItem.vue'
import { getGoodsList } from '@/apis/home'
import { ref } from 'vue'

const goodsList = ref([])
const getGoods = async() => {
    const res = await getGoodsList()
    goodsList.value = res.result
}
getGoods()
</script>

<template>
    <div class="home-product">
        <HomePanel v-for="item in goodsList" :key="item.id" :title="item.name">
            <div class="box">
                <router-link to="/" class="cover">
                    <img v-img-lazy="item.picture" alt="">
                    <strong class="label">
                        <span>{{ item.name }}館</span>
                        <span>{{ item.saleInfo }}</span>
                    </strong>
                </router-link>
                <ul class="goods-list">
                    <li v-for="goods in item.goods" :key="goods.id">
                        <GoodsItem :goods="goods"></GoodsItem>
                    </li>
                </ul>
            </div>
        </HomePanel>
    </div>
</template>

<style lang="scss" scoped>
.home-product {
  background: #fff;
  margin-top: 20px;
  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: $xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }

  }
}
</style>