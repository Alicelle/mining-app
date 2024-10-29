<template>
  <div class="withdraw">
    <div class="cash-amount-box">
      <div class="title">Cash Withdrawal Amount</div>
      <div class="input-box">
        <input
          v-model="pageData.ruleForm.amount"
          type="text"
          placeholder="Please Input"
          class="input"
        />
      </div>
      <div class="amount-tip-box">
        <span class="label">Your withdrawal limit</span>
        <span class="num"
          >₱{{ pageData.countInfoData.withdrawalAmount || "0" }}</span
        >
      </div>
    </div>
    <div class="trade-pwd-box">
      <div class="title">Traders Password</div>
      <div class="input-box">
        <input
          v-model="pageData.ruleForm.tradePassword"
          type="password"
          placeholder="Please Input trade password"
          class="input"
          maxlength="6"
        />
      </div>
    </div>
    <div class="pay-mode-box">
      <div class="title">
        <span>Select Debit Card</span>
        <span class="link" @click="goAddBankCard">add</span>
      </div>
      <div v-if="pageData.bankList.length" class="mode-list">
        <div
          class="mode-item"
          v-for="(item, index) in pageData.bankList"
          :key="index"
          @click="bankChange(item)"
        >
          <div class="icon">
            <img
              :src="
                item.accountId != pageData.currentBank.accountId
                  ? pageData.selectIcon
                  : pageData.selectedIcon
              "
            />
          </div>
          <div class="pay-text">
            {{ item.bankName }}（{{ item.accountNumber }}）
          </div>
          <div class="bank-logo-box">
            <img src="/src/assets/icon/bank-logo-icon.png" />
          </div>
        </div>
      </div>
      <div v-else class="no-bank-list-tip">Please add a debit card</div>
    </div>
    <div class="reminder-box">
      <div class="title">Withdrawal Reminder</div>
      <div class="tip-list">
        <div class="item" v-for="item in pageData.tipList" :key="item.label">
          <div class="label">{{ item.label }}</div>
          <div class="value">{{ item.value }}{{ item.unit || "" }}</div>
        </div>
      </div>
      <div class="tip-text">
        * To facilitate the settlement of funds, you can only submit one
        withdrawal per day
      </div>
    </div>
    <div class="confirm-btn" @click="confirm">Confirm</div>
  </div>
</template>

<script setup>
import { showFailToast, showSuccessToast } from "vant";
import {
  bankListApi,
  checkPasswordApi,
  withdrawApi,
  getWithdrawalConfigApi,
} from "@/api/bankApi.ts";
import { reactive, onMounted } from "vue";
import { getAssetsIcon } from "@/utils/index.ts";
import { useRouter } from "vue-router";
import { userStore } from "@/store/user";
const router = useRouter();

const pageData = reactive({
  withdrawConfigData: {},
  currentAmount: 1, // 当前选择金额
  selectIcon: getAssetsIcon("select-icon"),
  selectedIcon: getAssetsIcon("selected-icon"),
  tipList: [
    {
      label: "Daily Withdrawal Time",
      value: "",
      key: "withdrawTime",
    },
    {
      label: "Minimum Single Withdrawal Amount",
      value: "",
      key: "minWithdrawalAmount",
    },
    {
      label: "Maximum Single Withdrawal Amount",
      value: "",
      key: "maxWithdrawalAmount",
    },
    {
      label: "Withdrawal Tax Rate",
      value: "",
      key: "withdrawalFee",
      unit: "%",
    },
    {
      label: "Number of withdrawals per day",
      value: "",
      key: "timesPerDay",
    },
  ],
  bankList: [],
  currentBank: {},
  ruleForm: {
    amount: "",
    tradePassword: "",
  },
  countInfoData: {},
});

const user = userStore();

const initCountInfo = async () => {
  pageData.countInfoData = user.profile;
};

// 银行卡切换
const bankCardChange = (item) => {
  pageData.currentAmount = item;
};

// 获取提现配置
const getWithdrawConfig = () => {
  getWithdrawalConfigApi().then((res) => {
    const { startTime, endTime } = res.data;
    pageData.withdrawConfigData = res.data;
    pageData.withdrawConfigData.withdrawTime = startTime + " - " + endTime;
    pageData.tipList.forEach((item) => {
      item.value = res.data[item.key];
    });
  });
};

const goAddBankCard = () => {
  router.push({ name: "AddBankCard" });
};

// 提现确认
const confirm = async () => {
  if (!pageData.ruleForm.amount) {
    showFailToast("Please enter the amount");
    return false;
  }
  if (!/^[0-9]*$/.test(pageData.ruleForm.amount)) {
    showFailToast("Please enter the correct amount");
    return false;
  }
  const isValid = await validTradePwd();
  if (isValid) {
    const params = {
      amount: pageData.ruleForm.amount,
      bankAccountId: pageData.currentBank.accountId,
      bankCode: pageData.currentBank.bankCode,
      bankName: pageData.currentBank.bankName,
    };
    withdrawApi(params).then((res) => {
      showSuccessToast("Submitted successfully, waiting for review");
      router.replace({ path: "" });
    });
    return;
  }
  showFailToast("Transaction password error");
};

// 获取银行卡列表
const getBankList = () => {
  const params = {
    pageNum: 1,
    pageSize: 99,
  };
  bankListApi(params).then((res) => {
    pageData.bankList = res.data.records || [];
    pageData.currentBank = pageData.bankList[0];
  });
};

// 校验支付密码
const validTradePwd = async () => {
  return new Promise((resolve) => {
    checkPasswordApi({ bankPassword: pageData.ruleForm.tradePassword }).then(
      (res) => {
        resolve(res.data);
      }
    );
  });
};

// 银行卡选择
const bankChange = (item) => {
  pageData.currentBank = item;
};

onMounted(() => {
  initCountInfo();
  getBankList();
  getWithdrawConfig();
});
</script>

<style lang="less" scoped>
.withdraw {
  padding: 40px 15px;
  .cash-amount-box {
    margin-bottom: 47px;
    .title {
      margin-bottom: 30px;
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
  .trade-pwd-box {
    margin-bottom: 40px;
    .title {
      margin-bottom: 22px;
    }
  }
  .reminder-box {
    margin-bottom: 37px;
    .tip-list {
      margin-bottom: 7px;
      .item {
        display: flex;
        align-items: center;
        font-size: 11px;
        color: #afafaf;
        justify-content: space-between;
        margin-bottom: 5px;
      }
    }
    .tip-text {
      font-size: 11px;
      color: #3fc186;
      line-height: 14px;
    }
  }
  .no-bank-list-tip {
    color: #999;
    font-size: 14px;
    text-align: center;
    padding: 25px 0;
  }
  .pay-mode-box {
    margin-bottom: 40px;
    .title {
      margin-bottom: 26px;
    }
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
          flex: 1;
          font-size: 14px;
          color: #ffffff;
          line-height: 22px;
        }
        .bank-logo-box {
          width: 21px;
          padding-top: 3px;
          img {
            width: 100%;
          }
        }
      }
    }
  }
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
  .title {
    display: flex;
    justify-content: space-between;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 18px;
    color: #ffffff;
    line-height: 25px;
    margin-bottom: 27px;
    .link {
      color: #3fc186;
      text-decoration: underline;
      font-size: 12px;
    }
  }
}
</style>
