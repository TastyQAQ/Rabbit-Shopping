<script setup>
import { ref, watch } from 'vue'
// vueUse提供響應式獲取滑鼠相對於元素的位置
import { useMouseInElement } from '@vueuse/core'

const props = defineProps({
    img: {
        type: Array,
        default: () => {}
    }
})

// 選中小圖渲染大圖效果
const curIndex = ref(0)
const changeMiddleImage = (index) => { curIndex.value = index }
// 獲取滑鼠在某一元素內的位置
const target = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(target)
// 滑塊滑動效果
const top = ref(0) // 滑塊水平位置
const left = ref(0) // 滑塊垂直位置

const positionX = ref(0) // 放大鏡大圖水平位置
const positionY = ref(0) // 放大鏡大圖垂直位置
watch([elementX, elementY, isOutside], () => {
    // 滑鼠不在圖片內停止執行
    if (isOutside.value) return
    // 100為滑塊一半的高度, 300為圖片高度減去滑塊一半高度
    // 縱向
    if (elementY.value > 100 && elementY.value < 300) {
        top.value = elementY.value - 100
    }
    // 橫向
    if (elementX.value > 100 && elementX.value < 300) {
        left.value = elementX.value - 100
    }
    // 滑塊移動到邊界效果
    if(elementY.value < 100) { top.value = 0 }
    if(elementY.value > 300) { top.value = 200 }

    if(elementX.value < 100) { left.value = 0 }
    if(elementX.value > 300) { left.value = 200 }

    // 放大鏡大圖移動效果
    positionX.value = -left.value * 2 // 滑鼠往右, 放大鏡背景圖往左, 所以為負值, 又放大鏡圖為原圖的2倍大, 因此數值*2
    positionY.value = -top.value * 2
})
</script>

<template>
    <div class="goods-image">
        <!-- 左側大圖 -->
        <div class="middle">
            <img :src="props.img[curIndex]" alt="" ref="target">
            <!-- 矇層滑塊 -->
            <div class="layer" :style="{ top: `${top}px`, left: `${left}px` }" v-show="!isOutside"></div>
        </div>
        <!-- 小圖列表 -->
        <ul class="small">
            <li v-for="(item, index) in props.img" :key="index" @mouseenter="changeMiddleImage(index)" :class="{ active: index === curIndex }">
                <img :src="item" alt="">
            </li>
        </ul>
        <!-- 放大鏡大圖 -->
        <div class="large" :style="{
            background: `url(${props.img[curIndex]})`,
            backgroundPositionX: `${positionX}px`,
            backgroundPositionY: `${positionY}px`
        }" v-show="!isOutside"></div>
    </div>
</template>

<style lang="scss" scoped>
.goods-image {
    width: 480px;
    height: 400px;
    position: relative;
    display: flex;
    .middle {
        width: 400px;
        height: 400px;
        background: #f5f5f5;
        position: relative;
        .layer {
            width: 200px;
            height: 200px;
            background: rgba(0, 0, 0, 0.2);
            // 絕對定位 然后跟隨滑鼠控制left和top屬性就可以讓滑塊移動起來
            left: 0;
            top: 0;
            position: absolute;
        }
    }
    .small {
        width: 80px;

        li {
            width: 68px;
            height: 68px;
            margin-left: 12px;
            margin-bottom: 15px;
            cursor: pointer;

            &:hover,
            &.active {
                border: 2px solid $xtxColor;
            }
        }
    }
    .large {
        position: absolute;
        top: 0;
        left: 412px;
        width: 400px;
        height: 400px;
        z-index: 500;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
        // 背景圖:盒子的大小 = 2:1  將來控制背景圖的移動來實現放大的效果查看 background-position
        background-size: 800px 800px;
        background-color: #f8f8f8;
    }
}
</style>