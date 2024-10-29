<template>
  <div class="asset">
    <div class="number-card card-shadow">
      <div class="icon-box">
        <img class="icon" src="/src/assets/icon/icon4.png" />
      </div>
      <div class="content">
        <div class="title">Total Investment</div>
        <div class="num">₱{{ pageData.amountData.sellTotal }}</div>
      </div>
    </div>
    <div class="number-card card-shadow">
      <div class="icon-box">
        <img class="icon" src="/src/assets/icon/icon3.png" />
      </div>
      <div class="content">
        <div class="title">General Income</div>
        <div class="num">₱{{ pageData.amountData.incomeTotal }}</div>
      </div>
    </div>
    <div class="mine-card card-shadow br-16">
      <Navbar v-model="tabs" @tabChange="changeTab" />
      <template v-if="pageData.assetsList.length">
        <div class="list">
          <div
            class="item"
            v-for="item in pageData.assetsList"
            :key="item.orderId"
          >
            <div class="item-cont">
              <div class="item-left">
                <div class="product-img">
                  <img class="img" :src="item.productImage" />
                  <div class="tag">{{ item.vipName }}</div>
                </div>
              </div>
              <div class="item-right">
                <div class="accumulate">₱{{ item.incomeDayTotal }}</div>
                <div class="product-title">Current Amount</div>
                <div class="product-info">
                  <div class="info-item">
                    <div class="label">Daily Income</div>
                    <div class="value">₱{{ item.incomeDay }}</div>
                  </div>
                  <div class="info-item">
                    <div class="label">Income Days</div>
                    <div class="value">{{ item.dayNum }} Days</div>
                  </div>
                  <div class="info-item">
                    <div class="label">Total Earnings</div>
                    <div class="value">₱{{ item.incomeTotal }}</div>
                  </div>
                  <div class="info-item">
                    <div class="label">Earnimgs Times</div>
                    <div class="value">
                      {{ item.createTime }}~{{ item.overTime }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="product-intro">
              <div class="name">{{ item.productName }}</div>
              <div class="income">
                <span>₱{{ item.price }}</span>
                /
                <span class="small-text">₱{{ item.incomeTotal }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
      <van-empty v-else description="no data" />
    </div>
    <!-- <div
      v-if="pageData.myMinerList.length"
      class="miner-card card-shadow br-16"
    >
      <div class="title">Stable mine</div>
      <div class="list">
        <div
          class="item"
          v-for="item in pageData.myMinerList"
          :key="item.orderId"
        >
          <div class="item-cont">
            <div class="item-left">
              <div class="product-img">
                <img class="img" :src="item.productImage" />
                <div class="tag">{{ item.vipName }}</div>
              </div>
            </div>
            <div class="item-right">
              <div class="accumulate">₱{{ item.incomeDayTotal }}</div>
              <div class="product-title">Current Amount</div>
              <div class="product-info">
                <div class="info-item">
                  <div class="label">Daily Income</div>
                  <div class="value">₱{{ item.incomeDay }}</div>
                </div>
                <div class="info-item">
                  <div class="label">Income Days</div>
                  <div class="value">{{ item.dayNum }} Days</div>
                </div>
                <div class="info-item">
                  <div class="label">Total Earnings</div>
                  <div class="value">₱{{ item.incomeTotal }}</div>
                </div>
                <div class="info-item">
                  <div class="label">Earnimgs Times</div>
                  <div class="value">
                    {{ item.createTime }}~{{ item.overTime }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="product-intro">
            <div class="name">{{ item.productName }}</div>
            <div class="income">
              <span>₱{{ item.price }}</span>
              /
              <span class="small-text">₱{{ item.incomeTotal }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="pageData.myActivityList.length"
      class="miner-card card-shadow br-16"
    >
      <div class="title">New mine</div>
      <div class="list">
        <div
          class="item"
          v-for="item in pageData.myActivityList"
          :key="item.orderId"
        >
          <div class="item-cont">
            <div class="item-left">
              <div class="product-img">
                <img class="img" :src="item.productImage" />
                <div class="tag">{{ item.vipName }}</div>
              </div>
            </div>
            <div class="item-right">
              <div class="accumulate">₱{{ item.incomeDayTotal }}</div>
              <div class="product-title">Current Amount</div>
              <div class="product-info">
                <div class="info-item">
                  <div class="label">Daily Income</div>
                  <div class="value">₱{{ item.incomeDay }}</div>
                </div>
                <div class="info-item">
                  <div class="label">Income Days</div>
                  <div class="value">{{ item.dayNum }} Days</div>
                </div>
                <div class="info-item">
                  <div class="label">Total Earnings</div>
                  <div class="value">₱{{ item.incomeTotal }}</div>
                </div>
                <div class="info-item">
                  <div class="label">Earnimgs Times</div>
                  <div class="value">
                    {{ item.createTime }}~{{ item.overTime }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="product-intro">
            <div class="name">{{ item.productName }}</div>
            <div class="income">
              <span>₱{{ item.price }}</span>
              /
              <span class="small-text">₱{{ item.incomeTotal }}</span>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getOrderListApi, getAmountApi } from "@/api/assetApi.ts";
import Navbar from "@/components/nav/index.vue";

const defaultProductImg = new URL(
  "/src/assets/images/home/default-product-img.png",
  import.meta.url
).href;
const tabs = ref("1");
const pageData = reactive({
  myMineList: [],
  myMinerList: [],
  myActivityList: [],
  assetsList: [],
  amountData: {
    incomeTotal: 0, // 预期总收入
    sellTotal: 0, // 购买总金额
  },
});

const getOrderList = (createId) => {
  return new Promise((resolve, reject) => {
    getOrderListApi({ createId })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getTotalAmount = () => {
  getAmountApi().then((res) => {
    pageData.amountData = res.data;
  });
};

// const getDefaultProductImg = (type) => {
//   const imgMap = {
//     1: '/src/assets/images/asset/mountain-img.png',
//     2: '/src/assets/images/asset/miner-img.png',
//     3: '/src/assets/images/asset/mountain-img.png',
//   }
// }

const changeTab = (tab) => {
  getMyAssetsList(tab)
}

const getMyAssetsList = (type) => {
  pageData.assetsList = []
  getOrderList(type).then((res) => {
    pageData.assetsList = res;
  });
};

onMounted(() => {
  getMyAssetsList(tabs.value);
  getTotalAmount();
});
</script>

<style lang="less" scoped>
.asset {
  padding: 15px;
  .number-card {
    display: flex;
    width: 100%;
    height: 110px;
    background: url("/src/assets/images/asset/number-card-bg.png") no-repeat;
    background-size: contain;
    border-radius: 16px;
    padding: 18px 27px;
    margin-bottom: 15px;
    .icon-box {
      width: 20px;
      margin-right: 10px;
      margin-top: 5px;
    }
    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      .title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 700;
        font-size: 18px;
        color: #ffffff;
        line-height: 25px;
      }
      .num {
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 24px;
        color: #ffb711;
        line-height: 33px;
      }
    }
  }
  .mine-card,
  .miner-card {
    width: 100%;
    min-height: 279px;
    // background: url("/src/assets/images/asset/mine-card-bg.png") no-repeat;
    background-size: 100% 100%;
    border: 1px solid #f5f6f73d;
    padding: 10px;
    margin-bottom: 15px;
    .title {
      font-weight: 700;
      font-size: 18px;
      color: #ffffff;
      line-height: 25px;
      margin-bottom: 16px;
    }
    .list {
      width: 100%;
      .item {
        width: 100%;
        min-height: 200px;
        margin-top: 30px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 20px;
        &:last-of-type {
          border-bottom: none;
        }
        .item-cont {
          display: flex;
          justify-content: space-between;
          .item-left {
            width: 40%;
            margin-right: 10px;
            .product-img {
              width: 100%;
              position: relative;
              .img {
                max-width: 100%;
                max-height: 130px;
              }
              .tag {
                position: absolute;
                left: 0;
                top: 0;
                width: 42px;
                height: 21px;
                line-height: 21px;
                text-align: center;
                background: #ff7711;
                border-radius: 11px;
                font-size: 10px;
                color: #fff;
              }
            }
          }
          .item-right {
            flex: 1;
            .accumulate {
              color: #ffb711;
              font-size: 16px;
            }
            .product-title {
              color: #fff;
              font-size: 16px;
              margin-bottom: 10px;
            }
            .product-info {
              .info-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
                &:last-of-type {
                  margin-bottom: 0;
                }
                .label,
                .value {
                  color: #afafaf;
                  font-size: 12px;
                }
                .label {
                  text-align: left;
                  white-space: nowrap;
                }
                .value {
                  text-align: right;
                }
              }
            }
          }
        }
        .product-intro {
          .name {
            color: #fff;
            font-size: 16px;
            margin-bottom: 10px;
          }
          .income {
            color: #ffb711;
            font-size: 16px;
            .small-text {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
