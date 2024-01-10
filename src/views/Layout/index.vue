<script>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
export default {
    name: 'LayoutPage',
    components: {
      LayoutNav,
      LayoutHeader
    }
}
</script>

<template>
  <LayoutNav></LayoutNav>
  <LayoutHeader></LayoutHeader>
</template>

<style>

</style>