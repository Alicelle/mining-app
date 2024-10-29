<template>
  <div class="change-nickname">
    <div class="title">Nickname</div>
    <div class="input-box">
      <input
        v-model="nickname"
        type="text"
        placeholder="Please Input"
        class="input"
      />
    </div>
    <div class="tip">The input length is limited to 15 characters</div>
    <div class="confirm-btn" @click="updateNickName">Change</div>
  </div>
</template>

<script setup>
import { showSuccessToast, showFailToast } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { updateNickNameApi } from "@/api/myApi.ts";
import { userStore } from "@/store/user";

const nickname = ref("");
const router = useRouter();
const user = userStore();

const updateNickName = () => {
  if (!nickname.value) return showFailToast("Please Enter Nickname");
  updateNickNameApi({ nickName: nickname.value }).then(async (res) => {
    await user.getProfile();
    showSuccessToast("Update Success");
    setTimeout(() => {
      router.back();
    }, 1500);
  });
};
</script>

<style lang="less" scoped>
.change-nickname {
  padding: 40px 15px;
  .title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 700;
    font-size: 18px;
    color: #ffffff;
    line-height: 25px;
    margin-bottom: 30px;
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
  .tip {
    font-size: 12px;
    color: #3fc186;
    line-height: 17px;
    margin-bottom: 40px;
  }
}
</style>
