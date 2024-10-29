<template>
  <div class="forget-password">
    <div class="container">
      <div class="content">
        <div class="register-title">{{ $t("register.title") }}</div>
        <div class="sub-title">
          {{ $t("register.subTitle") }}
        </div>
        <div class="register-form">
          <div class="input-box">
            <img src="/src/assets/icon/phone-icon.png" class="icon" />
            <input
              class="input"
              type="text"
              v-model="ruleForm.phone"
              :placeholder="$t('resetPwd.phoneTip')"
            />
          </div>
          <div class="input-box">
            <img src="/src/assets/icon/pwd-icon.png" class="icon" />
            <input
              class="input"
              :type="isShowPwd ? 'text' : 'password'"
              v-model="ruleForm.password"
              :placeholder="$t('resetPwd.pwdTip')"
            />
            <img
              @click="isShowClick"
              src="/src/assets/icon/eye-icon.png"
              class="eye-icon"
            />
          </div>
          <div class="input-box">
            <input
              class="input"
              v-model="ruleForm.code"
              type="text"
              placeholder="Enter the SMS verification code"
            />
            <span class="send-btn" @click="getCode">{{
              timeId ? `${times}s` : "Send"
            }}</span>
          </div>
          <div class="pwd-error-tip">
            The password must contain letters, numbers, and symbols
          </div>
        </div>
        <div class="confirm-btn" @click="submit">
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
import { useRouter, useRoute } from "vue-router";
import { getSmsCode as getSmsCodeRequest, registerCount } from "@/api/loginApi";

const pageEffect = () => {
  const router = useRouter();
  const route = useRoute();
  const ruleForm = reactive({
    phone: "",
    password: "",
    code: "",
  });
  const pageData = reactive({
    timeId: null,
    times: 120,
    isShowPwd: false,
  });
  let { timeId, times, isShowPwd } = toRefs(pageData);

  const backPage = () => {
    router.back();
  };
  // 获取验证码倒计时
  const getCode = () => {
    if (!ruleForm.phone) return showFailToast("Please Enter Phone Number");
    if (!/^(09|\+639)\d{9}$|^9\d{9}$/.test(ruleForm.phone)) {
      return showFailToast("Please Enter Correct Phone Number");
    }
    if (timeId.value) return;
    getSmsCode();
  };
  // 发送验证码
  const getSmsCode = () => {
    getSmsCodeRequest({ phone: ruleForm.phone, type: 1 })
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
        times.value = 120;
      }
    }, 1000);
  };
  // 是否展示密码
  const isShowClick = () => {
    isShowPwd.value = !isShowPwd.value;
  };
  // 表单校验
  const isPassValid = () => {
    if (!ruleForm.phone) {
      showFailToast("Please Enter Phone Number");
      return false;
    }
    if (!ruleForm.password) {
      showFailToast("Please Enter Password");
      return false;
    }
    if (!ruleForm.code) {
      showFailToast("Please Enter Sms Code");
      return false;
    }
    return true;
  };
  // 提交表单
  const submit = () => {
    const res = isPassValid();
    // const reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    // if (!reg.test(ruleForm.password)) {
    //   showFailToast("The password must contain letters, numbers, and symbols");
    //   return false;
    // }
    if (res) {
      if (!route.query.invitationCode) {
        return showFailToast("Please access this page normally");
      }
      if (!/^(09|\+639)\d{9}$|^9\d{9}$/.test(ruleForm.phone)) {
        return showFailToast("Please Enter Correct Phone Number");
      }
      const data = {
        password: ruleForm.password,
        username: ruleForm.phone,
        phone: ruleForm.phone,
        smsCode: ruleForm.code,
        invitationCode: route.query.invitationCode,
      };
      registerCount(data).then(() => {
        router.replace({ name: "Login" });
        showSuccessToast("Register Success");
      });
    }
  };
  return {
    backPage,
    getSmsCode,
    getCode,
    isShowClick,
    timeId,
    times,
    ruleForm,
    isShowPwd,
    submit,
  };
};

const {
  backPage,
  getCode,
  isShowClick,
  timeId,
  times,
  ruleForm,
  isShowPwd,
  submit,
} = pageEffect();
</script>

<style lang="less" scoped>
@import "@/styles/views/registerCount.less";
</style>
