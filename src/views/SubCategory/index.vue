<script setup>
import GoodsItem from '@/components/GoodsItem.vue'
import { getSubCategoryList } from '@/apis/category';
import { getSubCategoryGoods } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
// 獲取二級分類
const subCategory = ref({})
const getSubCategory = async() => {
    const res = await getSubCategoryList(route.params.id)
    subCategory.value = res.result
}
onMounted(() => { getSubCategory() })

// 獲取商品數據
const goodsList = ref([])
const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'
})
const getGoodsList = async() => {
    const res = await getSubCategoryGoods(reqData.value)
    goodsList.value = res.result.items
}
onMounted(() => { getGoodsList() })

// 切換商品篩選導航
const tabChange = () => {
    // console.log('tab切換了', reqData.value.sortField);
    reqData.value.page = 1
    getGoodsList()
}

// elementPlus提供v-infinite-scroll指令(滾動到底部自動加載更多數據)
const disabled = ref(false)
const load = async() => {
    reqData.value.page++
    const res = await getSubCategoryGoods(reqData.value)
    goodsList.value = [...goodsList.value, ...res.result.items]
    if(res.result.items.length === 0) {
        disabled.value = true
    }
}
</script>

<template>
    <div class="container">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/${subCategory.parentId}` }">{{ subCategory.parentName }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ subCategory.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    <div class="sub-container">
        <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
            <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
            <el-tab-pane label="最高人氣" name="orderNum"></el-tab-pane>
            <el-tab-pane label="評論最多" name="evaluateNum"></el-tab-pane>
        </el-tabs>
        <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
            <GoodsItem v-for="goods in goodsList" :key="goods.id" :goods="goods"></GoodsItem>
        </div>
    </div>
    </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

//   .goods-item {
//     display: block;
//     width: 220px;
//     margin-right: 20px;
//     padding: 20px 30px;
//     text-align: center;

//     img {
//       width: 160px;
//       height: 160px;
//     }

//     p {
//       padding-top: 10px;
//     }

//     .name {
//       font-size: 16px;
//     }

//     .desc {
//       color: #999;
//       height: 29px;
//     }

//     .price {
//       color: $priceColor;
//       font-size: 20px;
//     }
//   }

//   .pagination-container {
//     margin-top: 20px;
//     display: flex;
//     justify-content: center;
//   }


}
</style>