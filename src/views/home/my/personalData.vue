<template>
  <div class="personal-data">
    <div class="data-list">
      <div
        class="item"
        v-for="(item, index) in personalDataList"
        :key="index"
        @click="itemCLick(item)"
      >
        <div class="icon-box">
          <img class="icon" :src="item.icon" :width="item.width" alt="" />
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PERSONAL_DATA_LIST } from "@/constant/enums.ts";
import { useRouter } from "vue-router";

const personalDataList = PERSONAL_DATA_LIST;
const router = useRouter();

const itemCLick = (item) => {
  if (item.pageName) {
    router.push({ name: item.pageName });
  }
};
</script>

<style lang="less" scoped>
.personal-data {
  padding: 15px;
  .data-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    .item {
      width: 165px;
      height: 165px;
      margin-bottom: 16px;
      background: rgba(27, 27, 27, 0.4);
      border-radius: 16px;
      border: 1px solid #434343;
      .icon-box {
        text-align: center;
        height: 85px;
        padding-top: 35px;
        margin-bottom: 25px;
      }
      .name {
        font-size: 14px;
        color: #ffffff;
        line-height: 20px;
        text-align: center;
      }
    }
  }
}
</style>
