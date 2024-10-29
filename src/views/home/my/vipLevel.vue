<template>
  <div class="vip-level">
    <div class="title">
      <span class="text"> My current level is</span>
      <span class="level-tag" v-if="vipLevelName">{{ vipLevelName }}</span>
    </div>
    <div class="amount-cont">
      <img class="asset-icon" src="/src/assets/icon/assets-icon.png" />
      <span class="label">Investment Amount</span>
      <span class="num">₱{{ countInfoData.balance || '0' }}</span>
    </div>
    <div class="level-box" v-if="vipLevelName && nextVipLevelName">
      <div class="level-schedule">
        <span class="low-level-text">{{ vipLevelName }}</span>
        <div class="bar" :style="{ width: currentProgress + '%' }"></div>
        <span class="low-level-text">{{ nextVipLevelName }}</span>
      </div>
    </div>
    <div class="development-tip" v-if="nextVipLevelName">
      Reinvestment of {{ points - vipInfoData.points }} will upgrade to {{ nextVipLevelName }}
    </div>
    <div class="main-cont">
      <div class="top">
        <div class="icon-box">
          <img src="/src/assets/icon/recommendation-icon.png" class="icon" />
        </div>
        <div class="title-box">
          <div class="main-title">Description Of Interest</div>
          <div class="sub-title">
            Each level has the right to purchase products of that level. The
            higher the grade, the greater the product equity.
          </div>
        </div>
      </div>
      <div class="content">
        <div class="vip-level-list">
          <div
            class="vip-lebel-item"
            v-for="(item, index) in vipLevelList"
            :key="index"
          >
            <div class="level-name">{{ item.name }}</div>
            <div class="vip-content">
              <span class="vip-tip-text">
                {{ item.remark }}
              </span>
              <span v-if="index != 0" class="amount">{{ item.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { VIP_LEVEL_LIST } from "@/constant/enums.ts";
import { showSuccessToast } from "vant";
import { vipInfoApi, vipLevelsApi } from "@/api/myApi.ts";
import { reactive, toRefs } from "vue";
import { userStore } from "@/store/user";
import _ from "lodash";

const user = userStore();

const pageData = reactive({
  vipInfoData: {},
  vipLevelList: [],
  vipLevelName: "",
  nextVipLevelName: "",
  currentProgress: "", // 当前进度
  points: 0,
  countInfoData: {}
});
const vipList = VIP_LEVEL_LIST;
const {
  vipInfoData,
  vipLevelList,
  vipLevelName,
  nextVipLevelName,
  currentProgress,
  points,
  countInfoData
} = toRefs(pageData);

const getVipInfoData = async () => {
  return vipInfoApi().then((res) => {
    pageData.vipInfoData = res.data;
  });
};

const getVipLevels = async () => {
  return vipLevelsApi().then((res) => {
    pageData.vipLevelList = res.data || [];
    // 获取当前vip等级和下一级vip等级
    const index = pageData.vipLevelList.findIndex((item) => {
      // return item.levelId == 8;
      return item.levelId == pageData.vipInfoData.levelId;
    });
    // 获取当前vip等级紧急到下一级所需的积分
    const maxPoints = pageData.vipLevelList[index].maxPoints;
    // 获取晋级进度(单位：%)
    currentProgress.value = _.round(
      (vipInfoData.value.points / maxPoints) * 100,
      4
    );
    points.value = maxPoints + 1; // 当前升级所需要的积分
    vipLevelName.value = pageData.vipLevelList[index].name;
    nextVipLevelName.value = pageData.vipLevelList[index + 1] && pageData.vipLevelList[index + 1].name || '';
  });
};

const initCountInfo = async () => {
  pageData.countInfoData = user.profile;
};

const init = async () => {
  initCountInfo()
  await getVipInfoData();
  await getVipLevels();
};

init();
</script>

<style lang="less" scoped>
.vip-level {
  padding: 20px 14px;
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 9px;
    .text {
      font-size: 18px;
      color: #ffffff;
      margin-right: 6px;
    }
    .level-tag {
      display: inline-block;
      height: 24px;
      line-height: 24px;
      padding: 0 7px;
      background: #3fc186;
      border-radius: 12px;
      color: #fff;
      font-size: 14px;
    }
  }
  .amount-cont {
    display: flex;
    align-items: center;
    .asset-icon {
      margin-right: 11px;
      width: 20px;
    }
    .label {
      font-size: 18px;
      color: #ffffff;
      line-height: 25px;
      margin-right: 14px;
    }
    .num {
      font-size: 20px;
      color: #ffb711;
      line-height: 28px;
    }
  }
  .level-box {
    margin-top: 18px;
    .level-schedule {
      position: relative;
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 12px;
      background: #323232;
      border-radius: 6px;
      .bar {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        // width: 60%;
        background: linear-gradient(
          270deg,
          #74e2bb 0%,
          rgba(63, 193, 134, 0.12) 100%
        );
        border-radius: 6px;
      }
      .low-level-text {
        color: #fff;
        font-size: 10px;
        margin: 0 7px;
      }
    }
  }
  .development-tip {
    padding-top: 10px;
    font-size: 12px;
    color: #3fc186;
    line-height: 17px;
    word-break: break-all;
    margin-bottom: 20px;
  }
  .main-cont {
    width: 100%;
    min-height: 498px;
    background: url("/src/assets/images/my/vip-level-bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 20px 6px 20px 14px;
    .top {
      display: flex;
      margin-bottom: 30px;
      .icon-box {
        width: 22px;
        padding-left: 4px;
        margin-right: 11px;
        .icon {
          width: 18px;
        }
      }
      .title-box {
        flex: 1;
        .main-title {
          font-size: 16px;
          color: #ffffff;
          line-height: 22px;
          margin-bottom: 8px;
        }
        .sub-title {
          font-size: 14px;
          color: #afafaf;
          line-height: 20px;
          // word-break: break-all;
        }
      }
    }
    .content {
      .vip-level-list {
        .vip-lebel-item {
          display: flex;
          margin-bottom: 28px;
          .level-name {
            width: 45px;
            font-size: 18px;
            color: #22a367;
            line-height: 25px;
            margin-right: 11px;
          }
          .vip-content {
            flex: 1;
            font-size: 12px;
            color: #afafaf;
            line-height: 17px;
            .amount {
              color: #3fc186;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
