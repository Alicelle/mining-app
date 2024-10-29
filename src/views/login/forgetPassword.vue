<template>
  <div class="forget-password">
    <div class="login-container">
      <div class="content">
        <div class="register-title">{{ $t("resetPwd.pageTitle") }}</div>
        <div class="sub-title">
          {{ $t("resetPwd.subTitle") }}
        </div>
        <div class="register-form">
          <div class="input-box">
            <img src="/src/assets/icon/phone-icon.png" class="icon" />
            <input
              class="input"
              type="text"
              v-model="ruleForm.phone"
              :placeholder="$t('resetPwd.phoneTip')"
              maxlength="11"
            />
          </div>
          <div class="input-box">
            <input
              class="input"
              v-model="ruleForm.code"
              type="password"
              placeholder="Enter the SMS verification code"
            />
            <span class="send-btn" @click="getCode">{{
              timeId ? `${times}s` : "Send"
            }}</span>
          </div>
          <div class="input-box">
            <img src="/src/assets/icon/pwd-icon.png" class="icon" />
            <input
              class="input"
              type="password"
              v-model="ruleForm.password"
              :placeholder="$t('resetPwd.pwdTip')"
            />
            <img src="/src/assets/icon/eye-icon.png" class="eye-icon" />
          </div>
          <div class="input-box">
            <img src="/src/assets/icon/pwd-icon.png" class="icon" />
            <input
              class="input"
              type="password"
              v-model="ruleForm.passwordAgain"
              :placeholder="$t('resetPwd.pwdTipAgain')"
            />
            <img src="/src/assets/icon/eye-icon.png" class="eye-icon" />
          </div>
        </div>
        <div class="login-btn" @click="submit">
          {{ $t("resetPwd.confirm") }}
        </div>
        <div class="return-btn" @click="backPage">
          {{ $t("resetPwd.return") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showSuccessToast, showFailToast } from "vant";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { getSmsCode as getSmsCodeRequest, forgotPwd } from "@/api/loginApi";

const router = useRouter();

const pageEffect = () => {
  const ruleForm = reactive({
    phone: "",
    code: "",
    password: "",
    passwordAgain: "",
  });
  const pageData = reactive({
    timeId: null,
    times: 120,
  });
  let { timeId, times } = toRefs(pageData);

  const backPage = () => {
    router.back();
  };
  // 获取验证码倒计时
  const getCode = () => {
    if (!ruleForm.phone) return showFailToast("Please Enter Phone Number");
    if (timeId.value) return;
    getSmsCode();
  };
  // 发送验证码
  const getSmsCode = () => {
    // showLoadingToast({
    //   message: "loading",
    //   forbidClick: true,
    // });
    getSmsCodeRequest({ phone: ruleForm.phone, type: 2 }).then((res) => {
      showSuccessToast("Send Success");
      startTimeLoop();
    });
  };
  // 开启倒计时
  const startTimeLoop = () => {
    timeId.value = setInterval(() => {
      times.value = times.value - 1;
      if (times.value < 1) {
        clearInterval(timeId.value);
        timeId.value = null;
        times.value = 120;
      }
    }, 1000);
  };
  // 表单校验
  const isPassValid = () => {
    if (!ruleForm.phone) {
      showFailToast("Please Enter Phone Number");
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
    if (!ruleForm.passwordAgain) {
      showFailToast("Please Enter Password Again");
      return false;
    }
    if (ruleForm.password != ruleForm.passwordAgain) {
      showFailToast("The two password inputs are inconsistent");
      return false;
    }
    return true;
  };
  const submit = () => {
    const isValid = isPassValid();
    if (isValid) {
      const params = {
        authType: 1,
        code: ruleForm.code,
        password: ruleForm.password,
        phone: ruleForm.phone,
      };
      forgotPwd(params).then((res) => {
        showSuccessToast("Reset Password Success");
        backPage();
      });
    }
  };
  return {
    backPage,
    getSmsCode,
    getCode,
    submit,
    timeId,
    times,
    ruleForm,
  };
};

const { backPage, getCode, submit, timeId, times, ruleForm } = pageEffect();
</script>

<style lang="less" scoped>
@import "@/styles/views/forgetPassword.less";
</style>
