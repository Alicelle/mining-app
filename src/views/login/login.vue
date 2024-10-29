<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="content">
        <div class="login-title">{{ $t("login.title") }}</div>
        <div class="login-form">
          <div class="input-box">
            <img src="/src/assets/icon/count-icon.png" class="icon" />
            <input
              v-model="username"
              class="input"
              type="text"
              :placeholder="$t('login.countPlaceholder')"
            />
          </div>
          <div class="input-box">
            <img src="/src/assets/icon/pwd-icon.png" class="icon" />
            <input
              class="input"
              v-model="password"
              type="password"
              :placeholder="$t('login.pwdPlaceholder')"
            />
          </div>
        </div>
        <div class="forget-pwd">
          <span class="link" @click="goPage('forgetPassword')">{{
            $t("login.forgetTip")
          }}</span>
        </div>
        <div class="login-btn" @click="handleLogin">
          {{ $t("title.login") }}
        </div>
        <!-- <div class="sign-tip-box">
          <span class="tip">{{ $t("login.noCountTip") }}</span>
          <span class="link" @click="goPage('registerCount')">{{
            $t("login.goRegister")
          }}</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showSuccessToast, showFailToast } from "vant";
import { reactive, toRefs, onMounted } from "vue";
import { apiLogin } from "@/api/loginApi";
import { loginStore } from "@/store/login";
import { useRouter } from "vue-router";
import { userStore } from "@/store/user";
const router = useRouter();
import { changeLanguageApi } from "@/api/homeApi";

const loginEffect = () => {
  const user = userStore();
  const login = loginStore();
  const loginForm = reactive({ username: "", password: "" });
  const { username, password } = toRefs(loginForm);
  const loginValidate = () => {
    if (!username.value || !password.value) {
      showFailToast("Account password cannot be empty");
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    if (loginValidate()) {
      const result = await apiLogin({
        username: username.value,
        password: password.value,
      });
      const { token } = result.data;
      login.setToken(token);
      await user.getProfile();
      showSuccessToast("Login Success");
      router.push("/home");
    }
  };
  // 多语言切换
  const changeLanguage = () => {
    changeLanguageApi({ lang: "en_US" });
  };
  return { username, password, handleLogin, changeLanguage };
};

// 跳转
const goPage = (page) => {
  router.push({ name: page });
};
const { username, password, handleLogin, changeLanguage } = loginEffect();
onMounted(() => {
  changeLanguage();
});
</script>

<style lang="less" scoped>
@import "@/styles/views/login.less";
</style>
