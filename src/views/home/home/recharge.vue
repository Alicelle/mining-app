<template>
  <div class="recharge">
    <div class="enter-number-box">
      <div class="title">Recharge Amount</div>
      <div class="input-box">
        <input
          v-model="pageData.amount"
          type="text"
          placeholder="Please Input"
          class="input"
        />
      </div>
      <div class="amount-tip-box">
        <span class="label">Your available balance</span>
        <span class="num">₱{{ pageData.countInfoData.balance }}</span>
      </div>
    </div>
    <div class="select-amount-box">
      <div class="title">Optional Amount</div>
      <div class="amount-list">
        <div
          class="item"
          v-for="item in pageData.configList"
          :key="item"
          :class="{ 'card-shadow': item == pageData.currentAmount }"
          @click="amountChange(item)"
        >
          ₱{{ item }}
        </div>
      </div>
    </div>
    <div class="pay-mode-box">
      <div class="title">Mode Of Payment</div>
      <div class="mode-list">
        <div class="mode-item">
          <div class="icon">
            <!-- <img
              :src="item == 1 ? pageData.selectIcon : pageData.selectedIcon"
            /> -->
            <img :src="pageData.selectedIcon" />
          </div>
          <div class="pay-text">third-party payment</div>
        </div>
      </div>
    </div>
    <div class="confirm-btn" @click="confirm">Confirm</div>
  </div>
</template>

<script setup>
import { showFailToast, showLoadingToast, closeToast } from "vant";
import { rechargeApi, getDepositDisplayApi } from "@/api/homeApi.ts";
import { reactive, onMounted } from "vue";
import { getAssetsIcon } from "@/utils/index.ts";
import { userStore } from "@/store/user";

const user = userStore();
const pageData = reactive({
  currentAmount: 0, // 当前选择金额
  selectIcon: getAssetsIcon("select-icon"),
  selectedIcon: getAssetsIcon("selected-icon"),
  amount: "",
  configList: [],
  countInfoData: {}
});

// 充值金额切换
const amountChange = (item) => {
  pageData.currentAmount = item;
  pageData.amount = item;
  // pageData.amount = pageData.currentAmount * 1000000;
  // pageData.amount = pageData.currentAmount * 1000000;
};

// 获取充值配置
const getDepositDisplay = () => {
  getDepositDisplayApi().then((res) => {
    if (res.data) {
      pageData.configList = res.data.depositAmountStrings
        ? res.data.depositAmountStrings.split(",")
        : [];
    }
  });
};

const initCountInfo = async () => {
  pageData.countInfoData = user.profile;
};

// 提交
const confirm = () => {
  if (!pageData.amount) {
    showFailToast("Please enter the amount");
    return false;
  }
  if (!/^[0-9]*$/.test(pageData.amount)) {
    showFailToast("Please enter the correct amount");
    return false;
  }
  showLoadingToast({
    message: "loading",
    forbidClick: true,
    loadingType: "spinner",
  });
  const params = {
    paymentMethod: 1, // 支付方式
    amount: pageData.amount,
  };
  rechargeApi(params)
    .then((res) => {
      if (res.data) {
        window.open(res.data, "__blank");
      }
    })
    .finally(() => {
      closeToast();
    });
};
onMounted(() => {
  initCountInfo()
  getDepositDisplay();
});
</script>

<style lang="less" scoped>
.recharge {
  padding: 40px 15px 72px 15px;
  .enter-number-box {
    margin-bottom: 47px;
    .input-box {
      width: 100%;
      height: 64px;
      background: rgba(0, 0, 0, 0.22);
      border-radius: 16px;
      border: 1px solid rgba(200, 200, 200, 0.3);
      padding-left: 24px;
      margin-bottom: 16px;
      .input {
        border: none;
        outline: none;
        background-color: transparent;
        height: 100%;
        width: 100%;
        font-size: 16px;
        color: #ffffff;
        line-height: 22px;
        &::placeholder {
          color: #fff;
          font-size: 16px;
        }
      }
    }
    .amount-tip-box {
      font-size: 12px;
      color: #afafaf;
      line-height: 17px;
      .num {
        font-weight: 700;
        font-size: 18px;
        color: #ffb711;
        line-height: 25px;
        margin-left: 11px;
      }
    }
  }
  .select-amount-box {
    .amount-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: 108px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 16px;
        color: #ffb711;
        background: rgba(27, 27, 27, 0.4);
        border-radius: 16px;
        border: 1px solid #434343;
        margin-bottom: 11px;
      }
    }
  }
  .pay-mode-box {
    margin-bottom: 42px;
    .mode-list {
      .mode-item {
        display: flex;
        align-items: center;
        padding: 0 25px;
        width: 100%;
        height: 64px;
        background: rgba(27, 27, 27, 0.4);
        border-radius: 16px;
        border: 1px solid #434343;
        margin-bottom: 16px;
        .icon {
          margin-right: 17px;
          padding-top: 3px;
          width: 22px;
          img {
            width: 100%;
          }
        }
        .pay-text {
          font-size: 16px;
          color: #ffffff;
          line-height: 22px;
        }
      }
    }
  }
  .title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 18px;
    color: #ffffff;
    line-height: 25px;
    margin-bottom: 25px;
  }
}
</style>
