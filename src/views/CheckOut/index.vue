<script setup>
import { getOrderData, delAddress } from '@/apis/checkout'
import { submitOrder } from '@/apis/pay'
import { ref, onMounted } from 'vue'
import AddressDialog from './components/AddressDialog.vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const checkInfo = ref({}) // 訂單對象
const addressInfo = ref({}) // 地址對象
const getOrder = async() => {
  const res = await getOrderData()
  checkInfo.value = res.result
  // 選用默認地址
  addressInfo.value = checkInfo.value.userAddresses?.find(item => { return item.isDefault === 0 })
}
onMounted(() => {getOrder()})
// 控制切換地址彈層
const toggleFlag = ref(false)
const activeAddress = ref({}) // 選中的地址
// 切換地址
const switchAddress = (item) => {
  activeAddress.value = item
}
// 切換當前顯示的地址
const setAddress = () => {
  addressInfo.value = activeAddress.value
  toggleFlag.value = false
}
// 刪除地址並重新渲染數據
const deleteAddress = async() => {
  await delAddress(addressInfo.value.id)
  ElMessage.success('已從地址列表中移除')
  getOrder()
}

const showFlag = ref(false) // 添加及修改地址彈層組件控件
const title = ref('')
const editAddress = ref({})
const handleAddress = (mark, data) => {
  showFlag.value = true
  title.value = mark
  if (mark === 'edit') {
    editAddress.value = data
  } 
}

// 提交訂單
const submit = async() => {
  const res = await submitOrder({
    deliveryTimeType: 1, // 配送時間, 默認1
    payType: 1, // 付款方式, 默認1(在線支付)
    payChannel: 1, // 支付管道, 默認1(支付寶)
    buyerMessage: '', // 買家備註留言
    goods: checkInfo.value.goods.map(item => {return {skuId: item.skuId, count: item.count}}), // 商品skuId&count
    addressId: addressInfo.value.id // 地址id
  })
  router.push(`/pay/${res.result.id}`)
}
</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收貨地址 -->
        <h3 class="box-title">收貨地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!checkInfo.userAddresses">您需要先添加收貨地址才可提交訂單。</div>
              <div v-else class="show">
                <ul>
                  <li><span>收<i />貨<i />人：</span>{{ addressInfo?.receiver }}</li>
                  <li><span>聯繫方式：</span>{{ addressInfo?.contact }}</li>
                  <li><span>收貨地址：</span>{{ addressInfo?.fullLocation }} {{ addressInfo?.address }}</li>
                </ul>
                <el-button size="large" v-show="addressInfo" @click="handleAddress('edit', addressInfo)">修改地址</el-button>
                <el-popconfirm title="確定要刪除此地址嗎?" confirm-button-text="確定" cancel-button-text="取消" @confirm="deleteAddress">
                  <template #reference>
                    <el-button size="large" v-show="addressInfo">刪除地址</el-button>
                  </template>
                </el-popconfirm>
              </div>
            </div>
            <div class="action">
              <el-button size="large" @click="toggleFlag = true">選擇地址</el-button>
              <el-button size="large" @click="handleAddress('add')">添加地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品資訊 -->
        <h3 class="box-title">商品資訊</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品資訊</th>
                <th width="170">單價</th>
                <th width="170">數量</th>
                <th width="170">小計</th>
                <th width="170">實付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in checkInfo.goods" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="">
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>${{ i.price }}</td>
                <td>{{ i.count }}</td>
                <td>${{ i.totalPrice }}</td>
                <td>${{ i.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送時間 -->
        <h3 class="box-title">配送時間</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送貨時間：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送貨：周一至周五</a>
          <a class="my-btn" href="javascript:;">雙休日、假日送貨：周六至周日</a>
        </div>
        <!-- 付款方式 -->
        <h3 class="box-title">付款方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">線上付款</a>
          <a class="my-btn" href="javascript:;">貨到付款</a>
          <span style="color:#999">貨到付款需加收5元手續費</span>
        </div>
        <!-- 訂單明細 -->
        <h3 class="box-title">訂單明細</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件數：</dt>
              <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品總價：</dt>
              <dd>${{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>運<i></i>費：</dt>
              <dd>${{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>應付總額：</dt>
              <dd class="price">{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交訂單 -->
        <div class="submit">
          <el-button type="primary" size="large" @click="submit">提交訂單</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切換地址 -->
  <el-dialog title="切換收貨地址" width="30%" center v-model="toggleFlag">
    <div class="addressWrapper">
      <div class="text item" v-for="item in checkInfo.userAddresses" :key="item.id" @click="switchAddress(item)" :class="{ active: item.id === activeAddress.id }">
        <ul>
        <li><span>收<i />貨<i />人：</span>{{ item.receiver }} </li>
        <li><span>聯繫方式：</span>{{ item.contact }}</li>
        <li><span>收貨地址：</span>{{ item.fullLocation + item.address }}</li>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="toggleFlag = false">取消</el-button>
        <el-button type="primary" @click="setAddress">確定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 添加地址 -->
  <AddressDialog :showFlag="showFlag" @close="(value) => {showFlag = value}" @update="getOrder" :title="title" :addressInfo="editAddress"></AddressDialog>
</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    .show {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>