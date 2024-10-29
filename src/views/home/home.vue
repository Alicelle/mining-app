<template>
  <div class="home">
    <router-view />
    <tabBar />
  </div>
</template>

<script setup lang="ts">
import tabBar from "@/components/tabBar/index.vue";
// import { ref } from 'vue'
// import { TABBAR_LIST } from '@/constant/enums'

// const activeName = ref('home')
// const tabbarList = TABBAR_LIST
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 100px;
  min-height: 100vh;
  background: @default-bg-color;
  box-sizing: border-box;
}
</style>
