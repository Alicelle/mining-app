<template>
  <div class="change-password">
    <div class="title">Old Transaction Password</div>
    <div class="input-box">
      <input
        class="input"
        v-model="ruleForm.oldPwd"
        :type="isShowPwd ? 'text' : 'password'"
        maxlength="6"
        placeholder="Please enter"
      />
      <img
        src="/src/assets/icon/eye-icon.png"
        class="eye-icon"
        @click="isShowClick"
      />
    </div>
    <div class="title mb-22">
      <span class="text">Send SMS verification code to phone</span>
      <span class="phone-num"> {{ profile.phone }}</span>
    </div>
    <div class="input-box">
      <input
        v-model="ruleForm.code"
        class="input"
        maxlength="6"
        type="text"
        placeholder="Enter the SMS verification code"
      />
      <span class="send-btn" @click="getCode">{{
        timeId ? `${times}s` : "Send"
      }}</span>
    </div>
    <div class="title">New Transaction Password</div>
    <div class="input-box mb-16">
      <input
        class="input"
        v-model="ruleForm.password"
        maxlength="6"
        :type="isShowPwdAgain ? 'text' : 'password'"
        placeholder="Please enter"
      />
      <img
        @click="isShowAgainClick"
        src="/src/assets/icon/eye-icon.png"
        class="eye-icon"
      />
    </div>
    <div class="tip">
      The minimum length of a trading password is 6 characters
    </div>
    <div class="confirm-btn" @click="submit">Confirm Modification</div>
  </div>
</template>

<script setup>
import { showSuccessToast, showFailToast } from "vant";
import { reactive, toRefs } from "vue";
import { getSmsCode as getSmsCodeRequest } from "@/api/loginApi";
import { updatePasswordApi, checkPasswordApi } from "@/api/bankApi.ts";
import { useRouter } from "vue-router";
import { userStore } from "@/store/user";

const pageEffect = () => {
  const user = userStore();
  const router = useRouter();
  const ruleForm = reactive({
    phone: "",
    oldPwd: "",
    password: "",
    code: "",
  });
  const pageData = reactive({
    timeId: null,
    times: 60,
    isShowPwd: false,
    isShowPwdAgain: false,
    profile: user.profile,
  });
  let { timeId, times, isShowPwd, isShowPwdAgain, profile } = toRefs(pageData);

  const backPage = () => {
    router.back();
  };
  // 获取验证码倒计时
  const getCode = async () => {
    if (!ruleForm.oldPwd)
      return showFailToast("Please Enter Old Trade Password");
    const isPass = await validTradePwd();
    if (isPass) {
      if (timeId.value) return;
      getSmsCode();
    } else {
      showFailToast("Transaction password error");
    }
  };
  // 校验支付密码
  const validTradePwd = () => {
    return new Promise((resolve) => {
      checkPasswordApi({ bankPassword: ruleForm.oldPwd }).then((res) => {
        resolve(res.data);
      });
    });
  };
  // 发送验证码
  const getSmsCode = () => {
    getSmsCodeRequest({ phone: profile.value.phone, type: 3 })
      .then((res) => {
        showSuccessToast("Send Success");
        startTimeLoop();
      })
      .finally(() => {
        console.log(2);
        // closeToast();
      });
  };
  // 开启倒计时
  const startTimeLoop = () => {
    timeId.value = setInterval(() => {
      times.value = times.value - 1;
      if (times.value < 1) {
        clearInterval(timeId.value);
        timeId.value = null;
        times.value = 60;
      }
    }, 1000);
  };
  // 是否展示密码
  const isShowClick = () => {
    isShowPwd.value = !isShowPwd.value;
  };
  const isShowAgainClick = () => {
    isShowPwdAgain.value = !isShowPwdAgain.value;
  };
  // 表单校验
  const isPassValid = () => {
    if (!ruleForm.oldPwd) {
      showFailToast("Please Enter Old Password");
      return false;
    }
    if (!ruleForm.code) {
      showFailToast("Please Enter Sms Code");
      return false;
    }
    if (!ruleForm.password) {
      showFailToast("Please Enter Password");
      return false;
    }
    return true;
  };
  // 提交表单
  const submit = () => {
    const res = isPassValid();
    if (res) {
      const data = {
        newPassword: ruleForm.password,
        smsCode: ruleForm.code,
        oldPassword: ruleForm.oldPwd,
      };
      updatePasswordApi(data).then((res) => {
        showSuccessToast("Register Success");
        backPage();
      });
    }
  };
  return {
    backPage,
    getSmsCode,
    getCode,
    timeId,
    times,
    ruleForm,
    submit,
    isShowPwd,
    isShowPwdAgain,
    profile,
    isShowClick,
    isShowAgainClick,
  };
};

const {
  backPage,
  getSmsCode,
  getCode,
  timeId,
  times,
  ruleForm,
  submit,
  isShowPwd,
  isShowPwdAgain,
  profile,
  isShowClick,
  isShowAgainClick,
} = pageEffect();
</script>

<style lang="less" scoped>
.change-password {
  padding: 40px 15px;
  .title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 700;
    font-size: 18px;
    color: #ffffff;
    line-height: 25px;
    margin-bottom: 30px;
    .phone-num {
      color: #ffb711;
    }
    &.mb-22 {
      margin-bottom: 22px;
    }
  }
  .input-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 64px;
    background: rgba(0, 0, 0, 0.22);
    border-radius: 16px;
    border: 1px solid rgba(200, 200, 200, 0.3);
    padding-left: 24px;
    padding-right: 21px;
    margin-bottom: 16px;
    margin-bottom: 40px;
    &.mb-16 {
      margin-bottom: 16px;
    }
    .input {
      height: 100%;
      flex: 1;
      outline: none;
      border: none;
      background: transparent;
      color: #afafaf;
      font-size: 14px;
    }
    .eye-icon {
      width: 16px;
      height: 7px;
    }
    .send-btn {
      font-size: 16px;
      color: #3fc186;
      line-height: 22px;
    }
  }
  .tip {
    font-size: 12px;
    color: #3fc186;
    line-height: 17px;
    margin-bottom: 40px;
  }
}
</style>
