import { getCategoryList } from '@/apis/category';
import { useRoute, onBeforeRouteUpdate  } from 'vue-router';
import { ref, onMounted } from 'vue';


export function useCategory() {
    const route = useRoute()
    const categoryList = ref({})
    const getCategory = async(id) => {
    const { result } = await getCategoryList(id)
    categoryList.value = result
    }
    onMounted(() => { getCategory(route.params.id) })

    // vueRouter4 導航守衛onBeforeRouteUpdate
    onBeforeRouteUpdate((to) => {
        getCategory(to.params.id)
    })
    return categoryList
}
