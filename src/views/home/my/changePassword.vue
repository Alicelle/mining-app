<template>
  <div class="change-password">
    <div class="title">Old Account Password</div>
    <div class="input-box">
      <input class="input" type="password" placeholder="enter password" />
      <img src="/src/assets/icon/eye-icon.png" class="eye-icon" />
    </div>
    <div class="title">New Account Password</div>
    <div class="input-box mb-16">
      <input class="input" type="password" placeholder="enter password" />
      <img src="/src/assets/icon/eye-icon.png" class="eye-icon" />
    </div>
    <div class="tip">
      The password must contain letters, numbers, and symbols
    </div>
    <div class="confirm-btn">Confirm Modification</div>
  </div>
</template>

<script setup></script>

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
  }
  .tip {
    font-size: 12px;
    color: #3fc186;
    line-height: 17px;
    margin-bottom: 40px;
  }
}
</style>
