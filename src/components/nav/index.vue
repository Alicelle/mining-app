<template>
  <div class="nav-br">
    <div class="nav-list">
      <div
        class="nav-item"
        v-for="item in navList"
        :key="item.value"
        :class="{ active: item.value == modelData }"
        @click="navChange(item.value)"
      >
        <span class="text">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from "vue";
import { navList } from "@/constant/enums.ts";

const props = defineProps({
  modelValue: { type: [String, Number] },
});

const emits = defineEmits(["change", "update:modelValue"]);
const modelData = ref(props.modelValue);

watch(
  () => props.modelValue,
  (n) => {
    modelData.value = n;
  }
);
const navChange = (value) => {
  emits("change", emits("update:modelValue", value));
  emits("tabChange", value)
};
</script>

<style lang="less" scoped>
.nav-br {
  height: 54px;
  .nav-list {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 6px 0 19px;
    .nav-item {
      font-size: 14px;
      color: #ffffff;
      line-height: 21px;
      .text {
        display: inline-block;
        height: 33px;
        border-bottom: 2px solid transparent;
      }
      &.active {
        // font-weight: 700;
        color: #3fc186;
        .text {
          border-bottom-color: #3fc186;
        }
      }
    }
  }
}
</style>
