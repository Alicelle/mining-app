<template>
  <div class="record-list">
    <div class="item" v-for="(item, index) in list" :key="index">
      <div class="icon-box">
        <img class="icon" :src="iconMapping[type]" alt="" />
      </div>
      <div class="record-info">
        <div class="title">
          <span class="text">{{
            item[config["titleKey"]] || calcShowName
          }}</span>
          <span
            v-if="type == 'withdrawalRecord'"
            class="status-text"
            :class="{
              success: item.status == 1,
              fail: item.status == 2,
              processing: item.status == 0,
            }"
            >{{ statusMapping[item.status] }}</span
          >
        </div>
        <div class="info-cont">
          <span class="time">{{
            item[config["timeKey"]] || "2024-06-25"
          }}</span>
          <span class="num">₱{{ item[config["amountKey"]] || "0" }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps, computed } from "vue";
import { getAssetsIcon } from "@/utils/index";
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  type: {
    type: String,
    default: "balanceRecord",
  },
  config: {
    type: Object,
    default: () => {},
  },
});

const calcShowName = computed(() => {
  if (props.type == "withdrawalRecord") {
    return "Withdrawal";
  }
  return "-";
});

const statusMapping = {
  0: "PROCESSING",
  1: "SUCCESS",
  2: "FAILURE",
};

const iconMapping = {
  balanceRecord: getAssetsIcon("balance-record-list-icon"),
  rechargeRecord: getAssetsIcon("recharge-record-list-icon"),
  withdrawalRecord: getAssetsIcon("withdrawal-record-list-icon"),
  revenueRecord: getAssetsIcon("revenue-record-list-icon"),
  commissionRecord: getAssetsIcon("commission-record-list-icon"),
  giftRecord: getAssetsIcon("gift-record-list-icon"),
};

const { list, type, config } = toRefs(props);
</script>

<style lang="less" scoped>
.record-list {
  .item {
    display: flex;
    align-items: center;
    padding: 20px 20px 20px 25px;
    width: 345px;
    height: 84px;
    background: rgba(27, 27, 27, 0.4);
    border-radius: 16px;
    border: 1px solid #434343;
    margin-bottom: 16px;
    .icon-box {
      width: 22px;
      margin-right: 18px;
      .icon {
        width: 100%;
      }
    }
    .record-info {
      flex: 1;
      overflow: hidden;
      .title {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 3px;
        .text {
          flex: 1;
          width: 70%;
          // 省略号展示
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 16px;
          color: #ffffff;
          line-height: 22px;
        }
        .status-text {
          font-size: 16px;
          &.success {
            color: #00ff00;
          }
          &.fail {
            color: #ff0000;
          }
          &.processing {
            color: #ffb711;
          }
        }
      }
      .info-cont {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .time {
          font-size: 12px;
          color: #afafaf;
          line-height: 17px;
        }
        .num {
          font-size: 18px;
          color: #ffb711;
          line-height: 25px;
        }
      }
    }
  }
}
</style>
