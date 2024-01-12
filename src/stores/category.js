import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategoryList } from '@/apis/layout'

export const useCategoryStore = defineStore('category', () => {
    const categoryList = ref([])

    const getCategory = async() => {
        const res = await getCategoryList()
        categoryList.value = res.result
    }

    return {
        categoryList,
        getCategory
    }
})