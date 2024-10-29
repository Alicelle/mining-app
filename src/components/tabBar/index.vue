<template>
  <div class="tab-bar">
    <div class="tab-bar-list">
      <div
        class="tab-bar-list-item"
        :class="{ active: currentPage == item.to }"
        v-for="item in tabbarList"
        :key="item.id"
        @click="tabChange(item)"
      >
        <div class="icon">
          <img
            :src="currentPage == item.to ? item.activeIcon : item.defaultIcon"
          />
        </div>
        <span class="text">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TABBAR_LIST } from "@/constant/enums";

const currentPage = ref("/home/index");
const route = useRoute();
const router = useRouter();

currentPage.value = route.path;
// console.log(route.path, "ddd");

// watch(route, (newVal) => {
//   console.log(newVal, "2222");
// });

// onMounted(() => {
//   tabChange()
// })

// tab切换
const tabChange = (item) => {
  currentPage.value = item.to;
  router.push({ path: item.to });
};
const tabbarList = TABBAR_LIST;
</script>

<style lang="less" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  background: transparent;
  padding: 0 8px;
  box-sizing: border-box;
  background: #242424;
  height: 82px;
  &-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    height: 58px;
    width: 100%;
    background: linear-gradient(#20202a 0%, #2f2f31 100%);
    border-radius: 16px 16px 0px 0px;
    border: 1px solid #979797;
    padding: 0 34px;
    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        width: 20px;
        height: 20px;
        margin-bottom: 4px;
        img {
          width: 100%;
        }
      }
      .text {
        font-family: PingFangSC, PingFang SC;
        font-size: 10px;
        color: #828283;
        line-height: 14px;
        text-align: right;
        font-style: normal;
      }
      &.active {
        .text {
          color: #3fc186;
        }
      }
    }
  }
}
</style>
