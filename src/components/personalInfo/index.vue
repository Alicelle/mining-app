<template>
  <div class="personal-info">
    <div class="avatar-box">
      <img
        :src="
          countInfoData.avatar || defaultAvatarImg
        "
        class="avatar"
      />
    </div>
    <div class="account-info">
      <div class="info-top">
        <span class="name">{{ countInfoData.nickName }}</span>
        <span class="level">{{ vipLevelName || 'VIP0' }}</span>
      </div>
      <div class="level-box" v-if="nextVipLevelName">
        <div class="level-schedule">
          <span class="low-level-text">{{ vipLevelName || 'VIP0' }}</span>
          <div class="bar" :style="{ width: (currentProgress || 0) + '%' }"></div>
          <span class="low-level-text">{{ nextVipLevelName || 'VIP1' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, toRefs } from "vue";
import { vipInfoApi, vipLevelsApi } from "@/api/myApi.ts";
import { userStore } from "@/store/user";
import _ from "lodash";


const defaultAvatarImg = new URL(
  "/src/assets/images/home/default-avatar.png",
  import.meta.url
).href;

const pageData = reactive({
  countInfoData: {},
  vipInfoData: {},
  vipLevelList: [],
  vipLevelName: "",
  nextVipLevelName: "",
  currentProgress: "", // 当前进度
});

const user = userStore();
const {
  countInfoData,
  vipInfoData,
  vipLevelName,
  nextVipLevelName,
  currentProgress,
} = toRefs(pageData);

const emits = defineEmits(['getCountlevelName'])

const getVipInfoData = async () => {
  return vipInfoApi().then((res) => {
    pageData.vipInfoData = res.data;
  });
};

const initCountInfo = () => {
  pageData.countInfoData = user.profile;
};

const getVipLevels = async () => {
  return vipLevelsApi().then((res) => {
    pageData.vipLevelList = res.data || [];
    // 获取当前vip等级和下一级vip等级
    const index = pageData.vipLevelList.findIndex((item) => {
      return item.levelId == pageData.vipInfoData.levelId;
      // return item.levelId == 8;
    });
    // 获取当前vip等级紧急到下一级所需的积分
    const maxPoints = pageData.vipLevelList[index].maxPoints;
    // 获取晋级进度(单位：%)
    currentProgress.value = _.round(
      (vipInfoData.value.points / maxPoints) * 100,
      4
    );
    vipLevelName.value = pageData.vipLevelList[index].name;
    nextVipLevelName.value = pageData.vipLevelList[index + 1] && pageData.vipLevelList[index + 1].name || '';
    emits('getCountlevelName', vipLevelName, pageData.vipLevelList)
  });
};

const init = async () => {
  initCountInfo();
  await getVipInfoData().then(async () => {
    await getVipLevels();
  });
};

onMounted(() => {
  init();
});
</script>

<style lang="less" scoped>
.personal-info {
  height: 60px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  .avatar-box {
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    margin-right: 15px;
    .avatar {
      max-width: 100%;
    }
  }
  .account-info {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .info-top {
      display: flex;
      align-items: center;
      .name {
        display: inline-block;
        margin-right: 10px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 22px;
        color: #ffffff;
        line-height: 30px;
        text-align: right;
        font-style: normal;
      }
      .level {
        display: inline-block;
        height: 24px;
        line-height: 24px;
        padding: 0 7px;
        color: #fff;
        background-color: #3fc186;
        border-radius: 12px;
        font-size: 14px;
      }
    }
    .level-box {
      .level-schedule {
        position: relative;
        display: flex;
        justify-content: space-between;
        width: 223px;
        height: 12px;
        background: #323232;
        border-radius: 6px;
        .bar {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
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
  }
}
</style>