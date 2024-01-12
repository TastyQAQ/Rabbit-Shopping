<script setup>
import { getBannerImg } from '@/apis/home'
import { ref, onMounted } from 'vue'

const BannerImg = ref([])

const getBanner = async() => {
    const res = await getBannerImg()
    BannerImg.value = res.result
}

onMounted(() => {getBanner()})
</script>

<template>
    <div class="home-banner">
        <el-carousel height="500px" trigger="click">
            <el-carousel-item v-for="item in BannerImg" :key="item.id">
                <img :src="item.imgUrl" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style lang="scss" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>