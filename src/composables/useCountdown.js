import { ref, computed, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import router from '@/router'
export function useCountdown() {
    let timer = null // 定時器
    const time = ref(0)
    const formatTime = computed(() => { return dayjs.unix(time.value).format('mm分ss秒') })
    const start = (currentTime) => {
        time.value = currentTime
        timer = setInterval(() => {
            if(time.value === 0) {
                clearInterval(timer)
                router.replace('/')
            } else {
                time.value--
            }
        }, 1000)
    }
    // 頁面銷毀時清除定時器
    onUnmounted(() => {
        timer && clearInterval(timer)
    })
    return {
        formatTime,
        start
    }
}