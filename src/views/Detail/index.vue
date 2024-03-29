<script setup>
import GoodsHot from './components/GoodsHot.vue'
import GoodsImage from './components/GoodsImage.vue'
import GoodsSku from '@/components/XtxSku/index.vue'
import { getGoodsDetail } from '@/apis/detail'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const goodsDetail = ref({})
const getDetail = async() => {
    const { result } = await getGoodsDetail(route.params.id)
    goodsDetail.value = result
}
onMounted(() => { getDetail() })

// sku規格被操作時
const skuObj = ref({})
const skuChange = (sku) => {
  skuObj.value = sku
  // console.log(skuObj.value)
}

// 更改數量操作
const num = ref(1)
const numChange = (count) => {
  num.value = count
}

// 加入購物車
import { useCartStore } from '@/stores/cart'
import { ElMessage } from 'element-plus'
const cartStore = useCartStore()
const addCart = () => {
  if(skuObj.value.skuId) {
    cartStore.addCart({
      id: goodsDetail.value.id,
      name: goodsDetail.value.name,
      picture: goodsDetail.value.mainPictures[0],
      price: goodsDetail.value.price,
      count: num.value,
      skuId: skuObj.value.skuId,
      attrsText: skuObj.value.specsText,
      selected: true
    })
    ElMessage.success('添加成功')
  } else {
    ElMessage.warning('請選擇商品規格')
  }
  
}
</script>

<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="goodsDetail.categories">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/${goodsDetail.categories[1].id}` }">{{ goodsDetail.categories[1].name }}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/sub/${goodsDetail.categories[0].id}` }">{{ goodsDetail.categories[0].name }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ goodsDetail.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品訊息 -->
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
              <!--圖片預覽區 -->
              <GoodsImage :img="goodsDetail.mainPictures"></GoodsImage>
              <!-- 統計數量 -->
              <ul class="goods-sales">
                <li>
                  <p>銷量人氣</p>
                  <p> {{ goodsDetail.salesCount }} </p>
                  <p><i class="iconfont icon-task-filling"></i>銷量人氣</p>
                </li>
                <li>
                  <p>商品評價</p>
                  <p>{{ goodsDetail.commentCount }}</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看評價</p>
                </li>
                <li>
                  <p>收藏人氣</p>
                  <p>{{ goodsDetail.collectCount }}</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p>{{ goodsDetail.brand.name }}</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主頁</p>
                </li>
              </ul>
            </div>
            <div class="spec">
              <!-- 商品訊息區 -->
              <p class="g-name"> {{ goodsDetail.name }} </p>
              <p class="g-desc">{{ goodsDetail.desc }} </p>
              <p class="g-price">
                <span> {{ goodsDetail.price }}<small> 起</small></span>
                <span>{{ goodsDetail.oldPrice }}<small> 起</small></span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促銷</dt>
                  <dd>12月好物放送，App领券购买直降120元</dd>
                </dl>
                <dl>
                  <dt>服務</dt>
                  <dd>
                    <span>無憂退貨</span>
                    <span>快速退款</span>
                    <span>免運費</span>
                    <a href="javascript:;">了解詳情</a>
                  </dd>
                </dl>
              </div>
              <!-- sku组件 -->
              <GoodsSku :goods="goodsDetail" @change="skuChange"></GoodsSku>
              <!-- 數據组件 -->
              <el-input-number v-model="num" @change="numChange" />
              <!-- 按鈕组件 -->
              <div>
                <el-button size="large" class="btn" @click="addCart">
                  加入購物車
                </el-button>
              </div>

            </div>
          </div>
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品詳情 -->
              <div class="goods-tabs">
                <nav>
                  <a>商品詳情</a>
                </nav>
                <div class="goods-detail">
                  <!-- 屬性 -->
                  <ul class="attrs">
                    <li v-for="item in goodsDetail.details.properties" :key="item.value">
                      <span class="dt">{{ item.name }}</span>
                      <span class="dd">{{ item.value }}</span>
                    </li>
                  </ul>
                  <!-- 圖片 -->
                    <img v-for="item in goodsDetail.details.pictures" :key="item.value" :src="item" alt="">
                </div>
              </div>
            </div>
            <!-- 24熱榜+專題推薦 -->
            <div class="goods-aside">
              <GoodsHot :type="1"></GoodsHot>
              <GoodsHot :type="2"></GoodsHot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.xtx-goods-page {
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 22px;
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: "$";
        font-size: 14px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
      }

      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
      small {
        font-size: 13px;
      }
    }
  }

  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        color: #666;

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: "•";
              color: $xtxColor;
              margin-right: 2px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: "";
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $xtxColor;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      >span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}

.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  >img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;

}

.bread-container {
  padding: 25px 0;
}
</style>