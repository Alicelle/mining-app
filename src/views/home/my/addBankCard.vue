<template>
  <div class="add-bank-card">
    <div class="select-bank-box">
      <div class="title">Select Bank</div>
      <div class="input-box" @click="showPicker = true">
        <div class="text">
          {{ ruleForm.bankName || "Please Select Bank" }}
        </div>
      </div>
      <div class="tip">Please Select Bank</div>
    </div>
    <div class="bank-count-box">
      <div class="title">Bank Account</div>
      <div class="input-box">
        <input
          v-model="ruleForm.accountNumber"
          type="text"
          placeholder="Please Input Bank Count"
          class="input"
        />
      </div>
      <div class="tip">The bank account must not be empty</div>
    </div>
    <div class="cardholder-name-box">
      <div class="title">Cardholder Name</div>
      <div class="input-box">
        <input
          v-model="ruleForm.accountHolder"
          type="text"
          placeholder="Please Input Cardholder Name"
          class="input"
        />
      </div>
      <div class="tip">The cardholder name cannot be blank</div>
    </div>
    <div class="confirm-btn" @click="confirm">Confirm</div>
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
        :columns="bankConfigList"
        confirm-button-text="Confirm"
        cancel-button-text="Cancel"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>

    <van-popup
      v-model:show="isShowPopup"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <div class="content">
        <div class="title tc">Enter Trading Password</div>
        <div class="input-box">
          <input
            v-model="bankPassword"
            type="password"
            maxlength="6"
            placeholder="Please enter trading password"
            class="input"
          />
        </div>
        <div class="confirm-btn" @click="addBankCard">Confirm</div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { showSuccessToast, showFailToast } from "vant";
import {
  getBankList,
  accountSaveApi,
  checkPasswordApi,
} from "@/api/bankApi.ts";
import { rule } from "postcss";
import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
// import Selector from "@/components/Selector/index.vue";
let bankConfigList = [];
const fieldValue = ref("");
const showPicker = ref(false);
const isShowPopup = ref(false);
const bankPassword = ref("");
const router = useRouter();

const pageData = reactive({
  ruleForm: {
    bankName: "", // 银行名称
    bankCode: "", // 银行编码
    accountNumber: "", // 卡号
    accountHolder: "", // 持卡人姓名
  },
});

const { ruleForm } = toRefs(pageData);

// select event
const onConfirm = ({ selectedOptions }) => {
  showPicker.value = false;
  pageData.ruleForm.bankName = selectedOptions[0].text;
  pageData.ruleForm.bankCode = selectedOptions[0].value;
};

// get bank config list
const getBankConfigList = () => {
  getBankList().then((res) => {
    bankConfigList = (res.data || []).map((item) => {
      return {
        text: item.bankName,
        value: item.bankCode,
      };
    });
  });
};

// 校验表单
const validateForm = () => {
  if (!pageData.ruleForm.bankName) {
    showFailToast("Please select the bank");
    return false;
  }
  if (!pageData.ruleForm.accountNumber) {
    showFailToast("Please enter the bank account");
    return false;
  }
  if (!pageData.ruleForm.accountHolder) {
    showFailToast("Please enter the Cardholder Name");
    return false;
  }
  return true;
};

const confirm = () => {
  const valid = validateForm();
  if (valid) {
    isShowPopup.value = true;
  }
};

const addBankCard = async () => {
  const isPass = await validTradePwd();
  if (isPass) {
    accountSaveApi(pageData.ruleForm).then((res) => {
      if (res.code === 200) {
        showSuccessToast("Successfully added bank card");
        setTimeout(() => {
          router.push({ name: "MyBankCard" });
        }, 1000);
      } else {
        showFailToast(res.msg);
      }
    });
    return false;
  }
  showFailToast("Transaction password error");
};

// 校验支付密码
const validTradePwd = () => {
  return new Promise((resolve) => {
    checkPasswordApi({ bankPassword: bankPassword.value }).then((res) => {
      resolve(res.data);
    });
  });
};

getBankConfigList();
</script>

<style lang="less" scoped>
.add-bank-card {
  padding: 40px 15px;
  .select-bank-box,
  .bank-count-box,
  .cardholder-name-box {
    margin-bottom: 40px;
  }
  .input-box {
    width: 100%;
    height: 64px;
    background: rgba(0, 0, 0, 0.22);
    border-radius: 16px;
    border: 1px solid rgba(200, 200, 200, 0.3);
    padding-left: 24px;
    margin-bottom: 16px;
    .text {
      height: 100%;
      line-height: 64px;
      font-size: 16px;
      color: #ffffff;
      // line-height: 22px;
    }
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
  .tip {
    font-size: 12px;
    color: #3fc186;
    line-height: 17px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 18px;
    color: #ffffff;
    line-height: 25px;
    margin-bottom: 30px;
    &.tc {
      justify-content: center;
    }
  }
}
.content {
  padding: 32px 15px;
  .input-box {
    margin-bottom: 32px;
  }
}
// /deep/.van-picker__toolbar {
//   background: #242424;
//   .van-picker__confirm {
//     color: #3fc186;
//   }
// }
// /deep/.van-picker {
//   background: #242424;
//   .van-picker__columns {
//     background: #242424;
//     .van-picker-column {
//       background: #242424;
//       .van-picker-column__wrapper {
//         background: #242424;
//       }
//     }
//   }
// }
// /deep/.van-popup--bottom.van-popup--round {
//   border-radius: 0;
// }
</style>
