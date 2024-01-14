// 導入vueuse中監聽元素是否出現在視口中的方法
import { useIntersectionObserver } from '@vueuse/core'

// 自定義指令插件
export const directivePlugin = {
    // 接受實例應用(creatApp({}))
    install(app) {
        // 自定義img-lazy指令
        app.directive('img-lazy', {
            mounted(el, binding) {
                // console.log(el, binding);
                // el為指令綁定的元素(此指令為img)
                // binding: binding.value 自定義指令等號後面的值(v-自定義指令="值")
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        // console.log(isIntersecting)
                        // 元素進入視口時
                        if(isIntersecting) {
                            el.src = binding.value
                            stop()
                        }
                    },
                  )
            }
        })
    }
}