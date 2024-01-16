import { getBannerImg } from '@/apis/home';
import { ref, onMounted } from 'vue';

export function useBanner() {
    const bannerImg = ref([])
    const getBanner = async() => {
      const { result } = await getBannerImg('2')
      bannerImg.value = result
    }
    onMounted(() => {getBanner()})
    return bannerImg
}