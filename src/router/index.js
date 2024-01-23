import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import CheckOut from '@/views/CheckOut/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: '/category/:id',
          component: Category
        },
        {
          path: '/category/sub/:id',
          component: SubCategory
        },
        {
          path: '/detail/:id',
          component: Detail
        },
        {
          path: '/cartlist',
          component: CartList
        },
        {
          path: '/checkout',
          component: CheckOut
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
  // 定制路由滾動行為(路由發生變化時, 自動滾動到頂部)
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
