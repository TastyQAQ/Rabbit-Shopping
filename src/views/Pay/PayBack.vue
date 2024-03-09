<script setup>
import { getOrderDetails } from '@/apis/pay'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
const route = useRoute()
const orderInfo = ref({})
const orderDetails = async() => {
    const res = await getOrderDetails(route.params.id)
    orderInfo.value = res.result
    cartStore.updateCartList()
}
onMounted(() => { orderDetails() })
</script>


<template>
  <div class="xtx-pay-page">
    <div class="container">
      <!-- 支付结果 -->
      <div class="pay-result">
        <span class="iconfont icon-queren2 green"></span>
        <!-- <span class="iconfont icon-shanchu red"></span> -->
        <p class="tit">付款成功</p>
        <p class="tip">我們將盡快為您發貨，收貨期間請保持手機暢通</p>
        <p>付款方式：<span>支付宝</span></p>
        <p>付款金額：<span>${{orderInfo.payMoney?.toFixed(2)}}</span></p>
        <div class="btn">
          <el-button type="primary" style="margin-right:20px">查看訂單</el-button>
          <el-button @click="$router.replace('/')">進入首頁</el-button>
        </div>
        <p class="alert">
          <span class="iconfont icon-tip"></span>
          溫馨提示：小兔鲜儿不會以訂單異常、系統升級為由要求您點擊任何網址鏈接進行退款操作，保護個資、謹慎操作。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  margin-top: 20px;

  >.iconfont {
    font-size: 100px;
  }

  .green {
    color: #1dc779;
  }

  .red {
    color: $priceColor;
  }

  .tit {
    font-size: 24px;
  }

  .tip {
    color: #999;
  }

  p {
    line-height: 40px;
    font-size: 16px;
  }

  .btn {
    margin-top: 50px;
  }

  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
  }
}
</style>