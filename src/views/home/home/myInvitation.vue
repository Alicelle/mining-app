<template>
  <div class="my-invitation">
    <div class="title">My Team</div>
    <div class="statistics-box">
      <div class="item">
        <div class="label">Total Team Size</div>
        <div class="value">{{ teamData.teamTotal || "0" }}</div>
      </div>
      <div class="item">
        <div class="label">Gross Profit</div>
        <div class="value">{{ teamData.amountTotal || "0" }}</div>
      </div>
    </div>
    <div class="main-container">
      <div class="tab-cont">
        <div
          class="tab-item"
          v-for="item in tabList"
          :class="{ active: item.value == currentTab }"
          :key="item.value"
          @click="tabChange(item)"
        >
          <span class="text">{{ item.text }}</span>
        </div>
      </div>
      <div class="cont">
        <div class="card">
          <div class="item">
            <div class="icon-box">
              <img src="/src/assets/icon/person-number-icon.png" />
            </div>
            <div class="card-box">
              <div class="card-box-title">Number Of People</div>
              <div class="value">{{ currentTabData.teamTotal || "0" }}</div>
            </div>
          </div>
          <div class="item">
            <div class="icon-box">
              <img src="/src/assets/icon/invitation-wallet-icon.png" />
            </div>
            <div class="card-box">
              <div class="card-box-title">Profit</div>
              <div class="value">₱{{ currentTabData.amountTotal || "0" }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="presenter-list">
        <div
          class="item"
          v-for="(item, index) in currentTabData.referralsVOList"
          :key="index"
        >
          <div class="item-info">
            <div class="label">ID</div>
            <div class="value">{{ item.refereeId }}</div>
          </div>
          <div class="item-info">
            <div class="label">Registration Date</div>
            <div class="value">{{ item.createTime && item.createTime.split(' ')[0] || '-' }}</div>
          </div>
          <div class="item-info">
            <div class="label">State</div>
            <div class="value" :class="{ active: item.activeState == 0 }">
              {{ item.activeState == 0 ? "active" : "inactivity" }}
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="table-cont">
        <div class="table-th-con">
          <div class="table-th-item flex-1">ID</div>
          <div class="table-th-item flex-3">Registration Date</div>
          <div class="table-th-item flex-1">State</div>
        </div>
        
        <div class="table-row-con">
          <div
            class="table-row"
            v-for="(item, index) in currentTabData.referralsVOList"
            :key="index"
          >
            <div class="table-td-item flex-1">
              <span class="text">{{ item.refereeId }}</span>
            </div>
            <div class="table-td-item flex-3">
              <span class="text">2024-05-15</span>
            </div>
            <div class="table-td-item flex-1">
              <span class="text" :class="{ active: item.activeState == 0 }">{{
                item.activeState == 0 ? "active" : "inactivity"
              }}</span>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { myTeamApi } from "@/api/homeApi";
import { ref, reactive, onMounted, toRefs } from "vue";

const currentTab = ref(1);

let pageData = reactive({
  teamData: {},
  currentTabData: {},
});
const { teamData, currentTabData } = toRefs(pageData);
const tabList = reactive([
  {
    text: "Pathfinder",
    value: 1,
  },
  {
    text: "Pioneer",
    value: 2,
  },
  {
    text: "Ambassador",
    value: 3,
  },
]);

const filedMapping = {
  1: "explorerTeamVO",
  2: "pioneerTeamVO",
  3: "pmbassadorTeamVO",
};

const tabChange = (item) => {
  currentTab.value = item.value;
  currentTabData.value = teamData.value[filedMapping[currentTab.value]] || [];
};

const getTeamInfo = () => {
  myTeamApi().then((res) => {
    teamData.value = res.data;
    currentTabData.value = res.data[filedMapping[currentTab.value]] || [];
  });
};

onMounted(() => {
  getTeamInfo();
});
</script>

<style lang="less" scoped>
.my-invitation {
  padding: 17px 15px;
  .title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 700;
    font-size: 22px;
    color: #ffffff;
    line-height: 30px;
    text-align: center;
    margin-bottom: 12px;
  }
  .statistics-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 19px;
    .item {
      width: 167px;
      height: 98px;
      background: url("/src/assets/images/invitation/statistics-bg.png")
        no-repeat;
      background-size: contain;
      padding: 19px 22px 16px 22px;
      .label {
        margin-bottom: 11px;
        text-align: center;
        font-size: 16px;
        color: #ffffff;
        line-height: 22px;
      }
      .value {
        font-size: 22px;
        color: #ffb711;
        line-height: 30px;
        text-align: center;
      }
    }
  }
  .main-container {
    // height: 462px;
    background: url("/src/assets/images/invitation/main-container-bg.png")
      no-repeat;
    background-size: cover;
    background-position: center center;
    padding-bottom: 40px;
    .tab-cont {
      display: flex;
      align-items: center;
      width: 100%;
      height: 54px;
      margin-bottom: 20px;
      .tab-item {
        height: 42px;
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #ffffff;
        line-height: 21px;
        &.active {
          .text {
            border-color: #3fc186;
            color: #3fc186;
          }
        }
        .text {
          display: inline-block;
          border-bottom: 2px solid transparent;
          padding: 10px 0;
        }
      }
    }
    .cont {
      padding: 0 25px;
      margin-bottom: 20px;
      .card {
        width: 100%;
        height: 204px;
        background: rgba(0, 0, 0, 0.22);
        border-radius: 8px;
        border: 1px solid rgba(200, 200, 200, 0.3);
        padding: 21px;
      }
      .item {
        display: flex;
        .icon-box {
          width: 22px;
          margin-right: 8px;
          padding-top: 3px;
          img {
            width: 100%;
          }
        }
        .card-box {
          font-size: 18px;
          color: #ffffff;
          line-height: 25px;
          margin-bottom: 8px;
        }
        .value {
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 24px;
          color: #ffb711;
          line-height: 33px;
        }
        &:first-of-type {
          margin-bottom: 20px;
        }
      }
    }
    .table-cont {
      padding: 0 25px;
      .table-th-con {
        display: flex;
        margin-bottom: 30px;
        .table-th-item {
          font-weight: 700;
          font-size: 16px;
          color: #fff;
        }
      }
      .table-row-con {
        width: 100%;
        .table-row {
          width: 100%;
          display: flex;
          margin-bottom: 15px;
        }
        .table-td-item {
          color: #afafaf;
          font-size: 16px;
          width: 100%;
          .text {
            display: inline-block;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            &.active {
              color: #3fc186;
            }
          }
        }
      }
    }
    .presenter-list {
      padding: 0 25px;
      .item {
        margin-bottom: 25px;
        .item-info {
          display: flex;
          margin-bottom: 10px;
          .label {
            color: #afafaf;
            font-size: 14px;
            width: 40%;
          }
          .value {
            text-align: right;
            color: #fff;
            font-size: 14px;
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            &.active {
              color: #3fc186;
            }
          }
        }
      }
    }
  }
  .flex-1 {
    flex: 1;
  }
  .flex-2 {
    flex: 2;
  }
  .flex-3 {
    flex: 3;
  }
}
</style>
