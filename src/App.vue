<template>
  <van-nav-bar
    v-if="showNavbar"
    :title="(route.meta.title as string)"
    left-text=""
    left-arrow
    class="nav-bar-top"
    @click-left="router.back()"
  />
  <van-config-provider theme="dark">
    <router-view />
  </van-config-provider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const showNavbar = computed(() => {
  return route.meta.showNavbar;
});
</script>

<style lang="less" scoped>
.nav-bar-top {
  /deep/.van-nav-bar__content {
    background-color: #fff;
    height: 50px;
  }
  /deep/.van-nav-bar__title {
    color: #000;
    font-size: 18px;
  }
  /deep/.van-nav-bar__text {
    color: #000;
  }
  /deep/.van-icon {
    color: #000 !important;
    font-size: 24px;
  }
}
</style>
