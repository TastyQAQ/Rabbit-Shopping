<script setup>
import { getOrderDetails } from '@/apis/pay'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// 自訂倒計時函數
import { useCountdown } from '@/composables/useCountdown'
const { formatTime, start } = useCountdown()

const route = useRoute()
const payInfo = ref({})
// const formatTime = () => {
//     const min = parseInt(payInfo.value.payLatestTime / 60)
//     const sec = parseInt(payInfo.value.payLatestTime % 60)
// }

const getOrder = async() => {
   const res = await getOrderDetails(route.params.id)
   payInfo.value = res.result
   start(payInfo.value.countdown)
}
onMounted(() => {getOrder()})

// 支付地址
// const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
// const backURL = 'http://127.0.0.1:5173/paycallback'
// const backURL = 'http://localhost:5173//paycallback'
// const redirectUrl = encodeURIComponent(backURL)
// const payUrl = `${baseURL}pay/aliPay?orderId=${route.params.id}&redirect=${redirectUrl}`
// const aliPay = async() => {
//     await handleAliPay({orderId: route.params.id, redirect: redirectUrl})
// }
</script>


<template>
  <div class="xtx-pay-page">
    <div class="container">
      <!-- 付款訊息 -->
      <div class="pay-info">
        <span class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p>訂單提交成功！請盡快完成付款。</p>
          <p>付款還剩 <span>{{ formatTime }}</span>, 超時後將取消訂單</p>
        </div>
        <div class="amount">
          <span>應付總額：</span>
          <span>${{ payInfo.payMoney?.toFixed(2) }}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">選擇您要使用的付款方式</p>
        <div class="item">
          <p>付款平台(請點選支付宝)</p>
          <a class="btn wx" href="javascript:;"></a>
          <a class="btn alipay" href="javascript:;" @click="$router.replace(`/paycallback/${payInfo.id}`)" ></a>
          <!-- <a class="btn alipay" href="javascript:;" @click="aliPay"></a> -->
        </div>
        <div class="item">
          <p>付款方式</p>
          <a class="btn" href="javascript:;">招商銀行</a>
          <a class="btn" href="javascript:;">工商銀行</a>
          <a class="btn" href="javascript:;">建設銀行</a>
          <a class="btn" href="javascript:;">農業銀行</a>
          <a class="btn" href="javascript:;">交通銀行</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-pay-page {
  margin-top: 20px;
}

.pay-info {

  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;

  .icon {
    font-size: 80px;
    color: #1dc779;
  }

  .tip {
    padding-left: 10px;
    flex: 1;

    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }

      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }

  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }

      &:last-child {
        color: $priceColor;
        font-size: 20px;
      }
    }
  }
}

.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;

  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;

    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }

  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;

    &.active,
    &:hover {
      border-color: $xtxColor;
    }

    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png) no-repeat center / contain;
    }

    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg) no-repeat center / contain;
    }
  }
}
</style>