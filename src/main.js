// 引入初始化樣式
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 導入自定義插件
import { directivePlugin } from '@/directives'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 使用自定義插件
app.use(directivePlugin)