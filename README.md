此項目使用VScode編輯器撰寫, 以Vue3版本並基於vite架設

請求接口為中國「黑馬程序員」機構所創建

主要使用工具包含element-plus組件庫及axios請求工具等等

# 小兔鮮ㄦ購物網

###### 此項目模擬電商網站, 包含購物車、生成訂單、結算等功能

<img src="https://img.onl/TfiLPP">

## 登入頁

##### 帳號密碼登入, 亦可點擊"進入網站首頁"查看網站"、加入購物車; 但未登入無法執行部分操作(生成訂單、結算等)

<img src="https://img.onl/Tvz7ko">

## 頁面布局(紅色框區域)

##### 頁面頂部(含滾動頁面觸發的sticky導航)及底部導航, 用戶相關操作(登入、登出等)、各商品分類頁及購物車鏈結(點擊進購物車頁面、滑鼠停留顯示已加入購物車商品)

* 頂部&底部&sticky導航(紅色區塊)
<img src="https://img.onl/9h7Qur" width="400px"><img src="https://img.onl/sXoI0s" width="400px">

* 購物車
<img src="https://img.onl/7lmhjx" width="600px">

## 首頁

##### 輪播圖、推薦商品等等數據展示

<img src="https://img.onl/TfiLPP" width="400px"><img src="https://img.onl/l3NVTC" width="400px">

## 商品分類頁

##### 商品分類展示

* 居家&美食頁
<img src="https://img.onl/f00BKZ" width="400px"><img src="https://img.onl/F6L2FK" width="400px">

## 商品詳情頁

##### 商品詳細介紹及相關操作, 圖片切換&放大鏡效果、商品規格&數量選擇、加入購物車

<img src="https://img.onl/zX3YCO">

* 放大鏡效果
<img src="https://img.onl/8xenPr">

## 購物車

##### 購物車內商品操作, 數量修改、從購物車移除、選擇要下單的商品(複選框勾選)

<img src="https://img.onl/AhdPid">

## 確認訂單頁

##### 添加&選擇配送地址、商品資訊展示、提交訂單, 配送時間及付款方式為靜態樣式無實際功能

<img src="https://img.onl/xBZkkQ" width="400px"><img src="https://img.onl/HCzhQc" width="400px">

* 更改地址
<img src="https://img.onl/eJco1u" width="600px">

## 付款頁

##### 付款倒計時、線上付款方式(請直接點選支付宝跳轉付款結果頁)

<img src="https://img.onl/wnFfEq">

## 付款結果頁

##### 付款結果顯示、查看訂單、跳轉首頁

<img src="https://img.onl/7xlyyq">

## 會員中心

##### 個人中心、個人訂單查看

<img src="https://img.onl/N46wPI" width="400px"><img src="https://img.onl/OxM2qj" width="400px">

## 安裝

```bash
# 獲取專案
git clone https://github.com/TastyQAQ/Rabbit-Shopping
```

```bash
# 安裝套件
pnpm install
```

```bash
# 運行專案
pnpm build
```
## 主要工具

* Vue v3.4.15
* Vue Router v4.2.5
* VueUse v10.7.2
* Pinia v2.1.7
* element-plus v2.5.3
* axios v1.6.7
